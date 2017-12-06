const assert = require('assert');
const maze = require('../maze.js');

describe('Maze', function() {
  describe('#getStepCount()', function() {
    it('should return 5 for the test input', function() {
      assert.equal(5, maze.getStepCount('test/data/maze'));
    });
    it('should return 10 for the test input with the part 2 rule', function() {
      assert.equal(10, maze.getStepCount('test/data/maze', 2));
    });
  });
});
