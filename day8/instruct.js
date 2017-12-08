const fs = require('fs');

function parseInstruction(instruction) {
  let result = {};
  let [command, condition] = instruction.trim().split(' if ');
  let [target, method, change] = command.trim().split(' ');
  result.target = target;
  result.change = +change;
  result.condition = condition;
  if (method === 'dec') {
    result.change *= -1;
  }
  return result;
}

function evaluateCondition(condition, registers) {
  condition = condition.split(' ');
  condition[0] = registers[condition[0]] || 0;
  // hack to add a register when we fail to access one
  if (condition[0] === 0) {
    registers[condition[0]] = 0;
  }
  condition = condition.join(' ');
  return eval(condition);
}

function executeCommand(instruction, registers) {
  // hack to add a register when we fail to access one
  if (!registers[instruction.target]) {
    registers[instruction.target] = 0;
  }
  if (evaluateCondition(instruction.condition, registers)) {
    let current = registers[instruction.target];
    registers[instruction.target] = current + instruction.change;
  }
}

function runFile(path) {
  let input = fs.readFileSync(path, 'utf-8').trim().split('\n');
  var registers = {};
  var instructions = [];
  var runningHighest = 0;
  input.forEach(line => {
    instructions.push(parseInstruction(line));
  });
  instructions.forEach(instruction => {
    executeCommand(instruction, registers);
    runningHighest = Math.max(runningHighest, maxRegister(registers));
  });
  console.log(runningHighest);
  return registers;
}

function maxRegister(registers) {
  let keys = Object.keys(registers);
  var values = [];
  keys.forEach(key => values.push(registers[key]));
  return Math.max(...values);
}


exports.parseInstruction = parseInstruction;
exports.evaluateCondition = evaluateCondition;
exports.runFile = runFile;
exports.maxRegister = maxRegister;
