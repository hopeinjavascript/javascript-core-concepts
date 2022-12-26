/*
1. Closure is a function binded by its lexical environment and this lexicality could go to the top of the hierarchy up till global scope.
  BUT closures are mostly inclined towards nested functions.
2. Fundamentally, a function along with its lexical environment forms a closure.
3. Closure is works very closely with scope chain concept.
4. What if I were to tell you that closure is also a scope.
5. Put a breakpoint to see, in the browser, whether 'c' has been garbage collected by the JS engine or not. YES it should be garbage collected as it is not been used in the inner function. Once the function is executed (in this case the outer2 function), it is popped out of the call stack thereby losing it scope and all of its variables) so ideally its variables shouldn't be accessible but with Closures it's possible to access them.REMEMBER, only those variables are accessible which are referred in the inner function or any function "down" the hierarchy. The variables which are not referred in the inner function are smartly garbage collected by the JS engine.
Advantages-
	- Currying 
	- Data hiding to avoid modification of the variable by other programs.
Disadvantages-
	- Variable that are preserved are not garbage collected this could lead to memory leaks.
 */

// 1. Basic closure example
function outer(a) {
  const b = 10;
  function inner() {
    console.log(a, b);
  }
  inner();
}

// outer(5);

// 2. Another Basic closure example
function outer1(a) {
  const b = 10,
    c = 20; // won't form a closure as it is not getting used in inner function
  function inner() {
    console.log(a, b);
  }
  inner();
}

// outer(5);

// 3. Intermediate closure example
function outer2(a) {
  const b = 10,
    c = 20;

  return function inner() {
    console.log(a, b); // refer point 5.
  };
}

// const inner = outer2(5);
// console.log(inner);
// inner();

// 4. Another Intermediate closure example
const b = 10;
function outer3(a) {
  return function inner() {
    console.log(a, b); // refer point 1 & 3.
  };
}
outer3(5)(); // another way to call nested functions

// 5. Classic closure interview question with setTimeout

// with "var"
// for (var i = 0; i < 5; i++) // will print 5 five times
// for (var i = 0; i <= 5; i++) // will print 6 six times
// ? Because till the time setTimeout prints the value of "i", full loop has already run.
// ? so the reference to value of "i" is now 6

/*
function func() {
  for (var i = 0; i <= 5; i++) {
    setTimeout(function () {
      console.log(i);
    }, 1000 * i);
  }
}
func();
*/

// ? a small fix is to change var to let because let is a block scope

// with "let"
// for (let i = 0; i < 5; i++) // will print 0 1 2 3 4
// for (let i = 0; i <= 5; i++) // will print 0 1 2 3 4 5

/*
function func() {
  for (let i = 0; i <= 5; i++) {
    setTimeout(function () {
      console.log(i);
    }, 1000 * i);
  }
}
func();
*/

// but smart interviewer might not want to see this solution but some other solution
// this is where closure comes to our rescue!
// 💡
function func() {
  for (var i = 0; i <= 5; i++) {
    function inner(i) {
      setTimeout(function () {
        console.log(i); // closure
      }, 1000 * i);
    }
    inner(i);
  }
}
// func();
