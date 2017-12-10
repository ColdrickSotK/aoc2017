const fs = require('fs');
const hash = require('./hash');

fs.readFile('data/lengths', 'utf-8', (err, data) => {
  console.log(hash.knot(data.trim()));
})
