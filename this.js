var obj = {
  name: 'akshay',
  getName: function () {
    console.log(this);
  },
  getName1: () => {
    console.log(this);
  },
  getName2: function () {
    // let that = this
    setTimeout(function () {
      console.log(this);
    }, 1000);
  },
  getName3: () =>
    setTimeout(() => {
      console.log(this);
    }, 1000),
  getName4: function () {
    setTimeout(() => {
      console.log(this);
    }, 1000);
  },
  getName5: () =>
    setTimeout(function () {
      console.log(this);
    }, 1000),
};

// below is the output from the browser
// - EXECUTE and see!
// 💡 "this" works a little different in Node JS environment

obj.getName(); // the object itself
obj.getName1(); // window
obj.getName2(); // window
obj.getName3(); // window
obj.getName4(); // the object itself
obj.getName5(); // window
