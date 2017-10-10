import 'es6-promise/auto';
import Request from 'miox/miox_modules/request';

describe('Miox module [request] test:', () => {

    it('req.init.1', () => {
        const req = new Request();
        expect(req.pathname).toEqual('/');
        expect(req.search).toEqual('');
        expect(Object.keys(req.query).length).toBe(0);
        expect(req.mark).toEqual('/');
        expect(req.sortQuery).toEqual('');
    });

    it('req.init.2', () => {
        const req = new Request('/a/b/c?a=1&c=3&b=2#abc');
        expect(req.pathname).toEqual('/a/b/c');
        expect(req.search).toEqual('?a=1&c=3&b=2');
        expect(req.hash).toEqual('#abc');
        expect(Object.keys(req.query).length).toBe(3);
        expect(req.mark).toEqual('/a/b/c:a=1&b=2&c=3');
        expect(req.sortQuery).toEqual('a=1&b=2&c=3');
    });

    it('req.init.3', () => {
        const req = new Request({
          a: 1,
          b: 2,
          c() {
            return 3;
          }
        });
        expect(req.a).toEqual(1);
        expect(req.b).toEqual(2);
        expect(req.c()).toEqual(3);
    });
});