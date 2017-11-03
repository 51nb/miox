const { createDecorator, removeVueMethod } = require('./util');

export default function directive(target, key, descriptor) {
  return (
    createDecorator(
      (options, key) => {
        const handle = descriptor.value;
        const directive = {};

        const value = typeof handle === 'function' 
          ? handle.call(target, directive) 
          : handle || {};

        (options.directives || (options.directives = {}))[key] = value ? value : directive;
        
        removeVueMethod(options, key);
      }
    )
  )(target, key);
}