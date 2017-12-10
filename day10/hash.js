function sparseHash(input) {
  let skip = 0;
  let current = 0;
  let list = Array.from(new Array(256), (x, i) => i);
  lengths = input.trim().split('').map(x => x.charCodeAt(0));
  lengths = lengths.concat([17, 31, 73, 47, 23]);

  let counter = 0;
  while (counter < 64) {
    for (var i = 0; i < lengths.length; i++) {
      let length = lengths[i];
      if (length > 256) {
        continue;
      } else if (length === 1 || length === 0) {
        current = (current + length + skip) % list.length;
        skip++;
        continue;
      }
      let end = current + length;
      if (end < list.length) {
        let newList = list.slice(current, end);
        newList.reverse();
        if (current > 0) {
          newList = list.slice(0, current).concat(newList);
        }
        list = newList.concat(list.slice(end));
      } else {
        let back = list.slice(current);
        let front = list.slice(0, end % list.length);
        let combined = back.concat(front);
        combined.reverse()
        let newList = combined.slice(back.length);
        newList = newList.concat(list.slice(end % list.length, current));
        newList = newList.concat(combined.slice(0, back.length));
        list = newList;
      }
      current = (current + length + skip) % list.length;
      skip++;
    }
    counter++;
  }
  return list;
}

function denseHash(sparse) {
  let hash = []
  for (var i = 0; i < sparse.length; i += 16) {
    let segment = sparse.slice(i, i+16);
    hash.push(segment.reduce((result, current) => result ^ current));
  }
  return hash;
}

function knot(input) {
  let sparse = sparseHash(input);
  let dense = denseHash(sparse);
  return dense.map(x => x.toString(16).padStart(2, '0')).join('');
}


exports.knot = knot;
