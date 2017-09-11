'use strict';

/**
 * Created by evio on 2017/5/12.
 */
try {
    var vueVersion = require('vue').version;
} catch (e) {
    throw new Error('\n\nVue required:\n\n' + '> npm install --save vue\n\n');
}

var packageName = require('../package.json').name;
var packageVersion = require('../package.json').version;

var vue_versions = vueVersion.split('.');
var package_versions = packageVersion.split('.');

if (!(vue_versions[0] == package_versions[0] && vue_versions[1] == package_versions[1])) {
    throw new Error('\n\nVue packages version mismatch:\n\n' + '- vue@' + vueVersion + '\n' + '- ' + packageName + '@' + packageVersion + '\n\n' + 'This may cause things to work incorrectly. Make sure to use the same version for both.\n' + 'Or you allow large version and middle version!\n');
}