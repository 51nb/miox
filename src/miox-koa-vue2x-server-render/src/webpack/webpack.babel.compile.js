/**
 * Created by evio on 2017/5/11.
 */
import path from 'path';

export default function WebpackBabelCompileSourceModuleCompile(cwd, includes) {
    const node_modules = path.resolve(cwd, 'node_modules');
    const source_position = [];

    if (!Array.isArray(includes)) {
        includes = [includes];
    }
    let i = includes.length;
    while (i--) {
        let exc = includes[i];
        if (typeof exc === 'string') {
            exc = new RegExp(exc);
        }
        source_position.push(exc);
    }

    return pather => {
        const position = path.relative(node_modules, pather);
        let i = source_position.length;

        while (i--) {
            if (source_position[i].test(position)) {
                return true;
            }
        }

        return false;
    }
}