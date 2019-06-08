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

go(range(10),
  map(n => n + 10),
  filter(n => n % 2),
  take(2),
  log);

go(L.range(10),
  L.map(n => n + 10),
  L.filter(n => n % 2),
  take(2),
  log);