// const log = console.log;

// const map = (f, iter) => {
//   let res = [];
//   for (const p of iter) {
//     res.push(f(p));
//   }
//   return res;
// }

// const reduce = (f, acc, iter) => {
//   if (!iter) {
//     iter = acc[Symbol.iterator]();
//     acc = iter.next().value;
//   }
//   for (const a of iter) {
//     acc = f(acc, a);
//   }
//   return acc;
// }

const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];

// log(
//   reduce(
//     (total_price, product) => total_price + product.price,
//     0,
//     products));


go(
  0,
  a => a + 1,
  a => a + 10,
  a => a + 100,
  log
);

// const pipe = (...fs) => (a) => go(a, ...fs);

const f = pipe(
  add,
  a => a + 10,
  a => a + 100);

log(f(0, 2));

go(
  products,
  products => filter(p => p.price < 20000, products),
  products => map(p => p.price, products),
  prices => reduce(add, prices),
  log);

go(
  products,
  products => filter(p => p.price < 20000)(products),
  products => map(p => p.price)(products),
  prices => reduce(add)(prices),
  log);
 
go(
  products,
  filter(p => p.price < 20000),
  map(p => p.price),
  reduce(add),
  log);

const mult = curry((a, b) => a * b);
log(mult);
log(mult(3));
log(mult(3)(5));

const mult3 = mult(3);
log(mult3(20));
log(mult3(10));
log(mult3(5));

