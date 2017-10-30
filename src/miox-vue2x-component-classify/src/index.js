import component from './component';
export { createDecorator, lifeCycles } from './util';
export const life = require('./life');
export const filter = require('./filter');
export const watch = require('./watch');
export const directive = require('./directive');
export const error = require('./error');
export function Component(options) {
  if (typeof options === 'function') return component(options);
  return target => component(target, options);
}
export function registerLifeCycle(...args) {
  lifeCycles.push(...args);
}