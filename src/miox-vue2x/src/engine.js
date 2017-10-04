/**
 * Created by evio on 2017/3/20.
 */
import isClass from 'is-class';
import Webview from './webview';
import Vue from 'vue';
import directives from './directives';

/**
 * Vue2x 驱动引擎
 */
export default class Engine {
    constructor(ctx) {
        this.ctx = ctx;

        ctx.on('app:end', () => {
            if (ctx.env === 'server') return;
            const scripts = ctx.element.querySelectorAll('script');
            let i = scripts.length;

            while (i--) {
                const script = scripts[i];
                if (script && script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            }
        });
        ctx.on('server:render:polyfill', context => {
            const store = ctx.get('vuex');
            if (store) {
                context.state = store.state;
            }
        });

        ctx.on('client:render:polyfill', () => {
            const store = ctx.get('vuex');
            if (global.__INITIAL_STATE__ && store) {
                store.replaceState(global.__INITIAL_STATE__);
            }
        });

        ctx.on('client:render:mount', viewModule => {
            if (!ctx.element) throw new Error('miss ctx.element');
            if (!viewModule) throw new Error('miss view module');

            const el = ctx.element.querySelector('[data-server-rendered=true]');
            if (!el) throw new Error('miss data-server-rendered element');

            viewModule.$mount(el);
        });
    }

    async create(webview, options) {
        webview = checkWebViewObject(webview);
        return await new Promise((resolve, reject) => {
            try {
                const Arguments = {};

                switch (this.ctx.env) {
                    case 'web':
                        Arguments.el = this.createWebViewRoot();
                        break;
                    case 'client':
                        if (this.ctx.installed) {
                            Arguments.el = this.createWebViewRoot();
                        }
                        break;
                }

                Arguments.propsData = options || {};
                Arguments.extends = Webview;

                new webview(Arguments).$on('webview:created', function(){
                    resolve(this);
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    async destroy(target) {
        target.$destroy();
    }

    async active(target) {
        target.$emit('webview:active');
    }

    async enter(target) {
        target.$emit('webview:enter');
    }

    async leave(target) {
        target.$emit('webview:leave');
    }

    async searchchange(target, prev, next) {
        target.$emit('webview:searchchange', prev, next);
    }

    async hashchange(target, prev, next) {
        target.$emit('webview:hashchange', prev, next);
    }

    element(target) {
        return target.__MioxInjectElement__;
    }

    install() {
        Vue.prototype.$miox = this.ctx;
        directives(this.ctx);
    }

    createWebViewRoot(){
        if (!global.document) return;
        const element = global.document.createElement('div');
        const wrapElement = global.document.createElement('div');

        this.ctx.element.appendChild(element);
        element.appendChild(wrapElement);
        element.classList.add('mx-webview');

        return wrapElement;
    }

    ssr() {
        this.ctx.emit('app:start');
        return async options => {
            const { url, app, ctx } = options;
            this.ctx.$application = app;
            this.ctx.$context = ctx;
            await this.ctx.createServerProgress(url);
            await this.ctx.emit('app:end');
            if (this.ctx.err) {
                throw this.ctx.err;
            } else {
                await this.ctx.emit('server:render:polyfill', options);
                return this.ctx.webView;
            }
        }
    }
}

function checkWebViewObject(webview) {
    if ( !isClass(webview) && typeof webview !== 'function' ){
        try{
            webview = Vue.extend(webview);
        } catch(e) {
            throw new Error('`webview` argument is not a class object or a function or an object.');
        }
    }
    return webview;
}