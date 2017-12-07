const assert = require('assert');
const tower = require('../tower');

describe('Tower', function() {
  describe('#getTower()', function() {
    it('should return the correct tree with the test input', function() {
      const expected = {
        weight: 41,
        children: [
          'ugml', 'padx', 'fwft'
        ]
      };
      const actual = tower.getTower('test/data/tower').tknk;

      assert.equal(expected.weight, actual.weight);
      assert.equal(expected.children.length, actual.children.length);
    });
  });

  describe('#getRoot()', function() {
    it('should return tknk with the test input', function() {
      const tree = tower.getTower('test/data/tower');
      assert.equal('tknk', tower.getRoot(tree));
    });
  });

  describe('#getTotalWeight()', function() {
    const tests = [
      {key: 'ugml', weight: 251},
      {key: 'gyxo', weight: 61},
      {key: 'tknk', weight: 778}
    ]
    tests.forEach(function(test) {
      it(`should return ${test.weight} for key ${test.key}`, function() {
        const tree = tower.getTower('test/data/tower');
        assert.equal(test.weight, tower.getTotalWeight(test.key, tree));
      });
    });
  });

  describe('#getUnbalancedKeyWeight()', function() {
    it('should return ugml and 60 with the test input', function() {
      const tree = tower.getTower('test/data/tower');
      const [key, weight] = tower.getUnbalancedKeyWeight('tknk', tree);
      assert.equal('ugml', key);
      assert.equal(60, weight);
    });
  });
});
