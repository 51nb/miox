const { createDecorator } = require('./util');
const errorPrefixes = ['renderError', 'errorCaptured'];

export default function error(target, key, descriptor) {
  return (
    createDecorator(
      (options, key) => {
        if (!~errorPrefixes.indexOf(key)) {
          throw new Error(key + ' is not a error handle in Vue');
        }
        options[key] = descriptor.value;
      }
    )
  )(target, key);
}