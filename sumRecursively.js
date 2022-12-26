// sum(1)(2)(3)(4)..(n)() | Amazon UI/Frontend Javascript Interview Question

import { warnLogger } from './logger.js';

function sumRecursively(num1) {
  return function (num2) {
    // check to see if num2 is present viz. if empty paranthesis are present which ultimately return the final sum
    if (num2) return sumRecursively(num1 + num2);
    else return num1;
  };
}

// arrow function syntax - one liner

const sumRecursively_1 = (num1) => (num2) =>
  num2 ? sumRecursively_1(num1 + num2) : num1;

const sum = sumRecursively(1)(2)(1)(2)(1)(7)();
warnLogger({ sum });
const sum_1 = sumRecursively_1(1)(2)(1)(2)(1)(7)();
warnLogger({ sum_1 });
