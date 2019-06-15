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

// log(queryStr({ limit: 10, offset: 10, type: 'notice' }));

// log(filter(a => a % 2, range(10)));


// L.flatten = function *(iter) {
//   for (const a of iter) {
//     if (isIterable(a)) {
//       for (const b of a) yield b;
//     }
//     else yield a;
//   }
// };

// log(flatMap(map(a => a * a), [[1, 2], [3, 4], [5, 6, 7]]));

// const arr = [
//   [1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [9, 10]
// ];

// go(arr,
//   flatten,
//   filter(a => a % 2),
//   log);

// go(arr,
//   L.flatten,
//   L.filter(a => a % 2),
//   take(3),
//   log);

// var users = [
//   { name: 'a', age: 21, family: [
//     { name: 'a1', age: 53 }, { name: 'a2', age: 47 },
//     { name: 'a3', age: 16 }, { name: 'a4', age: 15 },
//   ] },
//   { name: 'b', age: 24, family: [
//     { name: 'b1', age: 58 }, { name: 'b2', age: 51 },
//     { name: 'b3', age: 19 }, { name: 'b4', age: 22 },
//   ] },
//   { name: 'c', age: 31, family: [
//     { name: 'c1', age: 64 }, { name: 'c2', age: 62 },
//   ] },
//   { name: 'd', age: 20, family: [
//     { name: 'd1', age: 42 }, { name: 'd2', age: 42 },
//     { name: 'd3', age: 11 }, { name: 'd4', age: 7 },
//   ] },
// ];

// go(users,
//   L.map(u => u.family),
//   takeAll,
//   log);

// go(users,
//   L.map(u => u.family),
//   L.flatten,
//   L.filter(u => u.age < 20),
//   takeAll,
//   log);

// go(users,
//   L.map(u => u.family),
//   L.flatten,
//   L.filter(u => u.age < 20),
//   L.map(u => u.name),
//   take(3),
//   log);

// go(users,
//   L.flatMap(u => u.family),
//   L.filter(u => u.age < 20),
//   L.map(u => u.name),
//   take(3),
//   log);

// const makeObj = ([k, v]) => 

const obj = {
  a: "b",
  f: function(){},
  u: undefined,
  c: "d",
};

var newObj = {};
const makeObj = (obj, [k, v]) => obj[k] = v || obj;
var res = filter(
  ([k, v]) => !(typeof v === 'function' || v === undefined),
  Object.entries(obj));
log(res);

// for (const [k, v] of res) {
//   newObj[k] = v;
// }

reduce(([k, v]) => 
log(newObj);
