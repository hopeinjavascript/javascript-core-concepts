/*
1. classes are a way to create objects essentially called instances of a class.
    they are used to group together related properties and methods in one place just like any other object literal.
2. class keyword is just a syntactic sugar over functions and prototypes.
3. classes in javascript compile down to functions internally, still!
4. JavaScript by nature isn't a OOP language it's based on Prototypal inheritance.
5. classes support getters, setters, private variables/methods, static variables/methods etc.
    anything that an object "literal" does.
    Private fields are not accessible outside the class NOT even in the subclass.
6. the instance created using new keyword points to the reference of "this"
7. until private fields in class became a standard and all browsers started supporting it,
    "factory" functions were used to create private fields/variables.
    Note: Factory functions are used to create and return object.
8. methods defined within a class gets attach to the prototype of that class viz. internally an object itself, so methods that we access from multiple instances are accessed from the shared storage viz. prototype.
9. In contrast, factory functions return new object every time we create and return an object
    so presumably memory footprint is higher for factory functions than classes.
10. also, for the sake of argument, classes are faster in creating objects.
    ex. it takes 0.0002 seconds to create an object using class and 0.0004 seconds in case of factory functions.
    So, if you were to create 10,000 objects in one frame/second than classes would give you an advantage of 2ms. Now think why are you creating or why would you ever want to create 10,000 objects in one frame in the first place.
    Arguably, you can use "either" if you are creating a few hundreds objects.

*/

class Pizza {
  #base = 'thin'; //private field
  toppings = []; // regular field
  static shopName = "Akshay's Pizza"; // static field
  // static #shopName = "Akshay's Pizza"; // static + private field

  // constructor is used to initialize object's properties
  constructor(crust, toppings) {
    this.crust = crust ?? this.#base;
    // this.toppings = toppings ?? []; // should be an array
  }

  //getter
  get _crust() {
    return this.crust;
  }

  //setter
  set _crust(value) {
    this.crust = value;
  }

  //method
  setTopping(value) {
    this.toppings?.push(value);
    return this; // returning entire object for chaining it's fields and methods
  }

  //getter
  get _shopName() {
    return Pizza.shopName;
  }

  //   OR

  static getShopName() {
    return Pizza.shopName;
  }

  //define private method below
  //   #someMethod() {}

  hereIsYourPizza() {
    console.log(
      `Here is your ${this.crust} crust pizza with toppings ${
        this.toppings + ''
      } from ${Pizza.getShopName()}`
    );
  }
}

// creating an instance of Pizza class
const myPizza = new Pizza('regular');
console.log(Pizza.shopName);
// console.log(Pizza.#shopName); // error while accessing private field
console.log(Pizza.getShopName());
console.log(myPizza._crust); // accessing getter just like any other property
// myPizza._crust = 'thin extra cheese'; // setting value to a setter just like any other property
myPizza.setTopping('tomato');
myPizza.setTopping('onion');
myPizza.setTopping('cheese');
myPizza.setTopping('mushrooms');
myPizza.setTopping('chicken').hereIsYourPizza();

// Factory function
function Pizza_1(_crust) {
  const crust = _crust ?? 'thin';
  const toppings = ['tomato', 'onion', 'cheese', 'mushrooms', 'chicken'];

  function getShopName() {
    // see how we were able to access shopName from Pizza class because it is NOT private
    // if you were to declare this as #shopName then you would get an error while accessing it.
    return Pizza.shopName;
  }

  return {
    hereIsYourPizza: () => {
      console.log(
        `Here is your ${crust} crust pizza with toppings ${
          toppings + ''
        } from ${getShopName()}`
      );
    },
  };
}

const myPizza_1 = Pizza_1('regular');
myPizza_1.hereIsYourPizza();
