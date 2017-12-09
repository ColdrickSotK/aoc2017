function scoreStream(stream) {
  let total = 0;
  let score = 0;
  let garbageCount = 0;
  let garbage = false;
  let cancel = false;
  for (var i = 0; i < stream.length; i++) {
    if (!cancel) {
      switch (stream[i]) {
        case '{':
          if (!garbage) {
            score++;
          } else {
            garbageCount++;
          }
          break;
        case '}':
          if (!garbage) {
            total += score;
            score--;
          } else {
            garbageCount++;
          }
          break;
        case '<':
          if (!garbage) {
            garbage = true;
          } else {
            garbageCount++;
          }
          break;
        case '>':
          garbage = false;
          break;
        case '!':
          cancel = true;
          break;
        default:
          if (garbage) {
            garbageCount++;
          }
          break;
      }
    } else {
      cancel = false;
    }
  }
  return [total, garbageCount];
}


exports.scoreStream = scoreStream;
