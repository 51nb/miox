const path = require('path');
const { modules, compile } = require('../config/util');
const widgets = resolvePackageDir(Object.keys(modules));

publishPackages(widgets).then(() => {
    console.log('All packages published!');
    process.exit(0);
});


function resolvePackageDir(packages) {
    return packages.map(pkg => path.resolve(__dirname, '..', 'src', pkg));
}

function publishPackages(packages) {
    return Promise.all(packages.map(pkg => compile('npm publish', pkg)));
}