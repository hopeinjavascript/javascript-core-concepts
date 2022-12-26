// https://stackoverflow.com/questions/36734900/what-happens-if-you-dont-resolve-or-reject-a-promise
// MUST READ - the answer

/*
1. The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
2. Promise ensures or guarantees that it will be fulfilled with either Resolved state or Rejected state.
  So, it becomes easier and intuitive for the promise consumer while consuming the promise.
3. Promise also ensures that resolve or reject will only be called ONCE.
4. With Promises, control is with the one writing the code based on the output of the promise.
  In contrast, with callbacks, we pass a function to another thereby giving control of our code to some another code written by some another developer.
  Not to mention the drawbacks it comes with for example it could get called twice, thrice or never be called etc.
5. Promise returns an "object" with two properties - Promise state and Promise result
6. Promise state can either of the below-
    - Pending - yet to be resolved/rejected
    - Resolved - resolved
    - Rejected - rejected
7. If a promise is resolved it will go inside the then block
8. If a promise is rejected it will go inside the catch block
9. If a promise is rejected or fails it will be catched by the nearest catch block.
10. Code inside the finally block will always be executed.
*/

// execute promise recursively
const log = console.log;
const error = console.error;

const cb = (text) => log(text);
var printText = (text, cb) => cb(text);
// printText('hey', cb);

// Question 1. create promise p1, create promise p2 and resolve p1 from within p2 and get the result of p1
const createPromise = (state, text) =>
  new Promise((resolve, reject) => (state ? resolve(text) : reject(text)));
// const p1 = new Promise((resolve) => resolve('promise 1'));
// const p2 = new Promise((resolve) => resolve(p1));
const p1 = createPromise(true, 'promise 1');
const p2 = createPromise(true, p1);
// p1.then((res) => res).then(log);

// Question 2.
function recursivePromise(arrayOfPromises) {
  if (arrayOfPromises.length === 0) return;

  //   log(arrayOfPromises, '-', arrayOfPromises.length);

  const currentPromise = arrayOfPromises.shift();

  currentPromise.then(log).catch(error);

  recursivePromise(arrayOfPromises);
}

// recursivePromise([
//   Promise.resolve('p1'),
//   Promise.reject('p2'), // ? is resolve faster than reject ? or it's just the execution order
//   Promise.resolve('p3'),
// ]);

// Question 3. Promise chaining

import { warnLogger, errorLogger } from './logger.js';

function createPromiseWithText(state, text, number) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      if (state) resolve(text);
      else reject(new Error('Rejected!'));
    }, 1000 * number);
  });
}

const createOrder = createPromiseWithText(false, 'Order created!', 1);
const showOrderSummary = createPromiseWithText(true, 'Order summary!', 2);
const makePayment = createPromiseWithText(false, 'Order payment!', 3);
const updateWalletBalance = createPromiseWithText(true, 'Wallet balance!', 4);

// catches are not working properly. CHECK!
createOrder
  .then((result) => {
    if (result) warnLogger({ createOrder: result });
    return showOrderSummary;
  })
  .catch((err) => errorLogger({ createOrder: err.message })) // catches the error for all the THENs above it!
  .then((result) => {
    if (result) warnLogger({ showOrderSummary: result });
    return makePayment;
  })
  .catch((err) => errorLogger({ makePayment: err.message })) // catches the error for all the THENs above it!
  .then((result) => {
    if (result) warnLogger({ makePayment: result });
    return updateWalletBalance;
  })
  .catch((err) => errorLogger({ updateWalletBalance: err.message })) // catches the error for all the THENs above it!
  .then((result) => {
    warnLogger({ updateWalletBalance: result });
  })
  .catch((err) => errorLogger({ err })) // catch for all! if no catch is present in the chain all the errors will be catched in the last catch
  .finally(() => warnLogger('Finally')); // will execute no matter what!
