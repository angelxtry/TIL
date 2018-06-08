!function () {

  const log = console.log;

  const collIter = coll =>
    coll[Symbol.iterator] ?
      coll[Symbol.iterator]() :
      valuesIter(coll);

  function reduce(f, coll, acc) {
    const iter = collIter(coll);
    acc = acc === undefined ? iter.next().value : acc;
    for (const v of iter) {
      acc = f(acc, v);
    }
    return acc;
  }

  const go = (a, ...fs) => {
    let b = a;
    const iter = fs[Symbol.iterator]();
    return function recur(b) {
      for (const f of iter) {
        b = f(b);
        if (b instanceof Promise) return b.then(recur);
      }
      return b;
    } (b);
  };

  const Functional = {
    log,
    valuesIterObj, reverseIter,
    reduce, go
  };

  window.Functional = Functional;
} ();
