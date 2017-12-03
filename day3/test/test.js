const assert = require('assert');
const part1 = require('../part1');
const part2 = require('../part2');

describe('Part1', function() {
  describe('#getNearestSquare()', function() {
    const tests = [
      {input: 12, expected: 5},
      {input: 9, expected: 3},
      {input: 1, expected: 1}
    ];
    tests.forEach(function(test) {
      it(`should return ${test.expected} when the value is ${test.input}`, function() {
        assert.equal(test.expected, part1.getNearestSquare(test.input));
      });
    });
  });

  describe('#getCoordinate()', function() {
    const absoluteTests = [
      {input: 1, expected: [0, 0]},
      {input: 9, expected: [1, 1]},
      {input: 12, expected: [2, 1]},
      {input: 13, expected: [2, 2]},
      {input: 14, expected: [1, 2]}
    ];
    absoluteTests.forEach(function(test) {
      it(`should return ${test.expected} when the value is ${test.input}`, function() {
        const actual = part1.getCoordinate(test.input);
        assert.equal(test.expected[0], actual[0]);
        assert.equal(test.expected[1], actual[1]);
      });
    });

    const tests = [
      {input: 5, expected: [-1, 1]}
    ]
    tests.forEach(function(test) {
      it(`should return ${test.expected} when the value is ${test.input}`, function() {
        const actual = part1.getCoordinate(test.input, false);
        assert.equal(test.expected[0], actual[0]);
        assert.equal(test.expected[1], actual[1]);
      });
    });
  });

  describe('#calculatePathLength()', function() {
    const tests = [
      {input: 1, expected: 0},
      {input: 12, expected: 3},
      {input: 23, expected: 2},
      {input: 12, expected: 3},
      {input: 1024, expected: 31}
    ]
    tests.forEach(function(test) {
      it(`should return ${test.expected} when the value is ${test.input}`, function() {
        assert.equal(test.expected, part1.calculatePathLength(test.input));
      });
    });
  });
});

describe('Part2', function() {
  describe('#firstLarger()', function() {
    const tests = [
      {value: 5, expected: 10},
      {value: 6, expected: 10},
      {value: 800, expected: 806}
    ];
    tests.forEach(function(test) {
      it(`should return ${test.expected} for ${test.value}`, function() {
        assert.equal(test.expected, part2.firstLarger(test.value));
      });
    });
  });
});
