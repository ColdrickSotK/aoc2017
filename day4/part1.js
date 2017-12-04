const fs = require('fs');

function isValid(phrase) {
  let words = phrase.trim().split(' ');
  var seen = [];
  var result = true;
  words.forEach(word => {
    if (seen.indexOf(word) != -1) {
      result = false;
      return;
    }
    words.forEach(other => {
      if (word === other) {
        return;
      }
      let sortedWord = word.split('').sort().join('');
      let sortedOther = other.split('').sort().join('');
      if (sortedWord === sortedOther) {
        result = false;
      }
    });
    seen.push(word);
  });
  return result;
}

function validateFile(path) {
  let passphrases = fs.readFileSync(path, 'utf-8').trim().split('\n');
  var valid = 0;
  passphrases.forEach(phrase => {
    if (isValid(phrase)) {
      valid += 1;
    }
  });
  return [valid === passphrases.length, valid];
}


exports.isValid = isValid;
exports.validateFile = validateFile;
