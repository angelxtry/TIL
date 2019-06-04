const log = console.log;

const map = (f, iter) => {
  let res = [];
  for (const p of iter) {
    res.push(f(p));
  }
  return res;
}

const filter = (f, iter) => {
  let res = [];
  for (const p of iter) {
    if (f(p)) res.push(p);
  }
  return res;
};

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
}

