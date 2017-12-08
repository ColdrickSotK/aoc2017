const assert = require('assert');
const instruct = require('../instruct');

describe('Instruct', function() {
  describe('#parseInstruction()', function() {
    it('should correctly parse "b inc 5 if a > 1"', function() {
      const result = instruct.parseInstruction('b inc 5 if a > 1');
      assert.equal('b', result.target);
      assert.equal(5, result.change);
      assert.equal('a > 1', result.condition);
    });

    it('should correctly parse "c dec -10 if a >= 1"', function() {
      const result = instruct.parseInstruction('c dec -10 if a >= 1');
      assert.equal('c', result.target);
      assert.equal(10, result.change);
      assert.equal('a >= 1', result.condition);
    });

    it('should correctly parse "c inc -20 if c == 10"', function() {
      const result = instruct.parseInstruction('c inc -20 if c == 10');
      assert.equal('c', result.target);
      assert.equal(-20, result.change);
      assert.equal('c == 10', result.condition);
    });
  });

  describe('#evaluateCondition()', function() {
    const registers = {
      a: 10,
      b: 5,
      c: 0
    };
    const tests = [
      {condition: 'a > 1', expected: true},
      {condition: 'a < 100', expected: true},
      {condition: 'a == 10', expected: true},
      {condition: 'c > 1', expected: false},
      {condition: 'd > 1', expected: false},
      {condition: 'b != 1', expected: true}
    ];
    tests.forEach(function(test) {
      it(`should evaluate ${test.condition} as ${test.expected}`, function() {
        const result = instruct.evaluateCondition(test.condition, registers);
        assert.equal(test.expected, result);
      });
    });
  });

  describe('#runFile()', function() {
    it('should produce the expected register state', function() {
      const result = instruct.runFile('test/data/instructions');
      assert.equal(1, result.a);
      assert.equal(0, result.b);
      assert.equal(-10, result.c);
    });
  });
});
