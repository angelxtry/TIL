//  JavaScript Instantiation Pattern
// 1. Functional
// 2. functional shared
// 3. prototypal
// 4. psuedo-classical

// function Car(position) {
//   const someInstance = {};
//   someInstance.position = position;
//   return someInstance;
// }

// var Car = function (position) {
//   this.position = position;
// }

// Car.prototype.move = function() {
//   this.position += 1;
// }

const Car = function (position) {
  this.position = position;
};

Car.prototype.move = function() {
  this.position += 1;
};

const car1 = new Car(10);
console.log(car1);
car1.move();
console.log(car1);


const Stack = function() {
  const obj = {};
  obj.data = [];
  obj.count = 0;
  obj.push = function(v) {
    this.data.push(v);
    this.count++;
  }
  obj.pop = function() {
    if (this.count === 0) {
      return null;
    }
    this.count--;
    return this.data.pop();
  }
  obj.size = function() {
    return this.count;
  }
  obj.printAll = function() {
    for (const a of obj.data) {
      console.log(a);
    }
  }
  return obj;
}

const st = Stack();
st.push(1);
st.push(2);
st.push(3);
st.printAll();
st.pop();
st.printAll();

const Queue = function() {
  const obj = {};
  obj.data = {};
  obj.head = 0;
  obj.tail = 0;
  obj.enqueue = function(v) {
    this.tail += 1;
    obj[this.tail] = v;
  };
  obj.dequeue = function() {
    if (this.head === this.tail) {
      return null;
    }
    this.head += 1;
    const v = obj[this.head];
    delete obj[this.head];
    return v;
  };
  obj.size = function() {
    return this.tail - this.head;
  };
  return obj;
}

const q = Queue();
q.enqueue(10);
q.enqueue(20);
q.enqueue(30);
console.log(q);
q.dequeue();
console.log(q);
q.dequeue();
console.log(q);
q.dequeue();
console.log(q);
q.dequeue();
console.log(q);
