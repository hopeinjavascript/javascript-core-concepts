// * A polyfill is a piece of code (usually JavaScript on the Web) used to provide modern functionality on older browsers that do not natively support it.

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

// first check if map exists, if not then add the polyfill
if (!Array.prototype.map) {
  // polyfill code here
} else {
  // actual prototype method here which is natively available in the browser
}

/* 
polyfill for Array.prototype.forEach
*/
Array.prototype.myForEach = function (cb) {
  validate(this, cb);

  for (let i = 0; i < this.length; i++) {
    cb(this[i]);
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
    let cbResult = cb(this[i]);
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
    if (cb(this[i])) {
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

const INIT_VAL = 0;
const myReduceNums = nums.myReduce((acc, curr) => acc + curr, INIT_VAL);
console.log('myReduce =>', myReduceNums);

// const reduceNums = nums.reduce((acc, curr) => acc + curr, INIT_VAL);
// console.log('reduce =>', reduceNums);
