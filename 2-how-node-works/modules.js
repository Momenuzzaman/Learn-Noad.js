const C = require('./test-module-1');

const calculate = new C();
console.log(calculate.add(10, 20));

console.log(calculate.multiply(10, 20));

console.log(calculate.divide(10, 20));