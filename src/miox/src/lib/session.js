/**
 * Created by evio on 2017/8/29.
 */
import Dictionary from '../miox_modules/dictionary';
import {
    sessionCurrentName,
    sessionIndexName,
    sessionIndexRegExp,
    sessionCurrentRegExp
} from './util';

export default class SessionStorage extends Dictionary {
    constructor(app) {
        super();
        this.app = app;
        this.current = 0;
        this.historyListRegExp = sessionIndexRegExp;
        this.historyCurrentRegExp = sessionCurrentRegExp;
        this.init();
    }

    init() {
        const session = global.sessionStorage;
        let i = session.length;
        while (i--) {
            const key = session.key(i);
            let value;
            if (this.historyListRegExp.test(key)) {
                try{
                    value = JSON.parse(session.getItem(key));
                } catch(e) { continue; }
                this.set(key.replace(this.historyListRegExp, ''), value);
            } else if (this.historyCurrentRegExp.test(key)) {
                this.current = Number(session.getItem(key));
            }
        }
    }

    setSession(index, pathname, search) {
        const name = sessionIndexName(index);
        this.set(index, { pathname, search });
        global.sessionStorage.setItem(name, JSON.stringify({ pathname, search }));
    }

    delSession(index) {
        const name = sessionIndexName(index);
        this.del(index);
        global.sessionStorage.removeItem(name);
    }

    moveSession(index) {
        if (this.get(index)) {
            this.current = index;
            global.sessionStorage.setItem(sessionCurrentName, index);
        }
    }

    findSession(_pathname, _search) {
        const keys = Object.keys(this.variables).sort().map(v => Number(v));
        let i = keys.length;
        while (i--) {
            const key = keys[i];
            const value = this.get(key);
            if (value) {
                const { pathname, search } = value;
                if (pathname === _pathname && search === _search) {
                    return key;
                }
            }
        }
    }

    actionPush(){
        const index = global.history.length;
        this.setSession(index, this.app.req.pathname, this.app.req.sortQuery);
        this.moveSession(index);
    }

    actionReplace() {
        this.setSession(this.current, this.app.req.pathname, this.app.req.sortQuery);
    }

    autoRemove() {
        const index = global.history.length;
        this.each(key => {
            key = Number(key);
            if (key > index) {
                this.delSession(key);
            }
        });
    }
}