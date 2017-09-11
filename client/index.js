import 'miox-css';
import Miox from 'miox';
import { Engine } from 'miox-vue2x';
import IndexPage from './webviews/index.vue';
import HomePage from './webviews/home/index.vue';
import Animate from 'miox-animation';
import store from './webstore/index';
import Router from 'miox-router';
import C from './webviews/1.vue';
import D from './webviews/2.vue';
import E from './webviews/3.vue';
const router = new Router();

router.patch('/', async ctx => {
    await ctx.render(HomePage);
});

router.patch('/a', async ctx => {
    await ctx.render(IndexPage);
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

const app = global.miox = new Miox({ session: true, max: 2, debug: false});
app.set('engine', Engine);
app.set('animate', Animate('push'));
app.set('vuex', store);
app.use(router.routes());
export default app.listen();