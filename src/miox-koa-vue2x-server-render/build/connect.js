'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by evio on 2017/5/11.
 */
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var ctk = require('koa-connect');
var MFS = require('memory-fs');
var LRU = require('lru-cache');
var staticCache = require('./cahce');
var WebpackServerRenderer = require('./webpack/webpack.server');
var WebpackClientRenderer = require('./webpack/webpack.client');
var WebpackBabelCompileSourceModuleCompile = require('./webpack/webpack.babel.compile');
var webpackDevMiddleWare = require('webpack-dev-middleware');
var hotMiddleWare = require('webpack-hot-middleware');

var _require = require('events'),
    EventEmitter = _require.EventEmitter;

var _require2 = require('vue-server-renderer'),
    createBundleRenderer = _require2.createBundleRenderer;

module.exports = function (_EventEmitter) {
    (0, _inherits3.default)(MioxKoaVue2xServerSideRenderer, _EventEmitter);

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
    function MioxKoaVue2xServerSideRenderer() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        (0, _classCallCheck3.default)(this, MioxKoaVue2xServerSideRenderer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (MioxKoaVue2xServerSideRenderer.__proto__ || Object.getPrototypeOf(MioxKoaVue2xServerSideRenderer)).call(this));

        _this.options = { base: options, client: {}, server: {} };
        _this.pro = process.env.NODE_ENV === 'production';
        _this.options.base.dir = path.dirname(_this.options.base.app);
        _this.options.base.whitelist = _this.options.base.whitelist || [];
        _this.renderer = null;
        _this.readyPromise = null;
        _this.microCache = LRU({ max: 100, maxAge: 1000 });
        _this.options.base.whitelist.push(/\.css$/i, /miox[^\/]+/i);
        return _this;
    }

    (0, _createClass3.default)(MioxKoaVue2xServerSideRenderer, [{
        key: 'include',
        value: function include() {
            var cwd = this.options.base.cwd || process.cwd();
            return WebpackBabelCompileSourceModuleCompile(cwd, this.options.base.whitelist);
        }
    }, {
        key: 'use',
        value: function use() {
            var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.options.client = WebpackClientRenderer(base, this.options.base);
            this.options.server = WebpackServerRenderer(base, this.options.base);
            this.options.clientPublicPath = this.options.client.output.publicPath || '/';
            this.options.hmr = (this.options.clientPublicPath + '/__webpack_hot_module_reload_threat__').replace(/^\/\//, '/');
            this.options.dist = path.resolve(this.options.server.output.path);
        }
    }, {
        key: 'connect',
        value: function connect(context) {
            this.context = context;
            this.template = fs.readFileSync(path.resolve(this.options.base.dir, 'index.html'), 'utf-8').replace('<!--vue-ssr-outlet-->', '<div class="mx-app"><div class="mx-webviews"><div class="mx-webview active"><!--vue-ssr-outlet--></div></div></div>');
            if (this.pro) {
                this.production();
            } else {
                this.development();
            }
            this.createServer();
        }
    }, {
        key: 'createRenderer',
        value: function createRenderer(bundle, options) {
            var _options$base = this.options.base,
                cache = _options$base.cache,
                runInNewContext = _options$base.runInNewContext;

            var configs = {
                template: this.template,
                basedir: this.options.base.dir,
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
    }, {
        key: 'production',
        value: function production() {
            var SSR_Bundle = path.resolve(this.options.dist, 'vue-ssr-server-bundle.json');
            var SSR_Manifest = path.resolve(this.options.dist, 'vue-ssr-client-manifest.json');
            var bundle = require(SSR_Bundle);
            var clientManifest = require(SSR_Manifest);
            this.renderer = this.createRenderer(bundle, { clientManifest: clientManifest });
            this.productionStatic();
        }
    }, {
        key: 'development',
        value: function development() {
            var _this2 = this;

            this.readyPromise = this.createDevServer(function (bundle, options) {
                _this2.renderer = _this2.createRenderer(bundle, options);
            });
        }
    }, {
        key: 'createDevServer',
        value: function createDevServer(cb) {
            var _this3 = this;

            var bundle = void 0,
                clientManifest = void 0;
            var resolve = void 0;
            var clientPublicPath = this.options.clientPublicPath;
            var readyPromise = new Promise(function (r) {
                resolve = r;
            });
            var ready = function ready() {
                resolve();
                cb.apply(undefined, arguments);
            };

            if (this.options.base.hot) {
                this.options.client.entry.app = ['webpack-hot-middleware/client?path=' + this.options.hmr, this.options.client.entry.app];
                this.options.client.plugins.push(new webpack.HotModuleReplacementPlugin());
            }
            this.options.client.output.filename = '[name].js';
            this.options.client.plugins.push(new webpack.NoEmitOnErrorsPlugin());
            var clientCompiler = webpack(this.options.client);
            var devMiddleware = webpackDevMiddleWare(clientCompiler, {
                publicPath: (clientPublicPath + '/').replace(/^\/\//, '/'),
                noInfo: true
            });

            if (this.options.base.hot) {
                this.emit('DEV:HMR:BEFORE', this.context);
                this.context.use(ctk(hotMiddleWare(clientCompiler, { path: this.options.hmr })));
            }

            this.emit('DEV:SERVER:BEFORE', this.context);
            this.context.use(function () {
                var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
                    return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    ctx.status = 200;
                                    _context.next = 3;
                                    return next();

                                case 3:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this3);
                }));

                return function (_x3, _x4) {
                    return _ref.apply(this, arguments);
                };
            }());

            this.emit('DEV:SERVER:INJECT', this.context);
            this.context.use(ctk(devMiddleware));

            clientCompiler.plugin('done', function () {
                var fs = devMiddleware.fileSystem;
                var readFile = function readFile(file) {
                    return fs.readFileSync(path.join(_this3.options.client.output.path, file), 'utf-8');
                };
                clientManifest = JSON.parse(readFile('vue-ssr-client-manifest.json'));
                bundle && ready(bundle, { clientManifest: clientManifest });
            });

            var serverCompiler = webpack(this.options.server);
            var mfs = new MFS();
            serverCompiler.outputFileSystem = mfs;
            serverCompiler.watch({}, function (err, stats) {
                if (err) throw err;
                stats = stats.toJson();
                stats.errors.forEach(function (err) {
                    return console.error(err);
                });
                stats.warnings.forEach(function (err) {
                    return console.warn(err);
                });
                var readFile = function readFile(file) {
                    return mfs.readFileSync(path.join(_this3.options.client.output.path, file), 'utf-8');
                };
                bundle = JSON.parse(readFile('vue-ssr-server-bundle.json'));
                clientManifest && ready(bundle, { clientManifest: clientManifest });
            });

            return readyPromise;
        }
    }, {
        key: 'productionStatic',
        value: function productionStatic() {
            var _ref2 = this.options.base.static || {},
                maxAge = _ref2.maxAge,
                gzip = _ref2.gzip,
                dynamic = _ref2.dynamic,
                args = (0, _objectWithoutProperties3.default)(_ref2, ['maxAge', 'gzip', 'dynamic']);

            var clientPublicPath = this.options.clientPublicPath;
            this.emit('PRO:STATIC:BEFORE', this.context);
            this.context.use(staticCache(this.options.dist, (0, _extends3.default)({
                "prefix": clientPublicPath,
                "maxAge": maxAge === undefined ? 31536000 : maxAge,
                "gzip": gzip ? true : !!gzip,
                "dynamic": dynamic === undefined ? true : !!dynamic
            }, args)));
        }
    }, {
        key: 'render',
        value: function render(ctx, resolve, reject) {
            var _this4 = this;

            var _options$base2 = this.options.base,
                cache = _options$base2.cache,
                title = _options$base2.title;

            var url = ctx.request.url;

            if (cache) {
                var hit = this.microCache.get(url);
                if (hit) {
                    if (!this.pro) {
                        console.log('[' + url + '] cache hit!');
                    }
                    ctx.body = hit;
                    return;
                }
            }

            var context = {
                title: title || 'Miox Server Side Renderer Demo',
                url: url,
                app: this.context,
                ctx: ctx
            };

            this.renderer.renderToString(context, function (err, html) {
                if (err) {
                    return reject(err);
                }
                cache && _this4.microCache.set(url, html);
                resolve(html);
            });
        }
    }, {
        key: 'createServer',
        value: function createServer() {
            var _this5 = this;

            this.emit('CREATE:SERVER:BEFORE', this.context);
            this.context.use(function () {
                var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, next) {
                    var body, cache;
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.next = 2;
                                    return new Promise(function (resolve, reject) {
                                        if (_this5.pro) {
                                            _this5.render(ctx, resolve, reject);
                                        } else {
                                            _this5.readyPromise.then(function () {
                                                return _this5.render(ctx, resolve, reject);
                                            });
                                        }
                                    }).catch(function (e) {
                                        return Promise.resolve(e);
                                    });

                                case 2:
                                    body = _context2.sent;
                                    cache = _this5.options.base.cache;

                                    if (!cache) {
                                        ctx.set('Expires', 0);
                                        ctx.set('Cache-Control', 'no-cache');
                                        ctx.set('Pragma', 'no-cache');
                                    }

                                    if (!(body instanceof Error)) {
                                        _context2.next = 16;
                                        break;
                                    }

                                    if (!(body.code === 404)) {
                                        _context2.next = 13;
                                        break;
                                    }

                                    ctx.status = 404;
                                    _context2.next = 10;
                                    return next();

                                case 10:
                                    return _context2.abrupt('return', _context2.sent);

                                case 13:
                                    if (body.code === 302 && body.url) {
                                        ctx.redirect(body.url);
                                    } else {
                                        ctx.status = body.code || 500;
                                        ctx.body = body.message;
                                    }

                                case 14:
                                    _context2.next = 17;
                                    break;

                                case 16:
                                    ctx.body = body;

                                case 17:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this5);
                }));

                return function (_x5, _x6) {
                    return _ref3.apply(this, arguments);
                };
            }());
        }
    }]);
    return MioxKoaVue2xServerSideRenderer;
}(EventEmitter);