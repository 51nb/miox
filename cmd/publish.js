const path = require('path');
const { modules, compile } = require('../config/util');
const widgets = resolvePackageDir(Object.keys(modules));
const time = 3000;

publishPackages(widgets).then(() => {
    console.log('All packages published!\n\n');
    process.exit(0);
});


function resolvePackageDir(packages) {
    return packages.map(pkg => path.resolve(__dirname, '..', 'src', pkg));
}

function publishPackages(packages) {
    const length = packages.length;
    let i = 0;
    return new Promise(resolve => publishSingle(packages, i, length, resolve));
}

function publishSingle(packages, i, total, callback) {
    if (packages[0]) {
      console.log('\n------------------------');
      console.log('@', packages[0]);
      compile('npm publish', packages[0]).then(() => {
        packages.splice(0, 1);
        i++;
        console.log('!', percent(total, i) + '%');
        setTimeout(() => publishSingle(packages, i, total, callback), time);
      }).catch(e => {
        console.log(e);
        process.exit(1);
      });
    } else {
      callback();
    }
}

function percent(total, i) {
  return ((i / total) * 100).toFixed(2);
}