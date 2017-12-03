const part1 = require('./part1');

var squares = {
  '0, 0': 1
};

function firstLarger(value) {
  let square = 1;
  let result = 0;
  do {
    result = getValue(square);
    square += 1;
  } while (result <= value);

  return result;
}

function getValue(square) {
  let [x, y] = part1.getCoordinate(square, false);
  const adjacents = [
    `${x - 1}, ${y - 1}`,
    `${x}, ${y - 1}`,
    `${x + 1}, ${y - 1}`,

    `${x - 1}, ${y}`,
    `${x + 1}, ${y}`,

    `${x - 1}, ${y + 1}`,
    `${x}, ${y + 1}`,
    `${x + 1}, ${y + 1}`,
  ];

  const coordinate = `${x}, ${y}`;
  let total = 0
  if (!(coordinate in squares)) {
    adjacents.forEach(adjacent => {
      if (adjacent in squares) {
        total += squares[adjacent];
      }
    });
    squares[coordinate] = total;
  }
  return squares[coordinate];
}


exports.firstLarger = firstLarger;
