// let acc = 0;
// for (let i = 1; i <= 10; i++) acc += i;
// console.log(acc);

// const sum = v => v > 1 ? v + sum(v - 1) : 1;
// console.log(sum(10));

const _sum = (v, acc) => v > 0 ? _sum(v - 1, acc + v) : acc;
const sum = v => _sum(v, 0)

// const sum = (v, acc = 0) => {
//   if (v > 0) return sum(v - 1, acc + v)
//   return acc;
// }
console.log(sum(10));

// const array = [...Array(100000).fill(1)]
// const array = [];

// const sumUsingRecur = (arr, i = 0) => {
//   if (arr.length > i) return 0;
//   return arr[i] + sumUsingRecur(arr, i + 1);
// }

// const sumUsingTail = (arr, i = 0, acc = 0) => {
//   if (arr.length > i) return acc;
//   return sumUsingTail(arr, acc + arr[i], i + 1)
// }

// const sumUsingFor = (arr) => {
//   let acc = 0;
//   const length = arr.length;
//   for (let i = 0; i < length; i++) {
//     acc += arr[i];
//   }
//   return acc;
// }

// // console.log(sumUsingRecur(array));
// // console.log(sumUsingTail(array));
// console.log(sumUsingFor(array));
// console.log(array.length);
