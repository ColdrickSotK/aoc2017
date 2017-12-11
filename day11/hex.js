function getCoord(path) {
  let moves = path.trim().split(',');
  var coord = [0, 0];
  moves.forEach(move => {
    switch (move) {
      case 'n':
        coord[1]++;
        break;
      case 'ne':
        coord[0]++;
        coord[1]++;
        break;
      case 'se':
        coord[0]++;
        break;
      case 's':
        coord[1]--;
        break;
      case 'sw':
        coord[0]--;
        coord[1]--;
        break;
      case 'nw':
        coord[0]--;
        break;
      default:
        break;
    }
  });

  return coord;
}

function straightDistance(start, goal) {
  return Math.sqrt(Math.pow(start[0] - goal[0], 2) +
                   Math.pow(start[1] - goal[1], 2));
}

function getClosest(open, fScore) {
  var lowest = 9999999999;
  var result;
  open.forEach(node => {
    if (fScore[node] < lowest) {
      lowest = fScore[node];
      result = node;
    }
  });
  return result;
}

function reconstruct(parents, current) {
  let path = [current];
  while (Object.keys(parents).indexOf(current) != -1) {
    current = parents[current];
    path.push(current);
  }
  return path;
}

function aStar(start, goal) {
  var closed = [];
  var open = [start.join(',')];
  var parents = {};
  var gScore = {};
  gScore[start.join(',')] = 0;
  var fScore = {};
  fScore[start.join(',')] = straightDistance(start, goal);

  while (open.length > 0) {
    let current = getClosest(open, fScore).split(',').map(x => +x);
    if (current[0] === goal[0] && current[1] === goal[1]) {
      return reconstruct(parents, current.join(','));
    }
    open.splice(open.indexOf(current.join(',')), 1);
    closed.push(current.join(','));

    let adjacents = [
      [current[0], current[1] + 1],
      [current[0] + 1, current[1] + 1],
      [current[0] + 1, current[1]],
      [current[0], current[1] - 1],
      [current[0] - 1, current[1] - 1],
      [current[0] - 1, current[1]]
    ];
    adjacents.forEach(adjacent => {
      adjacent = adjacent.join(',')
      if (closed.indexOf(adjacent) > -1) {
        return;
      }

      if (open.indexOf(adjacent) === -1) {
        open.push(adjacent);
      }

      let localGScore = gScore[current.join(',')] + 1;
      let existingScore = gScore[adjacent] || 999999;
      if (localGScore >= existingScore) {
        return;
      }

      parents[adjacent] = current.join(',');
      gScore[adjacent] = localGScore;
      let coord = adjacent.split(',').map(x => +x);
      let remaining = straightDistance(coord, goal) + Math.max(Math.abs(coord[0]), Math.abs(coord[1]));
      fScore[adjacent] = gScore[adjacent] + remaining;
    });
  }
  return;
}



exports.getCoord = getCoord;
exports.straightDistance = straightDistance;
exports.shortestPath = aStar;
