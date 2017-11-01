import 'es6-promise/auto';
import Miox from 'miox';
import Animate from 'miox-animation';
import Engine from 'miox-vue2x';

describe('miox core options test:', () => {

    it('options.session=true + animate', () => {
        const app = new Miox({ session: true });
        app.install(Engine);
        app.install(Animate('slide'));
        app.listen();
        expect(!!app.history.useSessionStorage).toBe(true);
    });

    it('options.session=false + animate', () => {
        const app = new Miox({ session: false });
        app.install(Engine);
        app.install(Animate('slide'));
        app.listen();
        expect(!!app.history.useSessionStorage).toBe(false);
    });

    it('options.session=true', () => {
        const app = new Miox({ session: true });
        app.install(Engine);
        app.listen();
        expect(!!app.history.useSessionStorage).toBe(false);
    });

    it('options.session=false', () => {
        const app = new Miox({ session: false });
        app.install(Engine);
        app.listen();
        expect(!!app.history.useSessionStorage).toBe(false);
    });

    it('options.popState=true', () => {
        const app = new Miox({ popState: true });
        app.install(Engine);
        app.listen();
        expect(!!app.history.popState).toBe(true);
    });

    it('options.popState=false', () => {
        const app = new Miox({ popState: false });
        app.install(Engine);
        app.listen();
        expect(!!app.history.popState).toBe(false);
    });

    it('options.popState=false + env=client', () => {
        const app = new Miox({ popState: false });
        app.env = 'client';
        app.install(Engine);
        app.listen();
        expect(!!app.history.popState).toBe(true);
    });
});
