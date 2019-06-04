const log = a => console.log(a);

// const apply1 = f => f(1);
// const add2 = a => a + 2;
// log(add2)
// log(apply1(add2));

// const times = (f, n) => {
//   let i = -1;
//   while (++i < n) f(i);
// };
// times(log, 3);
// times(a => log(a + 10), 3);

/*
const arr = [1, 2, 3];
for (const a of arr) console.log(a);

const set = new Set([1, 2, 3]);
for (const a of set) console.log(a);

const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
for (const a of map) console.log(a);

var it = map[Symbol.iterator];
console.log(it);

var iterKeys = map.keys();
console.log('iterKeys: ', iterKeys);
var iterKeys2 = iterKeys[Symbol.iterator]();
console.log('iterKeys2: ', iterKeys2);
*/

/*
const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i === 0 ? { done: true } : { value: i--, done: false };
      }
    }
  }
};
let iterator = iterable[Symbol.iterator]();
log(iterator.next());
log(iterator.next());
log(iterator.next());
log(iterator.next());

for (const a of iterable) console.log(a);
*/

/*
function *gen() {
  yield 1;
  yield 2;
  yield 3;
  return 100;
}

let iter = gen();
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());

for (const a of gen()) log(a);
*/

/*
function *odds(l) {
  for (let i = 0; i < l; i++) {
    if (i % 2) yield i;
  }
}

let iter = odds(10);
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());
*/

function *infinity(i = 0) {
  while (true) yield i++;
}

function *odd(l) {
  for (const a of infinity(1)) {
    if (a % 2) yield a;
    if (a === l) return;
  }
};
*/

/*
let iter = odd(10);
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());
*/
/*
function *limit(l, iter) {
  for (const a of iter) {
    yield a;
    if (a === l) return;
  }
}

let iter = limit(4, [1, 2, 3, 4, 5]);
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());
*/

/*
function *infinity(i = 0) {
  while (true) yield i++;
}

function *limit(l, iter) {
  for (const a of iter) {
    yield a;
    if (l === a) return;
  }
}

function *odds(l) {
  for (const a of limit(l, infinity(1))) {
    if (a % 2) yield a;
  }
}

for (const a of odds(40)) log(a);
*/