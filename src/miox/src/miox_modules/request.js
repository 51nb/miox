/**
 * Created by evio on 2017/8/29.
 */
import Url from 'url';
import { sortURI } from '../lib/util';

export default class Request {
    constructor(options = '/') {
        if (typeof options === 'string') {
            this.options = Url.parse(options, true);
        } else {
            this.options = options;
        }

        this.__defineMixinRequest__();
    }

    __defineMixinRequest__() {
        for (const req in this.options) {
            // todo ，这个是什么逻辑分支
            if (typeof this.options[req] === 'function') {
                this[req] = this.options[req].bind(this.options);
            } else {
                this[req] = this.options[req];
            }
        }

        const sortSearch = sortURI(this.query || {});
        this.sortQuery = sortSearch;
        // mark.....  a specail summary or feature
        this.mark = this.pathname + (sortSearch ? `:${sortSearch}` : '');
    }
}
