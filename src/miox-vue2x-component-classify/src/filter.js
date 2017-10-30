const { createDecorator, removeVueMethod } = require('./util');

export default function filter(target, key, descriptor) {
  return (
    createDecorator(
      (options, key) => {
        (options.filters || (options.filters = {}))[key] = descriptor.value;
        removeVueMethod(options, key);
      }
    )
  )(target, key);
}