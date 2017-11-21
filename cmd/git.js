// git add . && git commit -am \"Auto update\" && git push
const path = require('path');
const { compile } = require('../config/util');
const argv = process.argv;
const msg = argv[2];

(async () => {
  await compile(`git add . && git commit -am "${msg}" && git push`, path.resolve(__dirname, '..'));
  process.exit(0);
})();