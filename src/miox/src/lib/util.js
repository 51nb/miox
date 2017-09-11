/**
 * Created by evio on 2017/8/29.
 */
export const sessionCurrentName = `@MIOX:HISTORY:CURRENT`;
export const sessionIndexRegExp = /^\@MIOX\:HISTORY\:INDEX\:/;
export const sessionCurrentRegExp = /^\@MIOX\:HISTORY\:CURRENT/;

export function sessionIndexName(index) {
    return `@MIOX:HISTORY:INDEX:${index}`;
}

export function sortURI(obj) {
    const result = [];
    for (const i in obj) result.push(`${i}=${obj[i]}`);
    return result.sort().join('&');
}

export function getLocalURI(locate, popState) {
    if (popState) {
        return locate.pathname + locate.search + locate.hash;
    }

    const hash = locate.hash ? locate.hash.replace(/^\#/, '') : '/';
    const search = locate.search ? locate.search.replace(/^\?/, '') : '';
    const hasQuery = hash.indexOf('?') > -1;

    if (hasQuery && search) {
        return `${hash}&${search}`;
    }

    if (!hasQuery && search) {
        return `${hash}?${search}`;
    }

    return hash;
}

export function extend(source, target) {
    for (const i in target) {
        if (source[i] !== undefined) {
            target[i] = source[i];
        }
    }

    for (const j in source) {
        if (target[j] === undefined) {
            target[j] = source[j];
        }
    }

    return target;
}

export function replaceHash(path) {
    const i = global.location.href.indexOf('#');
    global.location.replace(
        global.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
    )
}