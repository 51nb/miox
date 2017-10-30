const { lifeCycles, createDecorator } = require('./util');

export default function life(target, key, descriptor) {
  return (
    createDecorator(
      (options, key) => options[key] = descriptor.value
    )
  )(target, key);
}