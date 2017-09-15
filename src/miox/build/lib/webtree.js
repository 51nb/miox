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
        case 'server':
            return function (html) {
                return '<div class="mx-app"><div class="mx-webviews">' + html + '</div></div>';
            };
        case 'client':
            container = ctx.get('container').querySelector('.mx-webviews');
            break;
        default:
            var element = ctx.get('container');
            var root = global.document.createElement('div');
            container = global.document.createElement('div');

            element.appendChild(root);
            root.appendChild(container);

            root.classList.add('mx-app');
            container.classList.add('mx-webviews');
    }
};

module.exports = exports['default'];