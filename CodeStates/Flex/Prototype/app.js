// function Person() {
//   this.eyes = 2;
//   this.noes = 1;
// }

function Person() {}

Person.prototype.eyes = 2;
Person.prototype.nose = 1;

var kim = new Person();
var park = new Person();

console.log(kim.eyes);
console.log(kim.nose);

console.log(park.eyes);
console.log(park.nose);

function Car() {
  this.wheels = 4;
  this.seats = 2;
}

var porsche = new Car();
var ferrari = new Car();

console.log(porsche.wheels);
console.log(porsche.seats);

console.log(ferrari.wheels);
console.log(ferrari.seats);

function Car() {}

Car.prototype.wheels = 4;
Car.prototype.seats = 1;