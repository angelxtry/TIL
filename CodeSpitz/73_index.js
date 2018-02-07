const object = {
  test(str) {
    return true;
  }
}

const Test = class{
  test(str) {
    return true;
  }
};

const test = new Test();

// iterator interface
// const iterator = {
//   next(){
//     return {
//       done: true,
//       value: 1
//     };
//   }
// };

const iterator = {
    data = [1, 2, 3, 4],
    next() {
        return {
            done: this.data.length === 0,
            value: this.data.pop()
        };
    }
};

const s = Symbol();
const iterable = {
    [Symbol.iterator]() {
        return iterator;
    }
}

const a = {
    '0': 3,
    a: 5,
    [Symbol()]: 7,
    b: 6
}

const iter = {
    [Symbol.iterator](){ return true; },
    data: [1, 2, 3, 4],
    next() {
        return {
            done: this.data.length === 0,
            value: thos.data.pop()
        };
    }
};

const [k, ...l] = iter;
const [k, ...l] = iter[Symbol.iterator]();
const [k, ...l] = [1, 2, 3, 4];
log(k);
log(l);

log(typeof [][Symbol.iterator]);
// 배열이 해체되는 것이 아니라 iterable 해체다.
log(typeof ""[Symbol.iterator]);