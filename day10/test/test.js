const assert = require('assert');
const hash = require('../hash');

describe('Hash', function() {
  describe('#knot()', function() {
    const tests = [
      {input: '', hash: 'a2582a3a0e66e6e86e3812dcb672a272'},
      {input: 'AoC 2017', hash: '33efeb34ea91902bb2f59c9920caa6cd'},
      {input: '1,2,3', hash: '3efbe78a8d82f29979031a4aa0b16a9d'},
      {input: '1,2,4', hash: '63960835bcdc130f0b66d7ff4f6a5a8e'}
    ];
    tests.forEach(test => {
      it(`should return ${test.hash} with ${test.input}`, function() {
        assert.equal(test.hash, hash.knot(test.input));
      });
    });
  });
});
