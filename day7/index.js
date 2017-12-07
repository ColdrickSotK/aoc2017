const tower = require('./tower')

const tree = tower.getTower('data/tower');
const root = tower.getRoot(tree);
console.log('Part 1:', root);
console.log('Part 2:', tower.getUnbalancedKeyWeight(root, tree));
