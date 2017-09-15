const fs = require('fs');
const path = require('path');
const MFS = require('memory-fs');
const { EventEmitter } = require('async-events-listener');
const webpackDevMiddleWare = require('webpack-dev-middleware');
const webpack = require('webpack');
const ctk = require('koa-connect');
const hotMiddleWare = require('webpack-hot-middleware');
const LRU = require('lru-cache');
const { createBundleRenderer } = require('vue-server-renderer');
const staticCache = require('./cahce');

class MioxKoaVue2xServerSideRenderer extends EventEmitter {
    constructor(app) {
        super();
        this.app = app;
        this.configs = {};
        this.options = {};
        this.data = {};
        this.isProd = process.env.NODE_ENV === 'production';
        this.microCache = LRU({ max: 100, maxAge: 1000 });
    }

    connect(client, server, options = {}) {
        this.configs.client = client;
        this.configs.server = server;
        this.options = Object.assign({
            hot: true,
            dir: null,
            cache: false,
            title: 'new Document',
            runInNewContext: true,
            maxAge: 31536000,
            gzip: true,
            dynamic: true
        }, options);

        this.data.publicPath = this.configs.client.output.publicPath || '/';
        this.data.hmr = path.resolve(this.data.publicPath, '__webpack_hmr__');
        this.data.template = this.resolveTemplate();

        if (this.isProd) {
            this.onProduction();
        } else {
            this.onDevelopment();
        }

        this.createServer();
    }

    onDevelopment() {
        this.data.dir = this.options.dir || path.dirname(this.configs.client.entry.app);
        this.readyPromise = this.createDevServer((bundle, options) => {
            this.renderer = this.createRenderer(bundle, options);
        });
    }

    onProduction() {
        const SSR_Bundle = path.resolve(this.configs.server.output.path, 'vue-ssr-server-bundle.json');
        const SSR_Manifest = path.resolve(this.configs.client.output.path, 'vue-ssr-client-manifest.json');
        const bundle = require(SSR_Bundle);
        const clientManifest = require(SSR_Manifest);
        this.renderer = this.createRenderer(bundle, { clientManifest });
        this.createProServer();
    }

    resolveTemplate() {
        const template = fs.readFileSync(this.options.html, 'utf8');
        return template.replace(
            '<!--vue-ssr-outlet-->',
            `<div class="mx-app"><div class="mx-webviews"><div class="mx-webview active"><!--vue-ssr-outlet--></div></div></div>`
        )
    }

    createRenderer(bundle, options) {
        const { cache, runInNewContext } = this.options;
        const configs = {
            template: this.data.template,
            basedir: this.data.dir,
            runInNewContext: runInNewContext || true
        };

        if (cache) {
            configs.cache = LRU({
                max: 1000,
                maxAge: 1000 * 60 * 15
            });
        }

        return createBundleRenderer(bundle, Object.assign(options, configs));
    }

    clientDevServer(object, callback) {
        if (this.options.hot) {
            this.configs.client.entry.app = [`webpack-hot-middleware/client?reload=true`, this.configs.client.entry.app];
            this.configs.client.plugins.push(new webpack.HotModuleReplacementPlugin());
        }

        this.configs.client.plugins.push(new webpack.NoEmitOnErrorsPlugin());
        const clientCompiler = webpack(this.configs.client);
        const devMiddleware = webpackDevMiddleWare(clientCompiler, {
            publicPath: this.data.publicPath,
            noInfo: true
        });

        if (this.options.hot) {
            this.app.use(ctk(hotMiddleWare(clientCompiler, {
                heartbeat: 2000
            })));
        }

        this.app.use(async (ctx, next) => {
            ctx.status = 200;
            await next();
        });

        this.app.use(ctk(devMiddleware));

        clientCompiler.plugin('done', () => {
            const fs = devMiddleware.fileSystem;
            const readFile = file => fs.readFileSync(path.join(this.configs.client.output.path, file), 'utf-8');
            try{
                object.clientManifest = JSON.parse(readFile('vue-ssr-client-manifest.json'));
            } catch(e) {}
            object.bundle && callback(object.bundle, { clientManifest: object.clientManifest });
        });
    }

    serverDevServer(object, callback) {
        const serverCompiler = webpack(this.configs.server);
        const mfs = new MFS();
        serverCompiler.outputFileSystem = mfs;
        serverCompiler.watch({}, (err, stats) => {
            if (err) throw err;
            stats = stats.toJson();
            stats.errors.forEach(err => console.error(err));
            stats.warnings.forEach(err => console.warn(err));
            const readFile = file => mfs.readFileSync(path.join(this.configs.client.output.path, file), 'utf-8');
            try{
                object.bundle = JSON.parse(readFile('vue-ssr-server-bundle.json'));
            } catch(e) {}
            object.clientManifest && callback(object.bundle, { clientManifest: object.clientManifest });
        });
    }

    createDevServer(cb) {
        const object = {
            bundle: null,
            resolve: null,
            clientManifest: null
        };

        const readyPromise = new Promise(r => { object.resolve = r });
        const ready = (...args) => { object.resolve(); cb(...args); };

        this.clientDevServer(object, ready);
        this.serverDevServer(object, ready);

        return readyPromise;
    }

    createProServer() {
        const { maxAge, gzip, dynamic } = this.options;
        this.app.use(staticCache(this.configs.client.output.path, {
            prefix: this.configs.client.output.publicPath,
            maxAge, gzip, dynamic
        }));
    }

    render(ctx, resolve, reject) {
        const { cache, title } = this.options;
        const url = ctx.request.url;

        if (cache) {
            const hit = this.microCache.get(url);
            if (hit) {
                if (!this.isProd) console.log(':', '[!]', url);
                ctx.body = hit;
                return;
            }
        }

        const context = {
            ctx, url,
            title: title,
            app: this.app
        };

        this.renderer.renderToString(context, (err, html) => {
            if (err) return reject(err);
            cache && this.microCache.set(url, html);
            resolve(html);
        });
    }

    createServer() {
        this.app.use(async (ctx, next) => {
            if (!this.render) return await next();

            const { cache } = this.options;
            const body = await new Promise((resolve, reject) => {
                if (this.isProd) { this.render(ctx, resolve, reject); }
                else { this.readyPromise.then(() => this.render(ctx, resolve, reject)); }
            }).catch(e => Promise.resolve(e));

            if (!cache) {
                ctx.set('Expires', 0);
                ctx.set('Cache-Control', 'no-cache');
                ctx.set('Pragma', 'no-cache');
            }

            if (body instanceof Error || Object.prototype.toString.call(body) === '[object Error]') {
                switch (body.code) {
                    case 404:
                        ctx.status = 404;
                        return await next();
                    case 302:
                        if (body.url) {
                            ctx.redirect(body.url);
                        } else {
                            throw new Error('302 redirect: miss url');
                        }
                        break;
                    default:
                        if (EventEmitter.listenerCount(this, 'error') === 0) {
                            ctx.status = body.code || 500;
                            ctx.body = `<h1>Internet Server Error ${ctx.status}</h1><pre>${body.stack}</pre>`;
                        } else {
                            this.emit('error', ctx, body);
                        }
                }
            } else {
                ctx.body = body;
            }
        });
    }
}

module.exports = MioxKoaVue2xServerSideRenderer;