import Engine from './engine';
import webView from './webview';
import Vue from 'vue';
export default installer;

installer.WebView = Engine.WebView = Vue.extend(webView);

function installer(app) {
  app.set('engine', Engine);
}
