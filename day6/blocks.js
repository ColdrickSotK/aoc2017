const fs = require('fs');

function rebalance(path) {
  let banks = fs.readFileSync(path, 'utf-8').trim().split('\t').map(a => +a);
  let idx = banks.indexOf(banks.reduce((a, b) => Math.max(a, b)));
  let seen = []
  let cycles = 0;

  do {
    cycles += 1;
    seen.push(banks.join(''));
    let blocks = banks[idx];
    banks[idx] = 0;
    let next = (idx + 1) % banks.length;
    while (blocks > 0) {
      banks[next] += 1;
      blocks -= 1;
      next = (next + 1) % banks.length;
    }
    idx = banks.indexOf(banks.reduce((a, b) => Math.max(a, b)));
  } while (seen.indexOf(banks.join('')) === -1);

  return [cycles, cycles - seen.indexOf(banks.join(''))];
}


exports.rebalance = rebalance;
