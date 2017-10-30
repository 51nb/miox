const { createDecorator } = require('./util');

export default function filter(target, key, descriptor) {
  return (
    createDecorator(
      (options, key) => (options.filters || (options.filters = {}))[key] = descriptor.value
    )
  )(target, key);
}