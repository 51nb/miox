const path = require('path');
const fs = require('fs');
const globalPackage = require('../package.json');
const { modules } = require('../config/util');
const widgets = resolvePackageDir(Object.keys(modules));

writeVersion(widgets);

function resolvePackageDir(packages) {
    return packages.map(pkg => path.resolve(__dirname, '..', 'src', pkg));
}

function writeVersion(packages) {
    packages.forEach(pkg => {
        const pkgFile = path.resolve(pkg, 'package.json');
        const pkgData = require(pkgFile);
        const _version = pkgData.version;
        pkgData.version = globalPackage.version;
        fs.writeFileSync(pkgFile, JSON.stringify(pkgData, null, 2), 'utf8');
        console.log(`[${_version} -> ${globalPackage.version}]`, pkgFile);
    });
    console.log('');
    process.exit(0);
}