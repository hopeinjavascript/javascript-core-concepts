/*
https://javascript.info/currying-partials
Currying is an advanced technique of working with functions. It’s used not only in JavaScript, but in other languages as well.
Currying is a transformation of functions that translates a function from callable as f(a, b, c) into callable as f(a)(b)(c).
Currying doesn’t call a function. It just transforms it.

https://dev.to/cglikpo/currying-in-javascript-1jke
Currying is a process in functional programming in which we can transform a function with multiple arguments into a sequence of nesting functions. It returns a new function that expects the next argument inline.
NB:The number of arguments a function takes is also called "arity".
*/

/*
# Fixed-length functions only
The currying requires the function to have a fixed number of arguments.
A function that uses rest parameters, such as f(...args), can’t be curried this way.

# A little more than currying
By definition, currying should convert sum(a, b, c) into sum(a)(b)(c).
But most implementations of currying in JavaScript are advanced, as described: they also keep the function callable in the multi-argument variant.

* The number of nested functions a curried function has is proportional to the number of arguments it receives. That qualifies it as a curry.


Currying and Partial Application are related (because of closure), but they are of different concepts.
Partial application transforms a function into another function with smaller arity.

function multiply1(x, y, z) {
    return multiply2(x,y,z)
}

to

function multiply1(x) {
    return (y,z) => {
        return mulitply2(x,y,z)
    }
}

For Currying, it would be like this:

function multiply1(x) {
    return (y) = > {
        return (z) = > {
            return multiply2(x,y,z)
        }
    }
}
Currying generates nested functions based on the number of arguments passed into the function. Each function is given a parameter. There is no currying if there is no argument.
*/

// Currying can be achieved using
// 1. array bind method
// 2. and closures.

//imitating logging mechanism
function logger(date, label, message, user) {
  console.log(`${date.toLocaleString()}\t${label}\t${user}\t${message}`);
}

// 1. using Array.prototype.bind

// ? you cannot do bind chaining, NOT SUPPORTED => func.bind(this, 'hello', 'world').bind(null, 'universe')
// * in my opinion, bind is a BETTER SOLUTION for currying than closure because using bind we can return as many copies of the function we want/need with closures we will have to have definite number of arguments
const dateBind = logger.bind(null, new Date());
const infoLogger = dateBind.bind(null, 'INFO');
const warnLogger = dateBind.bind(null, 'WARN');
const errorLogger = dateBind.bind(null, 'ERROR');

// console.log('>> using bind');
const infoUser = infoLogger.bind(null, 'some information');
const warnUser = warnLogger.bind(null, 'some warning');
const errorUser = errorLogger.bind(null, 'some error');

const one = infoUser.bind(null, 'akshaysood');
const two = warnUser.bind(null, 'akshay_sood');
const three = errorUser.bind(null, 'akshay__sood');

// below calls won't throw error
// one('one');
// two('two');
// three('three');

// 2. using Closures

function logging(date) {
  return function (label) {
    return function (message) {
      console.log(
        `${date.toLocaleString()}\t${label}\t${JSON.stringify(message)}`
      );
    };
  };
}

// console.log('>> using closures');
// logging(new Date())('INFO')('some information');
// logging(new Date())('WARN')('some warning');
// const errFunc = logging(new Date())('ERROR')('some error');
// errFunc(); // throws error because logging function only returns two functions

// A function to transform any function into a curried functional function
// Ex. func(a,b,c) ==> func(a)(b)(c)

//
function curry(func) {
  return function (a) {
    return function (b) {
      return func(a, b);
    };
  };
}

const sumFunc = (a, b) => a + b;

const curriedSumFunc = curry(sumFunc);
const sumVal = curriedSumFunc(10)(324);
console.table({ sumVal });
