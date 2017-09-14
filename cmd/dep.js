const { modules } = require('../config/util');
const MyPkg = require('../package.json');
const path = require('path');
const fs = require('fs');
const mds = Object.keys(modules);
const widgets = resolvePackageDir(mds);
const dep = {}, devDep = {}, diff = [], maps = {};

for (let j = 0 ; j < widgets.length; j++) {
    collect(widgets[j]);
}

if (diff.length) {
    let i = diff.length;
    console.log('package version is not matched.');
    while (i--) {
        const name = diff[i];
        console.log(`[${name}]`, maps[name]);
    }
}

MyPkg.dependencies = dep;
MyPkg.devDependencies = Object.assign(MyPkg.devDependencies, devDep);

const text = JSON.stringify(MyPkg, null, 2);
fs.writeFileSync(path.resolve(__dirname, '..', 'package.json'), JSON.stringify(MyPkg, null, 2), 'utf8');
console.log(text);
console.log();
console.log(':', 'Write dependencies success!');
console.log();

function resolvePackageDir(packages) {
    return packages.map(pkg => path.resolve(__dirname, '..', 'src', pkg, 'package.json'));
}

function collect(pkg) {
    const PKG = require(pkg);
    const dependencies = PKG.dependencies || {};
    const devDependencies = PKG.devDependencies || {};

    insert(dependencies, dep, pkg);
    insert(devDependencies, devDep, pkg);
}

function insert(dep, which, pkg) {
    for (const i in dep) {
        if (!which[i]) {
            if (mds.indexOf(i) > -1) continue;
            which[i] = dep[i];
            if (!maps[i]) maps[i] = [];
            if (maps[i].indexOf(pkg) === -1) maps[i].push(pkg);
        } else {
            if (which[i] != dep[i]) {
                diff.push(i);
            }
        }
    }
}