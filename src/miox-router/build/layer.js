'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Layer = function () {
  function Layer(path, methods, middleware) {
    var _this = this;

    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    (0, _classCallCheck3.default)(this, Layer);

    this.opts = opts;
    this.name = this.opts.name || null;
    this.methods = [];
    this.paramNames = [];
    this.stack = Array.isArray(middleware) ? middleware : [middleware];
    methods.forEach(function (method) {
      return _this.methods.push(method.toUpperCase());
    });
    this.stack.forEach(function (fn) {
      var type = typeof fn === 'undefined' ? 'undefined' : (0, _typeof3.default)(fn);
      if (type !== 'function') {
        throw new Error(methods.toString() + " `" + (_this.opts.name || path) + "`: `middleware` " + "must be a function, not `" + type + "`");
      }
    });
    this.path = path;
    this.regexp = (0, _pathToRegexp2.default)(path, this.paramNames, this.opts);
  }

  (0, _createClass3.default)(Layer, [{
    key: 'match',
    value: function match(path) {
      return this.regexp.test(path);
    }
  }, {
    key: 'params',
    value: function params(path, captures, existingParams) {
      var params = existingParams || {};

      for (var len = captures.length, i = 0; i < len; i++) {
        if (this.paramNames[i]) {
          var c = captures[i];
          params[this.paramNames[i].name] = c ? safeDecodeURIComponent(c) : c;
        }
      }

      return params;
    }
  }, {
    key: 'captures',
    value: function captures(path) {
      if (this.opts.ignoreCaptures) return [];
      return path.match(this.regexp).slice(1);
    }
  }, {
    key: 'url',
    value: function url(params) {
      var args = params;
      var url = this.path.replace('\(\.\*\)', '');
      var toPath = _pathToRegexp2.default.compile(url);

      // argument is of form { key: val }
      if ((typeof params === 'undefined' ? 'undefined' : (0, _typeof3.default)(params)) != 'object') {
        args = Array.prototype.slice.call(arguments);
      }

      if (args instanceof Array) {
        var tokens = _pathToRegexp2.default.parse(url);
        var replace = {};
        for (var len = tokens.length, i = 0, j = 0; i < len; i++) {
          if (tokens[i].name) replace[tokens[i].name] = args[j++];
        }
        return toPath(replace);
      } else {
        return toPath(params);
      }
    }
  }, {
    key: 'param',
    value: function param(_param, fn) {
      var stack = this.stack;
      var params = this.paramNames;
      var middleware = function middleware(ctx, next) {
        return fn.call(this, ctx.params[_param], ctx, next);
      };

      middleware.param = _param;

      var names = params.map(function (p) {
        return p.name;
      });
      var x = names.indexOf(_param);

      if (x > -1) {
        // iterate through the stack, to figure out where to place the handler fn
        stack.some(function (fn, i) {
          // param handlers are always first, so when we find an fn w/o a param property, stop here
          // if the param handler at this part of the stack comes after the one we are adding, stop here
          if (!fn.param || names.indexOf(fn.param) > x) {
            // inject this param handler right before the current item
            stack.splice(i, 0, middleware);
            return true; // then break the loop
          }
        });
      }

      return this;
    }
  }, {
    key: 'setPrefix',
    value: function setPrefix(prefix) {
      if (this.path) {
        this.path = prefix + (this.path === '/' ? '' : this.path);
        this.paramNames = [];
        this.regexp = (0, _pathToRegexp2.default)(this.path, this.paramNames, this.opts);
      }

      return this;
    }
  }]);
  return Layer;
}();

exports.default = Layer;


function safeDecodeURIComponent(text) {
  try {
    return decodeURIComponent(text);
  } catch (e) {
    return text;
  }
}
module.exports = exports['default'];