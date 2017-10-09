'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Created by evio on 2017/8/29.
 */

exports.default = function (ctx) {
  var container = void 0;

  Object.defineProperty(ctx, 'element', {
    get: function get() {
      return container;
    }
  });

  switch (ctx.env) {
    case 'client':
      container = ctx.get('container').querySelector('.mx-webviews');
      break;
    case 'web':
      var element = ctx.get('container');
      var root = global.document.createElement('div');
      container = global.document.createElement('div');

      element.appendChild(root);
      root.appendChild(container);

      root.classList.add('mx-app');
      container.classList.add('mx-webviews');
      break;
  }
};

module.exports = exports['default'];