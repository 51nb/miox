import 'es6-promise/auto';
import Session from 'miox/lib/session';
import Request from 'miox/miox_modules/request';
import { sessionIndexName } from 'miox/lib/util';

class App {
   constructor(url) {
      this.req = new Request(url);
   }
}

describe('miox session test:', () => {

    beforeAll(() => {
        const session = global.sessionStorage;
        let i = session.length;
        while (i--) {
            const key = session.key(i);
            global.sessionStorage.removeItem(key);
        }
    }, 1000);

    afterAll(() => {
        const session = global.sessionStorage;
        let i = session.length;
        while (i--) {
            const key = session.key(i);
            global.sessionStorage.removeItem(key);
        }
    }, 1000);

    it('util.sessionIndexName', () => {
        expect(sessionIndexName(3)).toEqual(`@MIOX:HISTORY:INDEX:3`);
    });

    it('session.set', () => {
        const app = new App('/');
        const s = new Session(app);
        s.setSession(1, '/a/b/c', 'a=1');
        const value = global.sessionStorage.getItem(sessionIndexName(1));
        const result = JSON.stringify({ pathname: '/a/b/c', search: 'a=1' })
        expect(value).toEqual(result);
    });

    it('session.del', () => {
        const app = new App('/');
        const s = new Session(app);
        s.delSession(1);
        const value = global.sessionStorage.getItem(sessionIndexName(1));
        expect(value).toBe(null);
        expect(s.get(1)).toEqual(undefined)
    });

    it('session.move', () => {
        const app = new App('/');
        const s = new Session(app);
        s.setSession(1, '/a/', 'a=1');
        s.setSession(2, '/b', 'b=2');
        s.setSession(3, '/c', 'c=3');
        s.setSession(4, '/d', 'd=4');
        s.moveSession(3);
        const value = global.sessionStorage.getItem('@MIOX:HISTORY:CURRENT');
        expect(value).toEqual('3');
    });

    it('session.init', () => {
        const app = new App('/');
        const s = new Session(app);
        expect(Object.keys(s.variables).length).toEqual(4);
        expect(s.current).toEqual(3);
    });

    it('session.find', () => {
        const app = new App('/');
        const s = new Session(app);
        const a = s.findSession('/b', 'b=2');
        const b = s.findSession('/c', 'c=8');
        expect(a).toEqual(2);
        expect(b).toEqual(undefined);
    });

    it('session.autoRemove', () => {
        const app = new App('/');
        const s = new Session(app);
        s.autoRemove(1);
        expect(!!s.get(2)).toEqual(false);
        expect(!!s.get(3)).toEqual(false);
        expect(!!s.get(4)).toEqual(false);
    });

});