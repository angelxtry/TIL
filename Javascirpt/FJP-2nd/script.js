const log = a => console.log(a);

// const apply1 = f => f(1);
// const add2 = a => a + 2;
// log(add2)
// log(apply1(add2));

// const times = (f, n) => {
//   let i = -1;
//   while (++i < n) f(i);
// };
// times(log, 3);
// times(a => log(a + 10), 3);

const arr = [1, 2, 3];
for (const a of arr) console.log(a);

const set = new Set([1, 2, 3]);
for (const a of set) console.log(a);

const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
for (const a of map) console.log(a);

log(arr[Symbol.iterator]);
log(set[Symbol.iterator]);
log(map[Symbol.iterator]);

values() { [native code] }
values() { [native code] }
entries() { [native code] }