'use strict';

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

var fs = require('fs');
var path = require('path');
var MFS = require('memory-fs');

var _require = require('async-events-listener'),
    EventEmitter = _require.EventEmitter;

var webpackDevMiddleWare = require('webpack-dev-middleware');
var webpack = require('webpack');
var ctk = require('koa-connect');
var hotMiddleWare = require('webpack-hot-middleware');
var LRU = require('lru-cache');

var _require2 = require('vue-server-renderer'),
    createBundleRenderer = _require2.createBundleRenderer;

var staticCache = require('./cahce');

var MioxKoaVue2xServerSideRenderer = function (_EventEmitter) {
    (0, _inherits3.default)(MioxKoaVue2xServerSideRenderer, _EventEmitter);

    function MioxKoaVue2xServerSideRenderer(app) {
        (0, _classCallCheck3.default)(this, MioxKoaVue2xServerSideRenderer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (MioxKoaVue2xServerSideRenderer.__proto__ || Object.getPrototypeOf(MioxKoaVue2xServerSideRenderer)).call(this));

        _this.app = app;
        _this.configs = {};
        _this.options = {};
        _this.data = {};
        _this.isProd = process.env.NODE_ENV === 'production';
        _this.microCache = LRU({ max: 100, maxAge: 1000 });
        return _this;
    }

    (0, _createClass3.default)(MioxKoaVue2xServerSideRenderer, [{
        key: 'connect',
        value: function connect(client, server) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

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
    }, {
        key: 'onDevelopment',
        value: function onDevelopment() {
            var _this2 = this;

            this.data.dir = this.options.dir || path.dirname(this.configs.client.entry.app);
            // this.data.dir = this.configs.client.entry.app;
            this.readyPromise = this.createDevServer(function (bundle, options) {
                _this2.renderer = _this2.createRenderer(bundle, options);
            });
        }
    }, {
        key: 'onProduction',
        value: function onProduction() {
            var SSR_Bundle = path.resolve(this.configs.server.output.path, 'vue-ssr-server-bundle.json');
            var SSR_Manifest = path.resolve(this.configs.client.output.path, 'vue-ssr-client-manifest.json');
            var bundle = require(SSR_Bundle);
            var clientManifest = require(SSR_Manifest);
            this.renderer = this.createRenderer(bundle, { clientManifest: clientManifest });
            this.createProServer();
        }
    }, {
        key: 'resolveTemplate',
        value: function resolveTemplate() {
            var template = fs.readFileSync(this.options.html, 'utf8');
            return template.replace('<!--vue-ssr-outlet-->', '<div class="mx-app">\n                <div class="mx-webviews">\n                    <div class="mx-webview active">\n                        <div class="mx-window">\n                            <!--vue-ssr-outlet-->\n                        </div>\n                    </div>\n                </div>\n            </div>');
        }
    }, {
        key: 'createRenderer',
        value: function createRenderer(bundle, options) {
            var _options = this.options,
                cache = _options.cache,
                runInNewContext = _options.runInNewContext;

            var configs = {
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
    }, {
        key: 'clientDevServer',
        value: function clientDevServer(object, callback) {
            var _this3 = this;

            if (this.options.hot) {
                this.configs.client.entry.app = ['webpack-hot-middleware/client?reload=true', this.configs.client.entry.app];
                this.configs.client.plugins.push(new webpack.HotModuleReplacementPlugin());
            }

            this.configs.client.plugins.push(new webpack.NoEmitOnErrorsPlugin());
            var clientCompiler = webpack(this.configs.client);
            var devMiddleware = webpackDevMiddleWare(clientCompiler, {
                publicPath: this.data.publicPath,
                noInfo: true
            });

            if (this.options.hot) {
                this.app.use(ctk(hotMiddleWare(clientCompiler, {
                    heartbeat: 2000
                })));
            }

            this.app.use(function () {
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

                return function (_x2, _x3) {
                    return _ref.apply(this, arguments);
                };
            }());

            this.app.use(ctk(devMiddleware));

            clientCompiler.plugin('done', function () {
                var fs = devMiddleware.fileSystem;
                var readFile = function readFile(file) {
                    return fs.readFileSync(path.join(_this3.configs.client.output.path, file), 'utf-8');
                };
                try {
                    object.clientManifest = JSON.parse(readFile('vue-ssr-client-manifest.json'));
                } catch (e) {}
                object.bundle && callback(object.bundle, { clientManifest: object.clientManifest });
            });
        }
    }, {
        key: 'serverDevServer',
        value: function serverDevServer(object, callback) {
            var _this4 = this;

            var serverCompiler = webpack(this.configs.server);
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
                    return mfs.readFileSync(path.join(_this4.configs.client.output.path, file), 'utf-8');
                };
                try {
                    object.bundle = JSON.parse(readFile('vue-ssr-server-bundle.json'));
                } catch (e) {}
                object.clientManifest && callback(object.bundle, { clientManifest: object.clientManifest });
            });
        }
    }, {
        key: 'createDevServer',
        value: function createDevServer(cb) {
            var object = {
                bundle: null,
                resolve: null,
                clientManifest: null
            };

            var readyPromise = new Promise(function (r) {
                object.resolve = r;
            });
            var ready = function ready() {
                object.resolve();cb.apply(undefined, arguments);
            };

            this.clientDevServer(object, ready);
            this.serverDevServer(object, ready);

            return readyPromise;
        }
    }, {
        key: 'createProServer',
        value: function createProServer() {
            var _options2 = this.options,
                maxAge = _options2.maxAge,
                gzip = _options2.gzip,
                dynamic = _options2.dynamic;

            this.app.use(staticCache(this.configs.client.output.path, {
                prefix: this.configs.client.output.publicPath,
                maxAge: maxAge, gzip: gzip, dynamic: dynamic
            }));
        }
    }, {
        key: 'render',
        value: function render(ctx, resolve, reject) {
            var _this5 = this;

            var _options3 = this.options,
                cache = _options3.cache,
                title = _options3.title;

            var url = ctx.request.url;

            if (cache) {
                var hit = this.microCache.get(url);
                if (hit) {
                    if (!this.isProd) console.log(':', '[!]', url);
                    ctx.body = hit;
                    return;
                }
            }

            var context = {
                ctx: ctx, url: url,
                title: title,
                app: this.app
            };

            this.renderer.renderToString(context, function (err, html) {
                if (isError(err)) err.originUri = url;
                if (err) return reject(err);
                cache && _this5.microCache.set(url, html);
                resolve(html);
            });
        }
    }, {
        key: 'createServer',
        value: function createServer() {
            var _this6 = this;

            this.app.use(function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, next) {
                    var cache, body;
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    if (_this6.render) {
                                        _context2.next = 4;
                                        break;
                                    }

                                    _context2.next = 3;
                                    return next();

                                case 3:
                                    return _context2.abrupt('return', _context2.sent);

                                case 4:
                                    cache = _this6.options.cache;
                                    _context2.next = 7;
                                    return new Promise(function (resolve, reject) {
                                        if (_this6.isProd) {
                                            _this6.render(ctx, resolve, reject);
                                        } else {
                                            _this6.readyPromise.then(function () {
                                                return _this6.render(ctx, resolve, reject);
                                            });
                                        }
                                    }).catch(function (e) {
                                        return Promise.resolve(e);
                                    });

                                case 7:
                                    body = _context2.sent;


                                    if (!cache) {
                                        ctx.set('Expires', 0);
                                        ctx.set('Cache-Control', 'no-cache');
                                        ctx.set('Pragma', 'no-cache');
                                    }

                                    if (!isError(body)) {
                                        _context2.next = 26;
                                        break;
                                    }

                                    _context2.t0 = body.code;
                                    _context2.next = _context2.t0 === 404 ? 13 : _context2.t0 === 302 ? 17 : 23;
                                    break;

                                case 13:
                                    ctx.status = 404;
                                    _context2.next = 16;
                                    return next();

                                case 16:
                                    return _context2.abrupt('return', _context2.sent);

                                case 17:
                                    if (!body.url) {
                                        _context2.next = 21;
                                        break;
                                    }

                                    ctx.redirect(body.url);
                                    _context2.next = 22;
                                    break;

                                case 21:
                                    throw new Error('302 redirect: miss url');

                                case 22:
                                    return _context2.abrupt('break', 24);

                                case 23:
                                    if (EventEmitter.listenerCount(_this6, 'error') === 0) {
                                        ctx.status = body.code || 500;
                                        ctx.body = '\n                                <h1>Internet Server Error ' + ctx.status + '</h1>\n                                <p>Origin url: ' + body.originUri + '</p>\n                                <pre>' + body.stack + '</pre>\n                            ';
                                    } else {
                                        _this6.emit('error', ctx, body);
                                    }

                                case 24:
                                    _context2.next = 27;
                                    break;

                                case 26:
                                    ctx.body = body;

                                case 27:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this6);
                }));

                return function (_x4, _x5) {
                    return _ref2.apply(this, arguments);
                };
            }());
        }
    }]);
    return MioxKoaVue2xServerSideRenderer;
}(EventEmitter);

module.exports = MioxKoaVue2xServerSideRenderer;

function isError(err) {
    return err instanceof Error || Object.prototype.toString.call(err) === '[object Error]';
}