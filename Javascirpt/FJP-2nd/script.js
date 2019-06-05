const products = [
  { name: '반팔티', price: 15000, quantity: 1 },
  { name: '긴팔티', price: 20000, quantity: 2 },
  { name: '핸드폰케이스', price: 15000, quantity: 3 },
  { name: '후드티', price: 30000, quantity: 4 },
  { name: '바지', price: 25000, quantity: 5 },
];

go(
  products,
  map(p => p.quantity),
  reduce((a, b) => a + b),
  log);

const total_quantity = products => go(
  products,
  map(p => p.quantity),
  reduce((a, b) => a + b));
log(total_quantity(products));

const sum = (f, iter) => go(
  iter,
  map(f),
  reduce(add));

log(sum(p => p.quantity, products));
log(sum(p => p.quantity * p.price, products));

const total_age = sum(
  u => u.age, [
    { name: 'a', age: 10 },
    { name: 'b', age: 20 },
    { name: 'c', age: 30 },
  ]);
log(total_age);