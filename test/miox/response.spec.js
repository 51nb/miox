import Response from 'miox/miox_modules/response';

describe('Miox module [response] test:', () => {

    it('res.init.1', () => {
        const res = new Response({
          a: 1,
          b: 2,
          c() {
            return 3;
          }
        });
        expect(res.a).toEqual(1);
        expect(res.b).toEqual(2);
        expect(res.c()).toEqual(3);
    });
});