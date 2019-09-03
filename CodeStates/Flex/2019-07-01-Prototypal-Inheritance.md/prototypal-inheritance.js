function Parent(name) {
  this.name = name;
}
Parent.prototype.sayHi = function () {
  console.log('Hi! ' + this.name);
};

// var child = Object.create(Parent.prototype);
// child.name = 'child!!';
// child.sayHi();  // Hi! child

// console.log(child instanceof Parent);

var child = function() {

};

child = Object.create(Parent.prototype);
