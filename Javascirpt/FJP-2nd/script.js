const products = [
  { name: '반팔티', price: 15000, quantity: 1, is_selected: true},
  { name: '긴팔티', price: 20000, quantity: 2, is_selected: false},
  { name: '핸드폰케이스', price: 15000, quantity: 3, is_selected: true },
  { name: '후드티', price: 30000, quantity: 4, is_selected: false},
  { name: '바지', price: 25000, quantity: 5, is_selected: false},
];

const sum = curry((f, iter) => go(
  iter,
  map(f),
  reduce(add)));


// var list = range(5);
// log(list);
// log(reduce(add, range(5)));

// var list = L.range(5);
// log(list);
// log(reduce(add, list));

// function test(name, time, f) {
//   console.time(name);
//   while(time--) f();
//   console.timeEnd(name);
// }

// test('L.range', 10, () => reduce(add, L.range(1000000)));
// test('range', 10, () => reduce(add, range(1000000)));

// console.time('');
// go (
//   range(100000),
//   take(5),
//   reduce(add),
//   log
// );
// console.timeEnd('');

// console.time('');
// go (
//   L.range(100000),
//   take(5),
//   reduce(add),
//   log
// );
// console.timeEnd('');

// console.time('');
// go (
//   L.range(Infinity),
//   take(5),
//   reduce(add),
//   log
// );
// console.timeEnd('');

// let it = L.map(a => a + 10, [1, 2, 3]);
// log([...it]);
// log(L.map(a => a + 10, [1, 2, 3]));
// log(L.map(a => a + 10, [1, 2, 3]).next());
// log(L.map(a => a + 10, [1, 2, 3]).next().value);

L.filter = function *(f, iter) {
  for (const a of iter) if (f(a)) yield a;
};

var it = L.filter(a => a % 2, [1, 2, 3, 4]);
log(it.next());
log(it.next());
log(it.next());
log(it.next());




















