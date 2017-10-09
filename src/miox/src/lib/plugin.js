/**
 * Created by evio on 2017/8/29.
 */
import Dictionary from '../miox_modules/dictionary';
import isClass from 'is-class';

export default class Plugin extends Dictionary {
  constructor(context) {
    super();
    this.context = context;
  }

  Engine(value) {
    if (typeof value !== 'function' && !isClass(value)) {
      throw new Error('Engine must be a function or a class');
    }
    const engine = new value(this.context);
    if (typeof engine.install === 'function') {
      engine.install();
    }
    this.set('engine', engine);
  }

  Animate(value) {
    const animate = value(this.context);
    this.set('animate', animate);
  }
}