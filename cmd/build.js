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
        console.log('');
    }

    process.exit(0);
})();