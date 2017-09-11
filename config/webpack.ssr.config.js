const path = require('path');
const { resolve } = require('./util');

module.exports = {
    "cwd": path.resolve(__dirname, '..'),
    "app": resolve('client', 'index.js'),
    "build": resolve('build'),
    "cache": true,
    "prefix": '/static',
    "hot": true,
    "whitelist": [
        /client/i,
        /miox\-/i,
        /test/
    ],
    "port": 3001,
    "ip": "0.0.0.0"
};