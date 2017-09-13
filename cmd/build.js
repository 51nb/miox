const path = require('path');
const { modules, compile } = require('../config/util');
const widgets = [];

for (const widget in modules) {
    if (modules[widget].build) {
        widgets.push(widget);
    }
}

(async () => {
    for (let i = 0; i < widgets.length; i++) {
        const name = widgets[i];
        const dir = path.resolve(__dirname, '..', 'src', name);
        const cmd = `rm -rf build/ && babel src -d build`;
        console.log(`------------- Compile \`${name}\` -------------`);
        await compile(cmd, dir, '[#]');
        const pkg = require(path.resolve(dir, 'package.json'));
        if (pkg.copyfile) {
            let i = pkg.copyfile.length;
            while (i--) {
                const src = path.resolve(dir, 'src', pkg.copyfile[i]);
                const tar = path.resolve(dir, 'build', pkg.copyfile[i]);
                await compile(`cp ${src} ${tar}`, dir);
                console.log('[@]', `src:${pkg.copyfile[i]}`, `->`, `build:${pkg.copyfile[i]}`);
            }
        }
        console.log('');
    }

    process.exit(0);
})();