import Dic from 'miox/miox_modules/dictionary';

describe('Miox module [dictionary] test', () => {

    it('set method', () => {
        const dic = new Dic();
        dic.set('a', 1);
        expect(dic.a).toEqual(1);
        expect(dic.variables.a).toEqual(1);
        expect(dic.maps.indexOf('a')).toBeGreaterThan(-1);
    });

    it('get method', () => {
        const dic = new Dic();
        dic.set('a', 1);
        expect(dic.get('a')).toEqual(1);
    });

    it('del method', () => {
        const dic = new Dic();
        dic.set('a', 1);
        expect(dic.a===undefined).toEqual(false);
        dic.del('a');
        expect(dic.a).toBe(undefined);
        expect(dic.variables.a).toBe(undefined);
        expect(dic.maps.indexOf('a')).toEqual(-1);
    });

    it('event test', () => {
        const dic = new Dic();
        dic.on('a', (a, b = 0) => {
            expect(a - b).toBe(1);
        });
        dic.set('a', 1);
        dic.set('a', 2);
    })
});