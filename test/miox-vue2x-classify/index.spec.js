import { Component, life, watch, CreateDecorator } from 'miox-vue2x-classify';
import Vue from 'vue';

describe('Miox vue2x classify', () => {
  it('lifecycles', () => {
    let created = false
    let destroyed = false

    @Component
    class MyComp extends Vue {
      @life created () {
        created = true;
      }

      @life destroyed () {
        destroyed = true
      }
    }

    const c = new MyComp()
    expect(created).toBeTruthy();
    expect(destroyed).toBeFalsy();
    c.$destroy()
    expect(destroyed).toBeTruthy();
  });

  it('data: should collect from class properties', () => {
    @Component({
      props: ['foo']
    })
    class MyComp extends Vue {
      a = 'hello';
      b = this.foo + 1;
    }

    const c = new MyComp({
      propsData: {
        foo: 1
      }
    });

    expect(c.a).toBe('hello');
    expect(c.b).toBe(2);
  })

  it('data: should collect custom property defined on beforeCreate', () => {
    @Component
    class MyComp extends Vue {
      foo = 'Hello, ' + this.$store.state.msg

      @life beforeCreate () {
        this.$store = {
          state: {
            msg: 'world'
          }
        }
      }
    }

    const c = new MyComp()
    expect(c.foo).toBe('Hello, world')
  });

  it('methods', () => {
    let msg = '';

    @Component
    class MyComp extends Vue {
      hello () {
        msg = 'hi'
      }
    }

    const c = new MyComp()
    c.hello();
    expect(msg).toBe('hi');
  })

  it('computed', () => {
    @Component
    class MyComp extends Vue {
      a = 1;

      get b () {
        return this.a + 1
      }
    }

    const c = new MyComp()
    expect(c.a).toBe(1)
    expect(c.b).toBe(2)
    c.a = 2
    expect(c.b).toBe(3)
  });

  describe('name', () => {
    it('via name option', () => {
      @Component({ name: 'test' })
      class MyComp extends Vue {}

      const c = new MyComp()
      expect(c.$options.name).toBe('test')
    })

    it('via _componentTag', () => {
      @Component
      class MyComp extends Vue {
        static _componentTag = 'test'
      }

      const c = new MyComp()
      expect(c.$options.name).toBe('test')
    })

    it('via class name', () => {
      @Component
      class MyComp extends Vue {}

      const c = new MyComp()
      expect(c.$options.name).toBe('MyComp')
    })
  });

  describe('via watch', () => {
    it('other options', (done) => {
      let v;
  
      @Component({
        watch: {
          a: val => v = val
        }
      })
      class MyComp extends Vue {
        a = 1;
  
        @watch 'this.a'(val) {
          v = val;
        }
      }
  
      const c = new MyComp()
      c.a = 2
      Vue.nextTick(() => {
        expect(v).toBe(2);
        done()
      })
    });
    it('other options', (done) => {
      let v;
  
      @Component({
        watch: {
          a: val => v = val
        }
      })
      class MyComp extends Vue {
        a = 1;
  
        @watch('a') onAChange(val) {
          v = val;
        }
      }
  
      const c = new MyComp()
      c.a = 2
      Vue.nextTick(() => {
        expect(v).toBe(2);
        done()
      })
    })
  })


  it('extending', function () {
    @Component
    class Base extends Vue {
      a = 1;
    }

    @Component
    class A extends Base {
      b = 2;
    }

    const a = new A()
    expect(a.a).toBe(1)
    expect(a.b).toBe(2)
  })
  
  it('createDecorator', function () {
    let a;
    const NoCache = CreateDecorator((options, key) => {
      // component options should be passed to the callback
      // and update for the options object affect the component
      options.computed[key].set = function(val) {
        a = val;
      }
    })

    @Component
    class MyComp extends Vue {
      @NoCache get bar () {
        return 'world'
      }
    }

    const c = new MyComp()
    expect(c.bar).toBe('world');
    c.bar = 'uuu';
    expect(a).toBe('uuu');
  })

  it('createDecorator: decorate correctly even if a component is created in another @Component decorator', () => {
    // Just assigns the given value to the decorated property
    const Value = (value) => CreateDecorator((options, key) => {
      const data = options.data || (() => ({}))
      options.data = function () {
        return {
          ...data.call(this),
          [key]: value
        }
      }
    })

    const createChild = () => {
      @Component
      class Child extends Vue {
        @Value('child') value = '';
      }
      return Child
    }

    @Component({
      components: {
        Child: createChild()
      }
    })
    class Parent extends Vue {
      @Value('parent')
      value = ''
    }

    const parent = new Parent()
    const child = new parent.$options.components.Child()
    expect(parent.value).toBe('parent')
    expect(child.value).toBe('child')
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

  it('forwardStatics', function () {
    @Component
    class MyComp extends Vue {
      static myValue = 52
    }
    
    expect(MyComp.myValue).toBe(52);
  })

});