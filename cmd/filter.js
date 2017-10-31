const args = process.argv;
const path = require('path');
const fs = require('fs');
const babelrc = path.resolve(__dirname, '..', '.babelrc');

const options = JSON.parse(fs.readFileSync(babelrc));
const index = options.plugins.indexOf('istanbul');

if (args.indexOf('-i') > -1) {
  if (index > -1) {
    options.plugins.splice(index, 1);
  }
} else {
  if (index === -1) {
    options.plugins.push('istanbul');
  }
}

fs.writeFileSync(babelrc, JSON.stringify(options, null, 2), 'utf8');