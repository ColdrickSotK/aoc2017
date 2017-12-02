const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('data/test-2')
});

var checksum = 0;
rl.on('line', line => {
  var numbers = line.trim().split('\t');
  for (var i = 0; i < numbers.length; i++) {
    var value = +numbers[i]
    for (var j = 0; j < numbers.length; j++) {
      if (i === j) {
        continue;
      }
      var other = +numbers[j];
      if (other % value === 0) {
        checksum += other / value;
      }
    }
  }
});

rl.on('close', () => {
  console.log(checksum);
});
