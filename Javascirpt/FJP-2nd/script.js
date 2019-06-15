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

// function add10(a, callback) {
//   setTimeout(() => callback(a + 10), 1000);
// }

// var a = add10(5, res => {
//   log(res);
// });

// function add20(a) {
//   return new Promise(resolve => setTimeout(() => resolve(a + 20), 1000));
// }

// var b = add20(5)
//   .then(log);

// add20(5)
//   .then(add20)
//   .then(add20)
//   .then(add20)
//   .then(log);

// add10(5, res => {
//   add10(res, res => {
//     add10(res, res => {
//       log(res);
//     });
//   });
// });

// log(a);
// log(b);

// var c = add20(5, _ => _);
// var d = c.then(a => a - 5);
// d.then(log);

const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);
const add5 = a => a + 5;
const delay1000 = a => new Promise(resolve =>
  setTimeout(() => resolve(a), 1000));

const n1 = 10;
go1(go1(n1, add5), log);
const n2 = delay1000(10);
go1(go1(n2, add5), log);
