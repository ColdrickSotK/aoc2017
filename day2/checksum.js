const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('data/input')
});

var checksum = 0;
rl.on('line', line => {
  var numbers = line.trim().split('\t');
  var max = min = +numbers[0];
  for (var i = 0; i < numbers.length; i++) {
    var value = +numbers[i]
    if (value > max) {
      max = value;
    }
    if (value < min) {
      min = value;
    }
  }
  checksum += max - min;
});

rl.on('close', () => {
  console.log(checksum);
});
