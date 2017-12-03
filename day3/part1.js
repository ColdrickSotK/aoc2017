function manhattan(p1, p2, q1, q2) {
  return Math.abs(q1 - p1) + Math.abs(q2 - p2);
}

function getNearestSquare(value) {
  let root = Math.ceil(Math.sqrt(value));
  if (root % 2 === 0) {
    root += 1;
  }
  return root;
}

function getCoordinate(value, absolute = true) {
  if (value === 1) {
    // 1 is in the center, so the sideLength is 0.
    // Simply return here to avoid division by 0.
    return [0, 0];
  }

  const root = getNearestSquare(value);
  const min = Math.pow(root - 2, 2) + 1;
  const sideLength = root - 1;
  const side = Math.floor((value - min) / sideLength);
  const center = side * sideLength + sideLength / 2 + min - 1;
  let dx = dy = 0;

  switch (side) {
    case 0:
      dx = Math.floor(root / 2);
      dy = value - center;
      break;
    case 1:
      dx = center - value;
      dy = Math.floor(root / 2);
      break;
    case 2:
      dx = -Math.floor(root / 2);
      dy = center - value;
      break;
    case 3:
      dx = value - center;
      dy = -Math.floor(root / 2);
      break;
  }

  if (absolute) {
    return [Math.abs(dx), Math.abs(dy)];
  } else {
    return [dx, dy];
  }
}

function calculatePathLength(value) {
  const coordinate = getCoordinate(value);
  return manhattan(0, 0, ...coordinate);
}


exports.calculatePathLength = calculatePathLength;
exports.getCoordinate = getCoordinate;
exports.getNearestSquare = getNearestSquare;
