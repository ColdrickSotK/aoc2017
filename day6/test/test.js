const assert = require('assert');
const blocks = require('../blocks');

describe('Blocks', function() {
  describe('#rebalance()', function() {
    it('should return 5, 4 when using the test input', function() {
      const result = blocks.rebalance('test/data/blocks');
      assert.equal(5, result[0]);
      assert.equal(4, result[1]);
    });
  });
});
