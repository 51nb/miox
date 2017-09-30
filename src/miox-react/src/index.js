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
    const webview = ReactDom.render(
      React.createElement(webView, options),
      element
    );
    webview.__MioxInjectElement__ = element;
    return webview;
  }

  async destroy(target) {
    const element = this.element(target);
    ReactDom.unmountComponentAtNode(element);
    element.parentNode.removeChild(element);
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
    if (target.webViewSearchChange) {
      await target.webViewSearchChange(prev, next);
    }
  }

  async hashchange(target, prev, next) {
    if (target.webViewHashChange) {
      target.webViewHashChange(prev, next);
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

    this.ctx.element.appendChild(element);
    element.classList.add('mx-webview');

    return element;
  }
}