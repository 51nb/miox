/**
 * Created by evio on 2017/5/11.
 */
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import ctk from 'koa-connect';
import MFS from 'memory-fs';
import LRU from 'lru-cache';
import staticCache from './cahce';
import WebpackServerRenderer from './webpack/webpack.server';
import WebpackClientRenderer from './webpack/webpack.client';
import WebpackBabelCompileSourceModuleCompile from './webpack/webpack.babel.compile';
import webpackDevMiddleWare from 'webpack-dev-middleware';
import hotMiddleWare from 'webpack-hot-middleware';
import { EventEmitter } from 'events';
import { createBundleRenderer } from 'vue-server-renderer';

export default class MioxKoaVue2xServerSideRenderer extends EventEmitter {
    /**
     * 初始化函数
     * @param options {Json} 配置参数
     * @props cwd {String} 基址
     * @props whitelist {Array} 白名单列表
     * @props hot {Boolean} hot reload
     * @props static { maxAge<Number:31536000>, gzip<Boolean:false>, dynamic<Boolean:true> } #https://www.npmjs.com/package/koa-static-cache
     * @props cache {Boolean} use cache?
     * @props title {String} fill in <title />
     * @props app {String} entry app file
     * @props build {String} store resource where to put
     * @props prefix {String} url prefix
     */
    constructor(options = {}) {
        super();
        this.options = { base: options, client: {}, server: {} };
        this.pro = process.env.NODE_ENV === 'production';
        this.options.base.dir = path.dirname(this.options.base.app);
        this.options.base.whitelist = this.options.base.whitelist || [];
        this.renderer = null;
        this.readyPromise = null;
        this.microCache = LRU({ max: 100, maxAge: 1000 });
        this.options.base.whitelist.push(/\.css$/i, /miox[^\/]+/i);
    }

    include() {
        const cwd = this.options.base.cwd || process.cwd();
        return WebpackBabelCompileSourceModuleCompile(cwd, this.options.base.whitelist);
    }

