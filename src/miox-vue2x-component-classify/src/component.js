import Vue from 'vue';
import VueDecoratorDataFactory from './data';
const { functionOwnProperties, lifeCycles } = require('./util');

export default function VueComponentDecoratorFactory(webView, options = {}) {
  options.name = options.name 
    || webView._componentTag 
    || webView.name 
    || (webView.constructor ? webView.constructor.name : null)
    || (webView.prototype ? webView.prototype.name : null)
    || (webView.$options ? webView.$options.name : null)
    || 'VueComponent';

  const webViewPrototype = webView.prototype;
  const webviewRenderedPool = [];

  componentProperties(webViewPrototype, key => {
    const reject = key === 'constructor'
      || /^[\$\_]/.test(key)
      || webviewRenderedPool.indexOf(key) > -1
      || lifeCycles.indexOf(key) > -1;
    
    if (reject) return;
    webviewRenderedPool.push(key);
    const factory = webViewPrototype[key];

    switch (key) {
      case 'render':
        options.render = factory;
        break;
      case 'template':
        options.template = typeof factory === 'string' 
          ? factory 
          : factory();
        break;
      default:
        convertMethodsToOptions(webViewPrototype, key, options);
    }
  });

  (options.mixins || (options.mixins = [])).push({
    data() {
      return VueDecoratorDataFactory(this, webView);
    }
  });

  const decorators = webView.__decorators__;
  if (decorators) {
    decorators.forEach(fn => fn(options));
  }

  const superProto = Object.getPrototypeOf(webViewPrototype);
  const Super = superProto instanceof Vue
    ? superProto.constructor
    : Vue;
    
  const outComponent = Super.extend(options);
  for(let staticKey in webView) {
    if(webView.hasOwnProperty(staticKey)) {
      outComponent[staticKey] = webView[staticKey];
    }
  }
  return outComponent;
}

function convertMethodsToOptions(webViewPrototype, key, options) {
  const descriptor = Object.getOwnPropertyDescriptor(webViewPrototype, key);
  if ( !descriptor ) return;
  if (typeof descriptor.value === 'function') {
    (options.methods || (options.methods = {}))[key] = descriptor.value;
  } else if (descriptor.get || descriptor.set) {
    (options.computed || (options.computed = {}))[key] = {
      get: descriptor.get,
      set: descriptor.set
    };
  }
}

function componentProperties(obj, cb) {
  const proto = obj.__proto__;
  Object.getOwnPropertyNames(obj).forEach(cb);
  if (proto) componentProperties(proto, cb);
}