const assert = require('assert');
const stream = require('../stream');

describe('Stream', function() {
  describe('#scoreStream()', function() {
    const tests = [
      {input: '{}', score: 1, garbage: 0},
      {input: '{{{}}}', score: 6, garbage: 0},
      {input: '{{},{}}', score: 5, garbage: 0},
      {input: '{{{},{},{{}}}}', score: 16, garbage: 0},
      {input: '{<{},{},{{}}>}', score: 1, garbage: 10},
      {input: '{<a>,<a>,<a>,<a>}', score: 1, garbage: 4},
      {input: '{{<!!>},{<!!>},{<!!>},{<!!>}}', score: 9, garbage: 0},
      {input: '{{<a!>},{<a!>},{<a!>},{<ab>}}', score: 3, garbage: 17}
    ];
    tests.forEach(function(test) {
      it(`should score ${test.score} with an input of ${test.input}`, function() {
        let [score, garbage] = stream.scoreStream(test.input);
        assert.equal(test.score, score);
        assert.equal(test.garbage, garbage);
      })
    });
  })
});
