// * A polyfill is a piece of code (usually JavaScript on the Web) used to provide modern functionality on older browsers that do not natively support it.

/**
 * 
// first check if map exists, if not then add the polyfill
if (!Array.prototype.map) {
  // polyfill code here
} else {
  // actual prototype method here which is natively available in the browser
}
 * */

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// "this" here is the "array" (nums) we will be calling our myForEach method on
function validate(thisArg, cb) {
  if (thisArg == null) {
    throw new TypeError('Array.prototype.reduce called on null or undefined');
  }
  if (typeof cb !== 'function') {
    throw new TypeError(cb + ' is not a function');
  }
}

/* 
polyfill for Array.prototype.forEach
*/
Array.prototype.myForEach = function (cb) {
  validate(this, cb);

  for (let i = 0; i < this.length; i++) {
    cb(this[i], i, this);
  }
};

console.log('myForEach=>');
nums.myForEach((n) => {
  console.log(n * 2);
});

/* 
polyfill for Array.prototype.map
*/
Array.prototype.myMap = function (cb) {
  validate(this, cb);

  const cbArray = [];

  for (let i = 0; i < this.length; i++) {
    let cbResult = cb(this[i], i, this);
    cbArray.push(cbResult);
  }

  return cbArray;
};

const myMapNums = nums.myMap((n) => n + 1);
console.log('myMap =>', myMapNums);

/* 
polyfill for Array.prototype.filter
*/
Array.prototype.myFilter = function (cb) {
  validate(this, cb);

  const cbArray = [];

  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      cbArray.push(this[i]);
    }
  }

  return cbArray;
};

const myFilterNums = nums.myFilter((n) => n > 5);
console.log('myFilter =>', myFilterNums);

/* 
polyfill for Array.prototype.reduce
*/
Array.prototype.myReduce = function (cb, initVal) {
  validate(this, cb);

  let acc = initVal;

  for (let i = 0; i < this.length; i++) {
    //checking if acc has any value assigned
    acc = acc ? cb(acc, this[i], i, this) : this[i];
  }

  return acc;
};

const myReduceNums = nums.myReduce((acc, curr) => acc + curr);
console.log('myReduce =>', myReduceNums);

/****************************************************************
CALL, APPLY AND BIND
****************************************************************/
const person = {
  f_name: 'Akshay',
  l_name: 'Sood',
};
function printDetails(state, country, text) {
  console.log(
    `${this.f_name} ${this.l_name} is from ${state}, ${country} - ${text}`
  );
}

/* 
polyfill for Function.prototype.call
*/
Function.prototype.myCall = function (thisContext = {}, ...args) {
  if (typeof this !== 'function')
    throw new TypeError(cb + ' is not a function');

  const func = this;
  // thisContext is an object == thisObj
  thisContext.func = func;
  thisContext.func(...args);
};

printDetails.myCall(person, 'Mumbai', 'India', 'Hey');

/* 
polyfill for Function.prototype.apply
*/
Function.prototype.myApply = function (thisContext = {}, args = []) {
  if (typeof this !== 'function')
    throw new TypeError(cb + ' is not a function');

  if (!Array.isArray(args))
    throw new TypeError('CreateListFromArrayLike called on non-object');

  const func = this;

  thisContext.func = func;
  thisContext.func(...args);
};

// printDetails.myApply(person, 'Mumbai', 'India'); // try out to see error
printDetails.myApply(person, ['Mumbai', 'India', 'Hi']);

/* 
polyfill for Function.prototype.bind
*/
Function.prototype.myBind = function (thisContext = {}, ...args) {
  if (typeof this !== 'function')
    throw new TypeError(cb + ' is not a function');

  const func = this;

  thisContext.func = func;
  return (...outerFuncArgs) => thisContext.func(...args, ...outerFuncArgs);
};

printDetails.myBind(person, 'Mumbai', 'India', 'World')();
printDetails.myBind(person, 'Mumbai', 'India')('World');
printDetails.myBind(person, 'Mumbai')('India', 'World');
printDetails.myBind(person)('Mumbai', 'India', 'World');

//Another way of implementing polyfill for bind
/*
Comment on Akshay Saini's YT video of polyfill for bind-
Nicely explained. Just wondering if interviewer will be okay with a polyfil for bind that uses apply internally. I mean call, bind and apply fall into a common category. Also, a browser that supports ES6 spread operator would also support bind.
*/
Function.prototype.myBind_1 = function (...args) {
  if (typeof this !== 'function')
    throw new TypeError(cb + ' is not a function');

  const func = this,
    params = args.slice(1);

  return function (...outerFuncArgs) {
    func.apply(args[0], [...params, ...outerFuncArgs]);
  };
};
console.log('>> myBind_1');
printDetails.myBind_1(person, 'Mumbai', 'India', 'Universe')();
printDetails.myBind_1(person, 'Mumbai', 'India')('Universe');
printDetails.myBind_1(person, 'Mumbai')('India', 'Universe');
printDetails.myBind_1(person)('Mumbai', 'India', 'Universe');
