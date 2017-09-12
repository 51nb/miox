import Miox from 'miox';
import Engine from 'miox-vue2x';
import Router from 'miox-router';
import Animate from 'miox-animation';

// webviews
import A from './webviews/A.vue';
import B from './webviews/B.vue';
import C from './webviews/C.vue';
import D from './webviews/D.vue';
import E from './webviews/E.vue';

let switcher = false, listener;

describe('Miox全场景测试:', () => {
    beforeEach(removeAll, 1000);

    it('简单场景', cb => {
        progress({ max: 2 }, cb, async app => {
            expect(app.webView.$el.innerHTML).toEqual('A');
            expect(getPool(app)).toEqual('A');
        })
    }, 2000);

    it('插入3个地址:不带session:最大1个页面', cb => {
        progress({ max: 1 }, cb, async app => {
            expect(app.webView.text).toEqual('A');
            expect(getPool(app)).toEqual('A');
            app.push('/b');
            await delay(300);
            expect(app.webView.text).toEqual('B');
            expect(getPool(app)).toEqual('B');
            app.push('/c');
            await delay(300);
            expect(app.webView.text).toEqual('C');
            expect(getPool(app)).toEqual('C');
        });
    }, 10000);

    it('插入3个地址:带session:最大1个页面', cb => {
        progress({ max: 1, session: true, animate: true }, cb, async app => {
            expect(app.webView.text).toEqual('A');
            expect(getPool(app)).toEqual('A');
            app.push('/b');
            await delay(1000);
            expect(app.webView.text).toEqual('B');
            expect(getPool(app)).toEqual('B');
            app.push('/c');
            await delay(1000);
            expect(app.webView.text).toEqual('C');
            expect(getPool(app)).toEqual('C');
        });
    }, 10000);

    it('插入3个地址:不带session:最大3个页面', cb => {
        progress({ max: 3 }, cb, async app => {
            expect(app.webView.text).toEqual('A');
            expect(getPool(app)).toEqual('A');
            app.push('/b');
            await delay(300);
            expect(app.webView.text).toEqual('B');
            expect(getPool(app)).toEqual('A.B');
            app.push('/c');
            await delay(300);
            expect(app.webView.text).toEqual('C');
            expect(getPool(app)).toEqual('A.B.C');
        });
    }, 10000);

    it('插入3个地址:带session:最大3个页面', cb => {
        progress({ max: 3, session: true, animate: true }, cb, async app => {
            expect(app.webView.text).toEqual('A');
            expect(getPool(app)).toEqual('A');
            app.push('/b');
            await delay(1000);
            expect(app.webView.text).toEqual('B');
            expect(getPool(app)).toEqual('A.B');
            app.push('/c');
            await delay(1000);
            expect(app.webView.text).toEqual('C');
            expect(getPool(app)).toEqual('A.B.C');
        });
    }, 10000);

    it('回退场景:改变渲染变量:不带session:最大1个页面', cb => {
        progress({ max: 1 }, cb, async app => {
            expect(app.webView.text).toEqual('A');
            expect(getPool(app)).toEqual('A');
            app.push('/b');
            await delay(300);
            expect(app.webView.text).toEqual('B');
            expect(getPool(app)).toEqual('B');
            app.push('/c');
            await delay(300);
            expect(app.webView.text).toEqual('C');
            expect(getPool(app)).toEqual('C');
            switcher = true;
            app.go(-1);
            await delay(300);
            expect(app.webView.text).toEqual('E');
            expect(getPool(app)).toEqual('E');
        });
    }, 10000);

    it('回退场景:改变渲染变量:带session:最大1个页面', cb => {
        progress({ max: 1, session: true, animate: true }, cb, async app => {
            expect(app.webView.text).toEqual('A');
            expect(getPool(app)).toEqual('A');
            app.push('/b');
            await delay(1000);
            expect(app.webView.text).toEqual('B');
            expect(getPool(app)).toEqual('B');
            app.push('/c');
            await delay(1000);
            expect(app.webView.text).toEqual('C');
            expect(getPool(app)).toEqual('C');
            switcher = true;
            app.go(-1);
            await delay(1000);
            expect(app.webView.text).toEqual('E');
            expect(getPool(app)).toEqual('E');
        });
    }, 10000);


    it('回退场景:改变渲染变量:不带session:最大3个页面', cb => {
        progress({ max: 3 }, cb, async app => {
            expect(app.webView.text).toEqual('A');
            expect(getPool(app)).toEqual('A');
            app.push('/b');
            await delay(300);
            expect(app.webView.text).toEqual('B');
            expect(getPool(app)).toEqual('A.B');
            app.push('/c');
            await delay(300);
            expect(app.webView.text).toEqual('C');
            expect(getPool(app)).toEqual('A.B.C');
            switcher = true;
            app.go(-1);
            await delay(300);
            expect(app.webView.text).toEqual('E');
            expect(getPool(app)).toEqual('A.E.C');
        });
    }, 10000);

    it('回退场景:改变渲染变量:带session:最大3个页面', cb => {
        progress({ max: 3, session: true, animate: true }, cb, async app => {
            expect(app.webView.text).toEqual('A');
            expect(getPool(app)).toEqual('A');
            app.push('/b');
            await delay(1000);
            expect(app.webView.text).toEqual('B');
            expect(getPool(app)).toEqual('A.B');
            app.push('/c');
            await delay(1000);
            expect(app.webView.text).toEqual('C');
            expect(getPool(app)).toEqual('A.B.C');
            switcher = true;
            app.go(-1);
            await delay(1000);
            expect(app.webView.text).toEqual('E');
            expect(getPool(app)).toEqual('A.E.C');
        });
    }, 10000);

    it('中途刷新场景:不带session:最大1个页面', cb => {
        progress({ max: 1 }, cb, async app => {
            expect(app.webView.text).toEqual('A');
            expect(getPool(app)).toEqual('A');
            app.push('/b');
            await delay(300);
            expect(app.webView.text).toEqual('B');
            expect(getPool(app)).toEqual('B');
            app.push('/c');
            await delay(300);
            expect(app.webView.text).toEqual('C');
            expect(getPool(app)).toEqual('C');
            app.history.stacks = [];
            app.go(-1);
            await delay(300);
            expect(app.webView.text).toEqual('B');
            expect(getPool(app)).toEqual('B');
            app.go(-1);
            await delay(300);
            expect(app.webView.text).toEqual('A');
            expect(getPool(app)).toEqual('A');
        });
    }, 10000);

    it('中途刷新场景:带session:最大1个页面', cb => {
        progress({ max: 1, session: true, animate: true }, cb, async app => {
            expect(app.webView.text).toEqual('A');
            expect(getPool(app)).toEqual('A');
            app.push('/b');
            await delay(1000);
            expect(app.webView.text).toEqual('B');
            expect(getPool(app)).toEqual('B');
            app.push('/c');
            await delay(1000);
            expect(app.webView.text).toEqual('C');
            expect(getPool(app)).toEqual('C');
            app.history.stacks = [];
            app.go(-1);
            await delay(1000);
            expect(app.webView.text).toEqual('B');
            expect(getPool(app)).toEqual('B');
            app.go(-1);
            await delay(1000);
            expect(app.webView.text).toEqual('A');
            expect(getPool(app)).toEqual('A');
        });
    }, 10000);

    it('中途刷新场景:不带session:最大3个页面', cb => {
        progress({ max: 3 }, cb, async app => {
            expect(app.webView.text).toEqual('A');
            expect(getPool(app)).toEqual('A');
            app.push('/b');
            await delay(300);
            expect(app.webView.text).toEqual('B');
            expect(getPool(app)).toEqual('A.B');
            app.push('/c');
            await delay(300);
            expect(app.webView.text).toEqual('C');
            expect(getPool(app)).toEqual('A.B.C');
            app.history.stacks = [];
            app.go(-1);
            await delay(300);
            expect(app.webView.text).toEqual('B');
            expect(getPool(app)).toEqual('B');
            app.go(-1);
            await delay(300);
            expect(app.webView.text).toEqual('A');
            expect(getPool(app)).toEqual('B.A');
        });
    }, 10000);

    it('中途刷新场景:带session:最大3个页面', cb => {
        progress({ max: 3, session: true, animate: true }, cb, async app => {
            expect(app.webView.text).toEqual('A');
            expect(getPool(app)).toEqual('A');
            app.push('/b');
            await delay(1000);
            expect(app.webView.text).toEqual('B');
            expect(getPool(app)).toEqual('A.B');
            app.push('/c');
            await delay(1000);
            expect(app.webView.text).toEqual('C');
            expect(getPool(app)).toEqual('A.B.C');
            app.history.stacks = [];
            app.go(-1);
            await delay(1000);
            expect(app.webView.text).toEqual('B');
            expect(getPool(app)).toEqual('B');
            app.go(-1);
            await delay(1000);
            expect(app.webView.text).toEqual('A');
            expect(getPool(app)).toEqual('A.B');
        });
    }, 10000);

});

function removeAll() {
    document
        .querySelectorAll('.mx-app')
        .forEach(child => child.parentNode.removeChild(child));

    global.history.pushState(null, document.title, '/');

    [A, B, C, D, E].forEach(cmp => {
        delete cmp.dic;
    });

    switcher = false;

    if (typeof listener === 'function') {
        listener();
    }
}

async function delay(time = 0) {
    await new Promise(resolve => setTimeout(resolve, time));
}

function progress(options, cb, fn) {
    const app = new Miox(options);
    const route = new Router();

    app.on('app:end', () => fn(app).then(cb).catch(e => fail(e)));

    route.patch('/', async ctx => await ctx.render(A));
    route.patch('/c', async ctx => await ctx.render(C));
    route.patch('/d', async ctx => await ctx.render(D));
    route.patch('/b', async ctx => {
        if (switcher) {
            await ctx.render(E)
        } else {
            await ctx.render(B)
        }
    });

    app.set('engine', Engine);
    if (options.animate) {
        app.set('animate', Animate('slide'));
    }
    app.use(route.routes());
    listener = app.listen();
}

function getPool(app) {
    return app.history.stacks.map(v => v.text).join('.');
}