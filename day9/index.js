const stream = require('./stream');
const fs = require('fs');

fs.readFile('data/stream', 'utf-8', (err, data) => {
  let [score, garbage] = stream.scoreStream(data.trim());
  console.log('Part 1:', score);
  console.log('Part 2:', garbage);
})
