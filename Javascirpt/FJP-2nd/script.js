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

log(map(p => p.price, products));
log(map(p => p.price, filter(p => p.price < 20000, products)));
