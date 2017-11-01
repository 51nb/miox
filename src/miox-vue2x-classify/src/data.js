export default function VueDecoratorDataFactory(viewModule, Component) {
  Component.prototype._init = function() {
    const keys = Object.getOwnPropertyNames(viewModule);
    if (viewModule.$options.props) {
      for (const key in viewModule.$options.props) {
        if (!viewModule.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
    }
    keys.forEach(key => {
      if (key.charAt(0) !== '_') {
        Object.defineProperty(this, key, {
          get: () => viewModule[key],
          set: value => viewModule[key] = value
        })
      }
    });   
  }

  const data = new Component();
  const plainData = {};
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined) {
      plainData[key] = data[key];
    }
  });

  return plainData;
}