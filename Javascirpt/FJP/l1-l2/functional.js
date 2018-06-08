const collIter = coll =>
  coll.constructor == Object ?
    valuesIter(coll) : coll[Symbol.iterator]();

function *valuesIter(obj) {
  for (const k in obj) yield obj[k];
}

function *entriesIter(obj) {
  for (const k in obj) yield [k, obj[k]];
}

function *reverseIter(arr) {
  let l = arr.length;
  while(l--) yield arr[l];
}

function incSel(obj, k) {
  obj[k] ? obj[k]++ : obj[k] = 1;
  return obj;
}

const countBy = (f, coll) =>
  reduce((counts, a) => incSel(counts, f(a)), coll, {});


function pushSel(parent, k, v) {
  (parent[k] || (parent[k] = [])).push(v);
  return parent; 
}

const groupBy = (f, coll) =>
  reduce((group, a) => pushSel(group, f(a), a), coll, {});

const identity = a => a;

const count = coll => countBy(identity, coll);

const then1 = f => a => a instanceof Promise ? a.then(f) : f(a);
const then2 = (f, a) => a instanceof Promise ? a.then(f) : f(a);
const thenR = (a, f) => a instanceof Promise ? a.then(f) : f(a);
// 첫 번째 인자로 함수를 쓴다.
// acc: 누적할 값
// reduce는 가지고 있는 모든 값을 순회하고자 할때 사용한다.
function reduce(f, coll, acc) {
  return then2(function(coll) {
    const iter = collIter(coll);
    acc = acc === undefined ? iter.next().value : acc;
    return then2(function recur(acc) {
      for (const v of iter) {
        acc = f(acc, v);
        if (acc instanceof Promise) return acc.then(recur);
      }
      return acc;
    }, acc);
  }, coll);
}
// reduce의 초기값
// reduce의 초기값이 없다면 모든 데이터의 형이 같고 리턴값의 형도 같다.
// reduce의 초기값이 있다면 데이터의 형이 다를 수 있고 리턴값의 형도 다를 수 있다. 

function map(f, coll) {
  return reduce(
    (res, a) => thenR(f(a), b => push(res, b)),
    coll,
    []);
}

console.log( map(a => a + 10, [1, 2, 3]));

// find -> 명령형의 break를 쓸 때
(async function() {
  console.log(
    await reduce((a, b) => a + b, Promise.resolve([1, 2, 3]))
  );
}) ();

reduce((a, b) => a + b, Promise.resolve([1, 2, 3, 4])).then(console.log)

console.log(
  reduce((a, b) => a + b, [1, 2, 3])
);

reduce((a, b) => Promise.resolve(a + b), [10, 20, 30]).then(console.log);
reduce((a, b) => Promise.resolve(a + b), Promise.resolve([10, 20, 30])).then(console.log);

reduce(
  (a, b) => Promise.resolve(a + b),
  Promise.resolve([10, 20, 30]),
  Promise.resolve(10))

  .then(console.log);

// console.log(
//   reduce((acc, a) => acc + a, [1, 2, 3], 0)
// );
// console.log(
//   reduce((acc, a) => acc + a, new Set([1, 2, 3]), 0)
// );
// console.log(
//   reduce((acc, a) => acc + a, [1, 2, 3])
// );
// console.log(
//   reduce((acc, a) => acc + a, { a: 1, b: 2, c: 3})
// );
// console.log(
//   reduce((a, b) => a - b, [1, 2, 3, 4])
// );
// console.log(
//   reduce((a, b) => a - b, reverseIter([1, 2, 3, 4]))
// );

// const posts = [
//   { id: 1, body: '내용1', comments: [{}, {}] },
//   { id: 2, body: '내용2', comments: [{}] },
//   { id: 3, body: '내용3', comments: [{}, {}, {}] },
// ];

// // 모든 posts를 통해서 comments의 총 수를 얻어주세요.
// console.log(
//   reduce((count, p) => count + p.comments.length, posts, 0)
// )

// // const bvalues = (obj, key) => obj[key];
// // const map = (f, list) => f(list);
// // reduce((a, b) => a + b, map(bvalue('comments'), posts), 0);

// const users = [
//   { id: 1, name: 'name1', age: 30 },
//   { id: 2, name: 'name2', age: 31 },
//   { id: 3, name: 'name3', age: 32 },
//   { id: 4, name: 'name4', age: 31 },
//   { id: 5, name: 'name5', age: 32 },
// ];


// console.log(
//   reduce((group, u) => {
//     (group[u.age] || (group[u.age] = [])).push(u);
//     return group
//   }, users, {})
// );

// console.log(
//   reduce((counts, u) => incSel(counts, u.age), users, {})
// );

// console.log(
//   countBy(u => u.age, users)
// );

// console.log(groupBy(u => u.age, users));

// console.log(count([1, 1, 2, 3, 4, 4, 5, 5, 5]));





