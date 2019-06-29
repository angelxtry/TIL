// const Car = function() {
//   var someInstance = {};
//   someInstance.position = 0;
//   someInstance.move = function() {
//     this.position += 1;
//   }
//   return someInstance;
// };

// var car1 = Car();
// car1.move();
// console.log(car1);

// var car2 = Car(5);
// console.log(car2);

// var extend = function(to, from) {
//   for (var key in from) {
//     to[key] = from[key];
//   }
// };

// const someMethods = {};
// someMethods.move = function() {
//   this.position += 1;
// };

// const Car = function(position) {
//   var someInstance = {
//     position: position,
//   };
//   extend(someInstance, someMethods);
//   return someInstance;
// };

// var car1 = Car(5);
// var car2 = Car(10);
// console.log(car1);

// 3. Prototypal
// var someMethods = {};
// someMethods.move = function() {
//   this.position += 1;
// };

// var Car = function(position) {
//   var someInstance = Object.create(someMethods);
//   someInstance.position = position;
//   return someInstance;
// };

// var car1 = Car(5);
// var car2 = Car(10);
// console.log(car2);

// 4. Pseudoclassical
var Car = function(position) {
  this.position = position;
};

Car.prototype.move = function() {
  this.position += 1;
};

var car1 = new Car(5);
var car2 = new Car(10);