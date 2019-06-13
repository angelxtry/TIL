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

const isIterable = a => a && a[Symbol.iterator];

// L.flatten = function *(iter) {
//   for (const a of iter) {
//     if (isIterable(a)) {
//       for (const b of a) yield b;
//     }
//     else yield a;
//   }
// };

L.flatten = function *(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield *a;
    else yield a;
  }
};

var it = L.flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]]);
log(take(5, it));

const flatten = pipe(L.flatten, takeAll);
log(flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]]));

L.deepFlat = function *f(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield *f(a);
    else yield a;
  }
};

var it = L.deepFlat([1, [2, [3, [4], [5, 6]]]]);
log(...it);

log([[1, 2], [3, 4], [5, 6, 7]].flatMap(a => a.map(a => a * a)));
log(flatten([[1, 2], [3, 4], [5, 6, 7]].map(a => a.map(a => a * a))));

