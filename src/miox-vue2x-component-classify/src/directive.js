const { createDecorator } = require('./util');

export default function directive(target, key, descriptor) {
  return (
    createDecorator(
      (options, key) => {
        const handle = descriptor.value;
        const directive = {};
        const value = handle.call(target, directive);
        (options.directives || (options.directives = {}))[key] = value ? value : directive;
      }
    )
  )(target, key);
}