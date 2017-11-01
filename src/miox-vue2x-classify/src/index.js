import component from './component';
import { createDecorator, lifeCycles } from './util';
export const life = require('./life');
export const filter = require('./filter');
export const watch = require('./watch');
export const directive = require('./directive');
export const error = require('./error');
export const CreateDecorator = createDecorator;
export function Component(options) {
  if (typeof options === 'function') return component(options);
  return target => component(target, options);
}
export function RegisterLifeCycle(...args) {
  lifeCycles.push(...args);
}