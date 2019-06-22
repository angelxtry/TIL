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

var extend = function(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
};

const someMethods = {};
someMethods.move = function() {
  this.position += 1;
};

const Car = function(position) {
  var someInstance = {
    position: position,
  };
  return someInstance;
};

var car1 = Car(5);
var car2 = Car(10);
console.log(car1);
