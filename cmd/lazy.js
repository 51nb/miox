const path = require('path');
const { compile } = require('../config/util');
const argv = process.argv;
const msg = argv[2];

(async () => {
  await compile(
    `npm run version && npm run noistanbul && npm run build && npm run hasistanbul && npm run git "${msg}"`, 
    path.resolve(__dirname, '..')
  );
  process.exit(0);
})();