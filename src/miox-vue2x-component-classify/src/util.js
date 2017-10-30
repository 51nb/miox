export const lifeCycles = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeDestroy',
  'destroyed',
  'beforeUpdate',
  'updated',
  'activated',
  'deactivated'
];

export function createDecorator(handle) {
  return (target, key, index) => {
    const ctx = typeof target === 'function'
      ? target
      : target.constructor;

    if (!ctx.__decorators__) ctx.__decorators__ = [];
    if (typeof index !== 'number') index = undefined;
    ctx.__decorators__.push(
      options => handle(options, key, index)
    );
  }
}

export function removeVueMethod(options, methodName) {
  if (options.methods && options.methods[methodName]) {
    delete options.methods[methodName];
  }
}