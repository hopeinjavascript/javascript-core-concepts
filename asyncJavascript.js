function add(num1, num2, callback) {
  callback(num1 + num2);
}

function sub(num1, num2, callback) {
  callback(num1 - num2);
}

function mult(num1, num2, callback) {
  callback(num1 * num2);
}

function div(num1, num2, callback) {
  callback(num1 / num2);
}

const add1 = (num1, num2) => Promise.resolve(num1 + num2);
const sub1 = (num1, num2) => Promise.resolve(num1 - num2);
const mult1 = (num1, num2) => Promise.resolve(num1 * num2);
const div1 = (num1, num2) => Promise.resolve(num1 / num2);

async function calc() {
  const addAns = await add1(22, 10);
  const subAns = await sub1(addAns, 6);
  const multAns = await mult1(subAns, 2);
  const finalAns = await div1(multAns, 4);
  console.log('asyncAwait>>', finalAns);
}

// callback hell ==> Every function definition of the caller function must be taking in a callback
add(22, 10, (output) => {
  sub(output, 6, (output) => {
    mult(output, 2, (output) => {
      div(output, 4, (output) => {
        console.log('Callback Hell>>', output);
      });
    });
  });
});

//promise
add1(22, 10)
  .then((o) => sub1(o, 6))
  .then((o) => mult1(o, 2))
  .then((o) => div1(o, 4))
  .then((o) => console.log('Promise>>', o));

//async await ==> according to output its fast than Promise
calc();
