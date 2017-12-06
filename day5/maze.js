const fs = require('fs');

function getStepCount(path, rule=1) {
  let instructions = fs.readFileSync(path, 'utf-8')
    .trim()
    .split('\n')
    .map(x => +x);
  let next = 0;
  let steps = 0;
  while (next < instructions.length) {
    steps += 1;
    current = next;
    next += instructions[next];
    if (rule === 1) {
      instructions[current] += 1;
    } else {
      if (instructions[current] < 3) {
        instructions[current] += 1;
      } else {
        instructions[current] -= 1;
      }
    }
  }
  return steps;
}


exports.getStepCount = getStepCount;
