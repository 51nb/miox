import React from 'react';
import ReactDom from 'react-dom';

export default class ReactEngine {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async create(webView, options) {
    ReactDom.render(
      React.createElement(webView, options),
      this.createWebViewRoot()
    );
  }

  createWebViewRoot(){
    if (!global.document) return;
    const element = global.document.createElement('div');

    this.ctx.element.appendChild(element);
    element.classList.add('mx-webview');

    return element;
}
}