    use(base = {}) {
        this.options.client = WebpackClientRenderer(base, this.options.base);
        this.options.server = WebpackServerRenderer(base, this.options.base);
        this.options.clientPublicPath = this.options.client.output.publicPath || '/';
        this.options.hmr = `${this.options.clientPublicPath}/__webpack_hot_module_reload_threat__`.replace(/^\/\//, '/');
        this.options.dist = path.resolve(this.options.server.output.path);
    }

    connect(context) {
        this.context = context;
        this.template = fs.readFileSync(path.resolve(this.options.base.dir, 'index.html'), 'utf-8').replace(
            '<!--vue-ssr-outlet-->',
            `<div class="mx-app"><div class="mx-webviews"><div class="mx-webview active"><!--vue-ssr-outlet--></div></div></div>`
        );
        if (this.pro) {
            this.production();
        } else {
            this.development();
        }
        this.createServer();
    }

    createRenderer(bundle, options) {
        const { cache, runInNewContext } = this.options.base;
        const configs = {
            template: this.template,
            basedir: this.options.base.dir,
            runInNewContext: runInNewContext || true
        }
        if (cache) {
            configs.cache = LRU({
                max: 1000,
                maxAge: 1000 * 60 * 15
            });
        }
        return createBundleRenderer(bundle, Object.assign(options, configs));
    }

    production() {
        const SSR_Bundle = path.resolve(this.options.dist, 'vue-ssr-server-bundle.json');
        const SSR_Manifest = path.resolve(this.options.dist, 'vue-ssr-client-manifest.json');
        const bundle = require(SSR_Bundle);
        const clientManifest = require(SSR_Manifest);
        this.renderer = this.createRenderer(bundle, { clientManifest });
        this.productionStatic();
    }

    development() {
        this.readyPromise = this.createDevServer((bundle, options) => {
            this.renderer = this.createRenderer(bundle, options);
        });
    }

    createDevServer(cb) {
        let bundle, clientManifest;
        let resolve;
        const clientPublicPath = this.options.clientPublicPath;
        const readyPromise = new Promise(r => { resolve = r });
        const ready = (...args) => {
            resolve()
            cb(...args);
        }

        if (this.options.base.hot) {
            this.options.client.entry.app = [`webpack-hot-middleware/client?path=${this.options.hmr}`, this.options.client.entry.app];
            this.options.client.plugins.push(new webpack.HotModuleReplacementPlugin());
        }
        this.options.client.output.filename = '[name].js';
        this.options.client.plugins.push(new webpack.NoEmitOnErrorsPlugin());
        const clientCompiler = webpack(this.options.client);
        const devMiddleware = webpackDevMiddleWare(clientCompiler, {
            publicPath: (clientPublicPath + '/').replace(/^\/\//, '/'),
            noInfo: true
        });

        if (this.options.base.hot) {
            this.emit('DEV:HMR:BEFORE', this.context);
            this.context.use(ctk(hotMiddleWare(clientCompiler, { path: this.options.hmr })));
        }

        this.emit('DEV:SERVER:BEFORE', this.context);
        this.context.use(async (ctx, next) => {
            ctx.status = 200;
            await next();
        });

        this.emit('DEV:SERVER:INJECT', this.context);
        this.context.use(ctk(devMiddleware));

        clientCompiler.plugin('done', () => {
            const fs = devMiddleware.fileSystem;
            const readFile = file => fs.readFileSync(path.join(this.options.client.output.path, file), 'utf-8')
            clientManifest = JSON.parse(readFile('vue-ssr-client-manifest.json'));
            bundle && ready(bundle, { clientManifest });
        });

        const serverCompiler = webpack(this.options.server);
        const mfs = new MFS();
        serverCompiler.outputFileSystem = mfs
        serverCompiler.watch({}, (err, stats) => {
            if (err) throw err;
            stats = stats.toJson();
            stats.errors.forEach(err => console.error(err));
            stats.warnings.forEach(err => console.warn(err));
            const readFile = file => mfs.readFileSync(path.join(this.options.client.output.path, file), 'utf-8');
            bundle = JSON.parse(readFile('vue-ssr-server-bundle.json'));
            clientManifest && ready(bundle, { clientManifest })
        });

        return readyPromise;
    }

    productionStatic() {
        const { maxAge, gzip, dynamic, ...args } = this.options.base.static || {};
        const clientPublicPath = this.options.clientPublicPath;
        this.emit('PRO:STATIC:BEFORE', this.context);
        this.context.use(staticCache(this.options.dist, {
            "prefix": clientPublicPath,
            "maxAge": maxAge === undefined ? 31536000 : maxAge,
            "gzip": gzip ? true : !!gzip,
            "dynamic": dynamic === undefined ? true : !!dynamic,
            ...args
        }));
    }

    render(ctx, resolve, reject) {
        const { cache, title } = this.options.base;
        const url = ctx.request.url;

        if (cache) {
            const hit = this.microCache.get(url);
            if (hit) {
                if (!this.pro) {
                    console.log(`[${url}] cache hit!`);
                }
                ctx.body = hit;
                return;
            }
        }

        const context = {
            title: title || 'Miox Server Side Renderer Demo',
            url,
            app: this.context,
            ctx
        }

        this.renderer.renderToString(context, (err, html) => {
            if (err) {
                return reject(err);
            }
            cache && this.microCache.set(url, html);
            resolve(html);
        })
    }

    createServer() {
        this.emit('CREATE:SERVER:BEFORE', this.context);
        this.context.use(async (ctx, next) => {
            const body = await new Promise((resolve, reject) => {
                if (this.pro) {
                    this.render(ctx, resolve, reject);
                } else {
                    this.readyPromise.then(() => this.render(ctx, resolve, reject));
                }
            }).catch(e => Promise.resolve(e));

            const { cache } = this.options.base;
            if (!cache) {
                ctx.set('Expires', 0);
                ctx.set('Cache-Control', 'no-cache');
                ctx.set('Pragma', 'no-cache');
            }

            if (body instanceof Error) {
                if (body.code === 404) {
                    ctx.status = 404;
                    return await next();
                } else if (body.code === 302 && body.url) {
                    ctx.redirect(body.url);
                } else {
                    ctx.status = body.code || 500;
                    ctx.body = body.message;
                }
            } else {
                ctx.body = body;
            }
        });
    }
}