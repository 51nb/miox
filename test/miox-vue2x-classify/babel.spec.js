import { Component, life, watch, CreateDecorator, directive, filter, error } from 'miox-vue2x-classify';
import Vue from 'vue';
import Demo1 from './1.vue';
import Demo2 from './2.vue';
describe('vue-class-component with Babel', () => {
  it('should collect class properties as data', () => {
    @Component({
      props: ['propValue']
    })
    class MyComp extends Vue {
      foo = 'hello'
      bar = 1 + this.propValue
    }
    const c = new MyComp({
      propsData: {
        propValue: 1
      }
    })
    expect(c.foo).toBe('hello')
    expect(c.propValue).toBe(1)
    expect(c.bar).toBe(2)
  })

  it('should not collect uninitialized class properties', () => {
    const Prop = CreateDecorator((options, key) => {
      if (!options.props) {
        options.props = {}
      }
      options.props[key] = true
    })

    @Component
    class MyComp {
      foo
      @Prop bar
    }
    const c = new MyComp()
    expect('foo' in c.$data).toBeFalsy();
    expect('bar' in c.$data).toBeFalsy();
  })

  it('createDecrator: create a class decorator', () => {
    const DataMixin = CreateDecorator(options => {
      options.data = function () {
        return {
          test: 'foo'
        }
      }
    })

    @Component
    @DataMixin
    class MyComp extends Vue {}

    const vm = new MyComp()
    expect(vm.test).toBe('foo')
  })

  it('use directive', done => {
    const vm = new Demo1();
    const body = document.body;
    const div = document.createElement('div');
    body.appendChild(div);
    vm.$mount(div);
    setTimeout(() => {
      const _div = document.getElementById('test');
      expect(!!_div).toBe(true);
      expect(vm.time).toBe(2);
      vm.$destroy();
      done();
    }, 1000);
  })

  it('use filter', done => {
    const vm = new Demo2();
    const body = document.body;
    const div = document.createElement('div');
    body.appendChild(div);
    vm.$mount(div);
    setTimeout(() => {
      const _div = document.getElementById('filter');
      expect(!!_div).toBe(true);
      expect(_div.innerHTML).toBe('helloevio');
      vm.$destroy();
      done();
    }, 1000);
  })

  describe('use error', () => {
    it('with renderError', done => {
      @Component
      class MyComp extends Vue {
        time = 1;
        render (h) {
          throw new Error('oops')
        }
        @error renderError (h, err) {
          this.time = 2;
          return h('pre', { style: { color: 'red' }}, err.stack);
        }
      }
      const vm = new MyComp();
      const body = document.body;
      const div = document.createElement('div');
      body.appendChild(div);
      vm.$mount(div);
      setTimeout(() => {
        expect(vm.time).toBe(2);
        vm.$destroy();
        done();
      }, 1000);
    })

    it('with errorCaptured', done => {
      @Component
      class MyComp extends Vue {
        render (h) {
          return this.a(h);
        }
      }

      @Component({
        components: {
          'my-cmp': MyComp
        }
      })
      class CCC extends Vue {
        time = 3;
        @error errorCaptured () {
          this.time = 4;
        }

        render(h) {
          return h(MyComp);
        }
      }

      
      const vm = new CCC();
      const body = document.body;
      const div = document.createElement('div');
      body.appendChild(div);
      vm.$mount(div);
      setTimeout(() => {
        expect(vm.time).toBe(4);
        vm.$destroy();
        done();
      }, 1000);
    })
  })
})