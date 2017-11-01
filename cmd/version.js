const path = require('path');
const fs = require('fs');
const globalPackage = require('../package.json');
const {
  modules
} = require('../config/util');
const widgets = resolvePackageDir(Object.keys(modules));

writeVersion(widgets);
process.exit(0);

function resolvePackageDir(packages) {
  return packages.map(pkg => path.resolve(__dirname, '..', 'src', pkg));
}

function writeVersion(packages) {
  const packs = packages.map(p => p.split('/').slice(-1)[0]);
  packages.forEach(pkg => {
    const pkgFile = path.resolve(pkg, 'package.json');
    const pkgData = require(pkgFile);
    const _version = pkgData.version;
    pkgData.version = globalPackage.version;  
    console.log(`- ${pkgData.name}@v${_version} -> v${globalPackage.version}`);
    if (pkgData.dependencies) {
      for (const i in pkgData.dependencies) {
        if (packs.indexOf(i) > -1) {
          const oldVersion = pkgData.dependencies[i].replace(/^\^/, '');
          pkgData.dependencies[i] = '^' + globalPackage.version;
          console.log(`  - ${i}@v${oldVersion} -> v${globalPackage.version}`);
        }
      }
    }
    fs.writeFileSync(pkgFile, JSON.stringify(pkgData, null, 2), 'utf8');
  });
  console.log('');
}