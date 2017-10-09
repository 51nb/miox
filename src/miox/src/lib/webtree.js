/**
 * Created by evio on 2017/8/29.
 */

export default ctx => {
  let container;

  Object.defineProperty(ctx, 'element', {
    get() {
      return container;
    }
  });

  switch (ctx.env) {
    case 'client':
      container = ctx.get('container').querySelector('.mx-webviews');
      break;
    case 'web':
      const element = ctx.get('container');
      const root = global.document.createElement('div');
      container = global.document.createElement('div');

      element.appendChild(root);
      root.appendChild(container);

      root.classList.add('mx-app');
      container.classList.add('mx-webviews');
      break;
  }
}