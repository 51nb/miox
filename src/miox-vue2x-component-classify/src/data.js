export default function VueDecoratorDataFactory(viewModule, Component) {
  Component.prototype._init = function() {
    const keys = Object.getOwnPropertyNames(viewModule);
    if (viewModule.$options.props) {
      for (const key in viewModule.$options.props) {
        if (!vm.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
    }
    keys.forEach(key => {
      if (key.charAt(0) !== '_') {
        Object.defineProperty(this, key, {
          get: () => vm[key],
          set: value => vm[key] = value
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