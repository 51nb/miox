import pathToRegExp from 'path-to-regexp';
import querystring from 'querystring';

export default class URI {
    constructor() {
        this.domains = {};
        this.setters = {};
        this.watcher = {};
    }

    compile(uri){
        return pathToRegExp.compile(uri);
    }

    format(name) {
        const selector = name.split(':');

        return {
            domain: selector[0],
            name: selector[1],
        };
    }

    watch(name, fn) {
        if (typeof fn !== 'function') {
            throw new Error('watcher must be a function.')
        }
        this.watcher[name] = fn;
    }

    domain(name, value) {
        const that = this;
        if (value) {
            this.domains[name] = value.replace(/\/$/, '');
            return {
                watch(fn) {
                    that.watch(name, fn);
                }
            };
        } else {
            return this.domains[name];
        }
    }

    path(mark, path) {
        if (path && typeof path === 'string') {
            this.setters[mark] = this.compile(path);
        } else {
            const { domain, name } = this.format(mark);

            if (this.domains[domain] === undefined || this.setters[name] === undefined) {
                throw new Error('no such marked sign');
            }
            let val = this.setters[name](path || {});
            if (this.watcher[domain]) {
                val = this.watcher[domain](val);
            }
            let pathname = this.domains[domain].replace(/^\/\//, '/') + val;
            const str = new String(pathname);
            str.parse = args => {
                const u = querystring.encode(args);
                if (u) {
                    pathname += '?' + u;
                }
                return pathname;
            }

            return str;
        }
    }
}