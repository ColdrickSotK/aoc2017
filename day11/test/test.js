const assert = require('assert');
const hex = require('../hex');

describe('Hex', function() {
  describe('#getCoordFromPath()', function() {
    const tests = [
      {path: 'ne,ne,ne', coord: [3,3]},
      {path: 'ne,ne,sw,sw', coord: [0,0]},
      {path: 'ne,ne,s,s', coord: [2,0]},
      {path: 'se,sw,se,sw,sw', coord: [-1,-3]}
    ];
    tests.forEach(function(test) {
      it(`should return ${test.coord} for ${test.path}`, function() {
        const coord = hex.getCoord(test.path);
        assert.equal(test.coord[0], coord[0]);
        assert.equal(test.coord[1], coord[1]);
      });
    });
  });

  describe('#straightDistance()', function() {
    it('should return 2 for (2, 0)', function() {
      assert.equal(2, hex.straightDistance([2, 0], [0, 0]));
    });
  });

  describe('#shortestPath()', function() {
    const tests = [
      {distance: 3, coord: [3,3]},
      {distance: 0, coord: [0,0]},
      {distance: 2, coord: [2,0]},
      {distance: 3, coord: [-1,-3]},
      {distance: 28, coord: [1, -27]},
      {distance: 800, coord: [300, -500]}
    ];
    tests.forEach(function(test) {
      it(`should return ${test.distance} for ${test.coord}`, function() {
        const path = hex.shortestPath(test.coord, [0, 0]);
        assert.equal(test.distance, path.length - 1);
      });
    }); 
  });
});
