/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. When in the global scope (this by itself), 'this' will reference the window/console.
* 2. If you're using a method, it's implied that 'this' references what is left of the dot.
* 3. Whenever a constructor is used, 'this' refers to the instance of that object.
* 4. You can use bind(), call(), and apply() to explicitly choose what 'this' references
*
* write out a code example of each explanation above
*/

// Principle 1

// code example for Window Binding
console.log(this); // 'this' will be the window object or the console here

// Principle 2

// code example for Implicit Binding
const thing = {
  name: "thingName",
  sayName: function() { console.log(this.name); }
};
thing.sayName();

// Principle 3

// code example for New Binding

function OtherThing() {
  this.name = "otherThing";
}
OtherThing.prototype.sayName = function() { console.log(this.name); };
const otherThing = new OtherThing();
otherThing.sayName();

// Principle 4

// code example for Explicit Binding

otherThing.sayName.call(thing);