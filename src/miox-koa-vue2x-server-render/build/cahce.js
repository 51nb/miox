'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crypto = require('crypto');
var fs = require('mz/fs');
var zlib = require('mz/zlib');
var path = require('path');
var mime = require('mime-types');
var compressible = require('compressible');
var readDir = require('fs-readdir-recursive');
var debug = require('debug')('koa-static-cache');

module.exports = function staticCache(dir, options, files) {
    var _this = this;

    if ((typeof dir === 'undefined' ? 'undefined' : (0, _typeof3.default)(dir)) === 'object') {
        files = options;
        options = dir;
        dir = null;
    }

    options = options || {};
    // prefix must be ASCII code
    options.prefix = (options.prefix || '').replace(/\/*$/, '/');
    files = files || options.files || Object.create(null);
    dir = dir || options.dir || process.cwd();
    var enableGzip = !!options.gzip;
    var filePrefix = path.normalize(options.prefix.replace(/^\//, ''));

    // option.filter
    var fileFilter = function fileFilter() {
        return true;
    };
    if (Array.isArray(options.filter)) fileFilter = function fileFilter(file) {
        return ~options.filter.indexOf(file);
    };
    if (typeof options.filter === 'function') fileFilter = options.filter;

    if (options.preload !== false) {
        readDir(dir).filter(fileFilter).forEach(function (name) {
            loadFile(name, dir, options, files);
        });
    }

    if (options.alias) {
        Object.keys(options.alias).forEach(function (key) {
            var value = options.alias[key];

            if (files[value]) {
                files[key] = files[value];

                debug('aliasing ' + value + ' as ' + key);
            }
        });
    }

    return function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
            var filename, file, s, stats, acceptGzip, shouldGzip, gzFile, stream, hash;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!(ctx.method !== 'HEAD' && ctx.method !== 'GET')) {
                                _context.next = 4;
                                break;
                            }

                            _context.next = 3;
                            return next();

                        case 3:
                            return _context.abrupt('return', _context.sent);

                        case 4:
                            if (!(ctx.path.indexOf(options.prefix) !== 0)) {
                                _context.next = 8;
                                break;
                            }

                            _context.next = 7;
                            return next();

                        case 7:
                            return _context.abrupt('return', _context.sent);

                        case 8:

                            // decode for `/%E4%B8%AD%E6%96%87`
                            // normalize for `//index`
                            filename = safeDecodeURIComponent(path.normalize(ctx.path));
                            file = files[filename];

                            // try to load file

                            if (file) {
                                _context.next = 42;
                                break;
                            }

                            if (options.dynamic) {
                                _context.next = 15;
                                break;
                            }

                            _context.next = 14;
                            return next();

                        case 14:
                            return _context.abrupt('return', _context.sent);

                        case 15:
                            if (!(path.basename(filename)[0] === '.')) {
                                _context.next = 19;
                                break;
                            }

                            _context.next = 18;
                            return next();

                        case 18:
                            return _context.abrupt('return', _context.sent);

                        case 19:
                            if (filename.charAt(0) === path.sep) filename = filename.slice(1);

                            // trim prefix

                            if (!(options.prefix !== '/')) {
                                _context.next = 26;
                                break;
                            }

                            if (!(filename.indexOf(filePrefix) !== 0)) {
                                _context.next = 25;
                                break;
                            }

                            _context.next = 24;
                            return next();

                        case 24:
                            return _context.abrupt('return', _context.sent);

                        case 25:
                            filename = filename.slice(filePrefix.length);

                        case 26:
                            _context.prev = 26;
                            _context.next = 29;
                            return fs.stat(path.join(dir, filename));

                        case 29:
                            s = _context.sent;
                            _context.next = 37;
                            break;

                        case 32:
                            _context.prev = 32;
                            _context.t0 = _context['catch'](26);
                            _context.next = 36;
                            return next();

                        case 36:
                            return _context.abrupt('return', _context.sent);

                        case 37:
                            if (s.isFile()) {
                                _context.next = 41;
                                break;
                            }

                            _context.next = 40;
                            return next();

                        case 40:
                            return _context.abrupt('return', _context.sent);

                        case 41:

                            file = loadFile(filename, dir, options, files);

                        case 42:

                            ctx.status = 200;

                            if (enableGzip) ctx.vary('Accept-Encoding');

                            if (file.buffer) {
                                _context.next = 49;
                                break;
                            }

                            _context.next = 47;
                            return fs.stat(file.path);

                        case 47:
                            stats = _context.sent;

                            if (stats.mtime > file.mtime) {
                                file.mtime = stats.mtime;
                                file.md5 = null;
                                file.length = stats.size;
                            }

                        case 49:

                            ctx.response.lastModified = file.mtime;
                            if (file.md5) ctx.response.etag = file.md5;

                            if (!ctx.fresh) {
                                _context.next = 53;
                                break;
                            }

                            return _context.abrupt('return', ctx.status = 304);

                        case 53:

                            ctx.type = file.type;
                            ctx.length = file.zipBuffer ? file.zipBuffer.length : file.length;
                            ctx.set('cache-control', file.cacheControl || 'public, max-age=' + file.maxAge);
                            if (file.md5) ctx.set('content-md5', file.md5);

                            if (!(ctx.method === 'HEAD')) {
                                _context.next = 59;
                                break;
                            }

                            return _context.abrupt('return');

                        case 59:
                            acceptGzip = ctx.acceptsEncodings('gzip') === 'gzip';

                            if (!file.zipBuffer) {
                                _context.next = 63;
                                break;
                            }

                            if (acceptGzip) {
                                ctx.set('content-encoding', 'gzip');
                                ctx.body = file.zipBuffer;
                            } else {
                                ctx.body = file.buffer;
                            }
                            return _context.abrupt('return');

                        case 63:
                            shouldGzip = enableGzip && file.length > 1024 && acceptGzip && compressible(file.type);

                            if (!file.buffer) {
                                _context.next = 80;
                                break;
                            }

                            if (!shouldGzip) {
                                _context.next = 78;
                                break;
                            }

                            gzFile = files[filename + '.gz'];

                            if (!(options.usePrecompiledGzip && gzFile && gzFile.buffer)) {
                                _context.next = 71;
                                break;
                            }

                            // if .gz file already read from disk
                            file.zipBuffer = gzFile.buffer;
                            _context.next = 74;
                            break;

                        case 71:
                            _context.next = 73;
                            return zlib.gzip(file.buffer);

                        case 73:
                            file.zipBuffer = _context.sent;

                        case 74:
                            ctx.set('content-encoding', 'gzip');
                            ctx.body = file.zipBuffer;
                            _context.next = 79;
                            break;

                        case 78:
                            ctx.body = file.buffer;

                        case 79:
                            return _context.abrupt('return');

                        case 80:
                            stream = fs.createReadStream(file.path);

                            // update file hash

                            if (!file.md5) {
                                hash = crypto.createHash('md5');

                                stream.on('data', hash.update.bind(hash));
                                stream.on('end', function () {
                                    file.md5 = hash.digest('base64');
                                });
                            }

                            ctx.body = stream;
                            // enable gzip will remove content length
                            if (shouldGzip) {
                                ctx.remove('content-length');
                                ctx.set('content-encoding', 'gzip');
                                ctx.body = stream.pipe(zlib.createGzip());
                            }

                        case 84:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[26, 32]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
};

function safeDecodeURIComponent(text) {
    try {
        return decodeURIComponent(text);
    } catch (e) {
        return text;
    }
}

/**
 * load file and add file content to cache
 *
 * @param {String} name
 * @param {String} dir
 * @param {Object} options
 * @param {Object} files
 * @return {Object}
 * @api private
 */

function loadFile(name, dir, options, files) {
    var pathname = path.normalize(path.join(options.prefix, name));
    var obj = files[pathname] = files[pathname] ? files[pathname] : {};
    var filename = obj.path = path.join(dir, name);
    var stats = fs.statSync(filename);
    var buffer = fs.readFileSync(filename);

    obj.cacheControl = options.cacheControl;
    obj.maxAge = obj.maxAge ? obj.maxAge : options.maxAge || 0;
    obj.type = obj.mime = mime.lookup(pathname) || 'application/octet-stream';
    obj.mtime = stats.mtime;
    obj.length = stats.size;
    obj.md5 = crypto.createHash('md5').update(buffer).digest('base64');

    debug('file: ' + JSON.stringify(obj, null, 2));
    if (options.buffer) obj.buffer = buffer;

    buffer = null;
    return obj;
}