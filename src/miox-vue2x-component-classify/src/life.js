const { lifeCycles, createDecorator, removeVueMethod } = require('./util');

export default function life(target, key, descriptor) {
  return (
    createDecorator(
      (options, key) => {
        options[key] = descriptor.value;
        removeVueMethod(options, key);
      }
    )
  )(target, key);
}