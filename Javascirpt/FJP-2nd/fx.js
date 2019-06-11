const log = console.log;

const add = (a, b) => a + b;

const curry = f =>
  (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

// const map = curry((f, iter) => {
//   let res = [];
//   for (const p of iter) {
//     res.push(f(p));
//   }
//   return res;
// });

const take = curry((l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) return res;
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});

const join = curry((sep = ',', iter) =>
  reduce((a, b) => `${a}${sep}${b}`, iter));

const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

const L = {};

L.entries = function *(obj) {
  for (const k in obj) yield [k, obj[k]];
};

L.range = function *(l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

L.map = curry(function *(f, iter) {
  for (const a of iter) {
    yield f(a);
  }
});

L.filter = curry(function *(f, iter) {
  for (const a of iter) {
    if (f(a)) {
      yield a;
    }
  }
});

const takeAll = take(Infinity);

const map = curry(pipe(L.map, takeAll));

const filter = curry(pipe(L.filter, takeAll));

const find = curry((f, iter) => go(
  iter,
  L.filter(f),
  take(1),
  ([a]) => a
));

const queryStr = pipe(
  L.entries,
  L.map(([k, v]) => `${k}=${v}`),
  join('&')
);
