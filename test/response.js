import Response from 'miox/miox_modules/response';
import Engine from 'miox-vue2x';
import Dic from 'miox/miox_modules/dictionary';
import A from './A.vue';

class CONTEXT extends Dic {
    constructor() {
        super();
        this.env = 'web';
        this.element = document.body;
    }
}

describe('Miox module [response] test', () => {

    it('render', cb => {
        const app = new CONTEXT();
        const engine = new Engine(app);
        const res = new Response();

        res.render(engine, A, { a: 1, b: 2}).then(() => {
            const view = app.get('active-webview');
            expect(view.basic).toBe(A);
            expect(view.mark).toEqual('/');
            const web = view.basic.dic.get(view.mark);
            setTimeout(() => {
                console.log('in')
                expect(web.$el.innerHTML).toBe('<div class="A">A1:2</div>');
                cb();
            }, 1000);
        }).catch(e => fail(e));
    }, 5000);

});