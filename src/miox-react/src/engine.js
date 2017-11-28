import React from 'react';
import ReactDom from 'react-dom';

export default class ReactEngine {
  constructor(ctx) {
    this.ctx = ctx;
  }

  element(target) {
    return target.__MioxInjectElement__;
  }

  async create(webView, options) {
    const element = this.createWebViewRoot();
    const dom = React.createElement(webView, options);
    const view = ReactDom.render(dom, element);
    Object.defineProperty(view, '__MioxInjectElement__', {
      get() {
        return element;
      }
    });
    Object.defineProperty(view, 'element', {
      get() {
        return dom;
      }
    });
    return view;
  }

  async destroy(target) {
    const element = this.element(target);
    ReactDom.unmountComponentAtNode(element);
    element.parentNode.parentNode.removeChild(element.parentNode);
  }

  async active(target) {
    if (target.webViewDidActive) {
      await target.webViewDidActive();
    }
  }

  async enter(target) {
    if (target.webViewDidEnter) {
      await target.webViewDidEnter();
    }
  }

  async leave(target) {
    if (target.webViewDidLeave) {
      await target.webViewDidLeave();
    }
  }

  async searchchange(target, prev, next) {
    if (target.webViewDidSearchChange) {
      await target.webViewDidSearchChange(prev, next);
    }
  }

  async hashchange(target, prev, next) {
    if (target.webViewDidHashChange) {
      target.webViewDidHashChange(prev, next);
    }
  }

  install() {
    React.Component.prototype.$push = this.ctx.push.bind(this.ctx);
    React.Component.prototype.$go = this.ctx.go.bind(this.ctx);
    React.Component.prototype.$replace = this.ctx.replace.bind(this.ctx);
    React.Component.prototype.$redirect = this.ctx.redirect.bind(this.ctx);
    React.Component.prototype.$link = this.ctx.link.bind(this.ctx);
  }

  createWebViewRoot(){
    if (!global.document) return;
    const element = global.document.createElement('div');
    const container = global.document.createElement('div');

    this.ctx.element.appendChild(element);
    element.appendChild(container);
    element.classList.add('mx-webview');
    container.classList.add('mx-window');

    return container;
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
            return this.ctx.webView.element;
        }
    }
  }
}