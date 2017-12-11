const fs = require('fs');
const hex = require('./hex');

fs.readFile('data/path', 'utf-8', (err, data) => {
  const start = hex.getCoord(data);
  const path = hex.shortestPath(start, [0, 0]);
  console.log('Part 1:', path.length - 1);

  let longest = path.length - 1;
  const steps = data.trim().split(',');
  for (var i = 0; i < steps.length; i++) {
    console.log('step', i, 'of', steps.length);
    let partial = steps.slice(0, i).join(',');
    let partialStart = hex.getCoord(partial);
    let partialPath = hex.shortestPath(partialStart, [0, 0]);
    longest = Math.max(partialPath.length - 1, longest);
  }
  console.log('Part 2:', longest);
});
