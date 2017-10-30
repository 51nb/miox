const { createDecorator } = require('./util');

export default function watch(target, key, descriptor) {
  if (typeof target === 'string') {
    key = target;
    return (target, methodName, descriptor) => createWatcher(target, key, descriptor);
  }
  return createWatcher(target, key, descriptor);
}

function createWatcher(target, key, descriptor) {
  if (/^this/.test(key)) key = key.replace(/^this/, '');
  if (/^\./.test(key)) key = key.replace(/^\./, '');
  return (
    createDecorator(
      (options, key) => 
      (options.watch || (options.watch = {}))[key] = descriptor.value
    )
  )(target, key);
}