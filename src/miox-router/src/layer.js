import pathToRegExp from 'path-to-regexp';

export default class Layer {
  constructor(path, methods, middleware, opts = {}) {
    this.opts = opts;
    this.name = this.opts.name || null;
    this.methods = [];
    this.paramNames = [];
    this.stack = Array.isArray(middleware) ? middleware : [middleware];
    methods.forEach(method => this.methods.push(method.toUpperCase()));
    this.stack.forEach(fn => {
      const type = (typeof fn);
      if (type !== 'function') {
        throw new Error(
          methods.toString() + " `" + (this.opts.name || path) +"`: `middleware` "
          + "must be a function, not `" + type + "`"
        );
      }
    });
    this.path = path;
    this.regexp = pathToRegExp(path, this.paramNames, this.opts);
  }

  match(path) {
    return this.regexp.test(path);
  }

  params(path, captures, existingParams) {
    const params = existingParams || {};

    for (let len = captures.length, i = 0; i < len; i++) {
      if (this.paramNames[i]) {
        const c = captures[i];
        params[this.paramNames[i].name] = c ? safeDecodeURIComponent(c) : c;
      }
    }

    return params;
  }

  captures(path) {
    if (this.opts.ignoreCaptures) return [];
    return path.match(this.regexp).slice(1);
  }

  url(params) {
    let args = params;
    const url = this.path.replace('\(\.\*\)', '');
    const toPath = pathToRegExp.compile(url);
  
    // argument is of form { key: val }
    if (typeof params != 'object') {
      args = Array.prototype.slice.call(arguments);
    }

    if (args instanceof Array) {
      const tokens = pathToRegExp.parse(url);
      const replace = {};
      for (let len = tokens.length, i=0, j=0; i<len; i++) {
        if (tokens[i].name) replace[tokens[i].name] = args[j++];
      }
      return toPath(replace);
    }
    else {
      return toPath(params);
    }
  }

  param(param, fn) {
    const stack = this.stack;
    const params = this.paramNames;
    const middleware = function (ctx, next) { 
      return fn.call(this, ctx.params[param], ctx, next); 
    };

    middleware.param = param;
  
    const names = params.map(p => p.name);
    const x = names.indexOf(param);

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

  setPrefix(prefix) {
    if (this.path) {
      this.path = prefix + (this.path === '/' ? '' : this.path);
      this.paramNames = [];
      this.regexp = pathToRegExp(this.path, this.paramNames, this.opts);
    }
  
    return this;
  }
}

function safeDecodeURIComponent(text) {
  try {
    return decodeURIComponent(text);
  } catch (e) {
    return text;
  }
}