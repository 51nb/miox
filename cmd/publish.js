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
    return new Promise(resolve => publishSingle(packages, resolve));
}

function publishSingle(packages, callback) {
    if (packages[0]) {
      compile('npm publish', packages[0]).then(() => {
        packages.splice(0, 1);
        publishSingle(packages, callback);
      })
    } else {
      callback();
    }
}