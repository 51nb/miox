import Router from 'miox-router';
import DocPage from '../webviews/doc/index.vue';
import HomePage from '../webviews/home/index.vue';
import store from '../webstore/index';
import TestPage from './test.vue';
const route = new Router();
export default route;

route.patch('/', async ctx => await ctx.render(HomePage));

route.patch('/test/:id?', async ctx => {
    await ctx.render(TestPage, {
        id: ctx.params.id
    });
})

route.patch('/:key/:hash(\[0-9a-zA-Z]+)?', async (ctx, next) => {
    const hash = ctx.params.hash;
    const key = ctx.params.key;
    if (['doc', 'api'].indexOf(key) === -1) return await next();
    await store.dispatch('DETAIL', ctx.mock({ hash, key }));
    await ctx.render(DocPage, { which: key });
});