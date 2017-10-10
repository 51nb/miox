import Dic from 'miox/miox_modules/dictionary';

describe('Miox module [dictionary] test:', () => {

    it('dic.set', () => {
        const dic = new Dic();
        dic.set('a', 1);
        dic.set();
        expect(dic.variables.a).toEqual(1);
        expect(dic.maps.indexOf('a')).toBeGreaterThan(-1);
    });

    it('dic.get', () => {
        const dic = new Dic();
        dic.set('a', 1);
        expect(dic.get('a')).toEqual(1);
    });

    it('dic.del', () => {
        const dic = new Dic();
        dic.set('a', 1);
        expect(dic.a===undefined).toEqual(false);
        dic.del('a');
        expect(dic.a).toBe(undefined);
        expect(dic.variables.a).toBe(undefined);
        expect(dic.maps.indexOf('a')).toEqual(-1);
        expect(dic.get('a')).toBe(undefined);
    });

    it('dic.event', () => {
        const dic = new Dic();
        dic.on('a', (a, b = 0) => {
            expect(a - b).toBe(1);
        });
        dic.set('a', 1);
        dic.set('a', 2);
    });

    it('dic.exists', () => {
        const dic = new Dic();
        dic.set('a', 1);
        const a = dic.exists('a');
        expect(a).toEqual(true);
    });

    it('dic.filter', () => {
        const dic = new Dic();
        dic.set('a', 1);
        dic.set('a1', 2);
        dic.set('a2', 3);
        dic.set('b', 4);
        dic.set('b1', 5);
        dic.set('b2', 6);
        const result = dic.filter((key, value) => {
            return key[0] === 'b' && value > 5;
        });
        const a = Object.keys(result);
        expect(a.length).toEqual(1);
        expect(a[0]).toEqual('b2');
        expect(result[a[0]]).toEqual(6);
    });
});