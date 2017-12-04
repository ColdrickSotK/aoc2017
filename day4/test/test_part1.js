const assert = require('assert');
const part1 = require('../part1');

describe('Part1', function() {
  describe('#isValid()', function() {
    const tests = [
      {input: 'aa bb cc dd ee', expected: true},
      {input: 'aa bb cc dd aa', expected: false},
      {input: 'aa bb cc dd aaa', expected: true}
    ];
    tests.forEach(function(test) {
      it(`should return ${test.expected} when the phrase is ${test.input}`, function() {
        assert.equal(test.expected, part1.isValid(test.input));
      });
    });
  });

  describe('#validateFile()', function() {
    it('should return false and 2 using the test input', function() {
      var [valid, number] = part1.validateFile('test/data/passphrases');
      assert.equal(false, valid);
      assert.equal(2, number);
    });
  });
});
