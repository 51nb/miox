import 'miox-css';
import Miox from 'miox';
import Engine from 'miox-vue2x';
import Animate from 'miox-animation';
import Router from 'miox-router';
import VueContainer from 'miox-vue2x-container';

import A from './webviews/0.vue';
import B from './webviews/1.vue';
import C from './webviews/2.vue';
import D from './webviews/3.vue';
import E from './webviews/4.vue';
import Container from './webviews/container.vue';

const router = new Router();

router.patch('/', async ctx => {
    await ctx.render(A);
});

router.patch('/b', async ctx => {
    await ctx.render(B);
});

router.patch('/c', async ctx => {
    await ctx.render(C);
});

router.patch('/d', async ctx => {
    await ctx.render(D);
});

router.patch('/e', async ctx => {
    await ctx.render(E);
});

const app = global.miox = new Miox({ session: true, max: 3 });
app.set('engine', Engine);
app.set('animate', Animate('slide'));
app.install(VueContainer(Container));
app.use(router.routes());
export default app.listen();