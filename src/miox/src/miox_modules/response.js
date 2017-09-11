/**
 * Created by evio on 2017/8/29.
 */
import Render from '../lib/render';
import Dictionary from './dictionary';

export default class Response {
    constructor(options = {}) {
        this.options = options;
        this.__defineMixinResponse__();
    }

    __defineMixinResponse__() {
        for (const res in this.options) {
            if (typeof this.options[res] === 'function') {
                this[res] = this.options[res].bind(this.options);
            } else {
                this[res] = this.options[res];
            }
        }
    }

    /**
     * 渲染引擎模板
     * @param engine
     * @param webview
     * @param data
     * @returns {Promise.<null>}
     */
    async render(engine, webview, data = {}) {
        const app = this.app;

        if (!webview.dic) {
            /**
             * 在webview上植入dic对象用来缓存对应的构造体
             * @type {Dictionary}
             */
            webview.dic = new Dictionary();
        }

        /**
         * 在SSR的时候，我们只要将编译后的对象设置到active-webview上即可
         * 无需做过多的处理
         * 因为在服务端渲染时候，只是渲染当前的对象，跟之后的逻辑对象无关
         */
        if (app.env === 'server') {
            const mark = app.options.strict ? app.req.mark : app.req.pathname;
            const component = await engine.create(webview, data);
            app.cache.set(app.req.pathname, webview);
            webview.dic.set(mark, component);
            return app.set('active-webview', {
                basic: webview,
                mark
            });
        }

        return await Render(app, engine, webview, data);
    }
}