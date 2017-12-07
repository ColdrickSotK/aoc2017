const fs = require('fs');

function getTower(path) {
  let lines = fs.readFileSync(path, 'utf-8').trim().split('\n');
  var tree = {};

  lines.forEach(line => {
    let [metadata, children] = line.split(' -> ');
    if (!!children) {
      children = children.split(', ');
    } else {
      children = [];
    }
    let [name, weight] = metadata.split(' ');
    weight = +weight.replace(/[()]/g, '');
    tree[name] = {
      'weight': weight,
      'children': children
    };
  });
  return tree;
}

function getRoot(tower) {
  let keys = Object.keys(tower);
  var children = [];

  keys.forEach(key => {
    if (tower[key].children.length > 0) {
      children = children.concat(tower[key].children);
    }
  });
  let result = keys.filter(key => children.indexOf(key) === -1);
  return result[0];
}

function getTotalWeight(key, tower) {
  let result = tower[key].weight;
  tower[key].children.forEach(child => {
    result += getTotalWeight(child, tower);
  });
  return result;
}

function getUnbalancedKeyWeight(key, tower, target=-1) {
  let childWeights = [];
  for (let i = 0; i < tower[key].children.length; i++) {
    let child = tower[key].children[i];
    childWeights.push(getTotalWeight(child, tower));
  }

  var balanced = true;
  var counts = {};
  var bad;
  childWeights.forEach(weight => {
    let count = childWeights.filter(x => x == weight).length;
    if (childWeights.length > 1 && count == 1) {
      bad = childWeights.indexOf(weight);
      balanced = false;
    } else {
      good = weight;
    }
  });

  if (balanced && target > -1) {
    let diff = target - getTotalWeight(key, tower);
    return [key, tower[key].weight + diff];
  } else if (balanced) {
    return [key, 0];
  } else {
    unbalancedChild = tower[key].children[bad];
    return getUnbalancedKeyWeight(unbalancedChild, tower, good);
  }
}


exports.getTower = getTower;
exports.getRoot = getRoot;
exports.getTotalWeight = getTotalWeight;
exports.getUnbalancedKeyWeight = getUnbalancedKeyWeight;
