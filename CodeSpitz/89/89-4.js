const obj = { a: 1, b: true, c: '3' };
console.log(JSON.stringify(obj));

const stringCheck = {
  data: [[/[\r\l\n]/g, "\\n"], [/"/g, "\\\""], [/\t/g, "\\t"]],
  convert(v) {
    return this.data.reduce((acc, curr) => acc.replace(curr[0], curr[1]), v);
  },
};
const el = {
  data: {
    number: v => v.toString(),
    boolean: v => v.toString(),
    string: v => `"${stringCheck.convert(v)}"`,
  },
  stringify(v) {
    return this.data[typeof v]?.(v) ?? "null";
  },
};

// 문자열을 이용한 재귀
const recurString= (obj, acc, i) => {
  const array = Object.entries(obj);
  if (array.length === 0) return '{}';
  if (i < array.length) {
    return recurString(obj, acc + `,"${array[i][0]}":${el.stringify(array[i][1])}`, i + 1);
  } else {
    return `{${acc.substring(1)}}`
  }
};
const stringifyString = obj => recurString(obj, "", 0);
console.log('stringifyString: ', stringifyString(obj));


// 배열을 이용한 재귀
const arrayToString = acc => {
  let accStr = "";
  for (const v of acc) {
    accStr += `,"${v[0]}":${el.stringify(v[1])}`
  }
  return `{${accStr.substring(1)}}`
};

const recurArray = (obj, acc, i) => {
  if (obj.constructor !== Object) throw "Not Object type."
  const array = Object.entries(obj);
  if (i < array.length) {
    acc.push(array[i])
    return recurArray(obj, acc, i + 1);
  } else {
    return arrayToString(acc);
  }
};
const stringifyArray = obj => recurArray(obj, [], 0);
console.log('stringifyArray: ', stringifyArray(obj));


// stack을 사용하지 않고 재귀
const nodesToString = finalNode => {
  let accStr = "", curr = finalNode;
  do {
    const v = curr.value;
    accStr = `,"${v[0]}":${el.stringify(v[1])}` + accStr;
   } while (curr = curr.prev);
  return `{${accStr.substring(1)}}`
};

const recurLinkedList = (obj, acc, i) => {
  if (obj.constructor !== Object) throw "Not Object type."
  const array = Object.entries(obj);
  if (i < array.length) {
    return recurLinkedList(obj, {prev: acc, value: array[i]}, i + 1);
  } else {
    return nodesToString(acc);
  }
};
const stringifyLinkedList = obj => recurLinkedList(obj, null, 0);
console.log('stringifyLinkedList: ', stringifyLinkedList(obj));


// coroutine 재귀
const recurCoroutine = (iter, acc) => {
  const {done, value} = iter.next();
  if (done) {
    return nodesToString(acc);
  } else {
    return recurCoroutine(iter, {prev: acc, value });
  }
};

const objEntries = function*(obj){
  for(const k in obj) if(obj.hasOwnProperty(k)) yield [k, obj[k]];
};

const stringifyCoroutine = obj => {
  if (obj.constructor !== Object) throw "Not Object type."
  const iter = objEntries(obj);
  return recurCoroutine(iter, null);
};

console.log('stringifyCoroutine: ', stringifyCoroutine(obj));


// 재귀를 loop로 변경
const whileLoop = (iter, acc) => {
  while(true) {
    const {done, value} = iter.next();
    if (done) {
      return nodesToString(acc);
    } else {
      acc = {prev: acc, value };
    }
  }
};

const stringifyLoop = obj => {
  if (obj.constructor !== Object) throw "Not Object type."
  const iter = objEntries(obj);
  return whileLoop(iter, null);
};

console.log('stringifyLoop: ', stringifyLoop(obj));



console.log('[] instanceof Object', [] instanceof Object)
console.log('[].constructor === Object', [].constructor === Object)
console.log('{}.constructor === Object', {}.constructor === Object)
console.log('function.constructor === Function', (function(){}).constructor === Function)
// console.log(stringify(obj))

console.log('Object.entries: ', Object.entries(obj));



// const arrToString = finalNode => {
//   let accStr = "";
//   const arr = [];
//   let curr = finalNode;
//   do{
//     arr.unshift(curr.value)
//   } while(curr = curr.prev);
//   for (const v of arr) accStr += ',' + v;
//   return "[" + accStr.substring(1) + "]";
// };

// const elementToString = v => "" + v;

// const recursive = (arr, acc, i, prev) => {
//   if (i < arr.length) {
//     if (Array.isArray(arr[i])) {
//       return recursive(arr[i], null, 0, [arr, acc, i + 1, prev]);
//     } else {
//       return recursive(arr, {prev: acc, value: elementToString(arr[i])}, i + 1, prev);
//     }
//   } else {
//     const accStr = arrToString(acc);
//     if (prev) {
//       const [prevArr, prevAcc, prevIndex, prevPrev] = prev;
//       return recursive(prevArr, {prev: prevAcc, value: accStr}, prevIndex, prevPrev);
//     } else {
//       return accStr;
//     }
//   }
// }

// const stringify = arr => recursive(arr, null, 0, null);
// console.log(stringify([1, 2, 3, [4], [5, [6], [7, [8]]]]));

// const whileLoop = array => {
//   let arr = array, acc = null, i = 0, prev = null;
//   while(true) {
//     if (i < arr.length) {
//       if (Array.isArray(arr[i])) {
//         prev = [arr, acc, i + 1, prev];
//         arr = arr[i];
//         acc = null;
//         i = 0;
//       } else {
//         prev = prev;
//         arr = arr;
//         acc = {prev: acc, value: elementToString(arr[i])};
//         i = i + 1;
//       }
//     } else {
//       const accStr = arrToString(acc);
//       if (prev) {
//         const [prevArr, prevAcc, prevIndex, prevPrev] = prev;
//         prev = prevPrev;
//         arr = prevArr;
//         acc = {prev: prevAcc, value: accStr};
//         i = prevIndex;
//       } else {
//         return accStr;
//       }
//     }
//   }
// }

// console.log(whileLoop([1, 2, 3, [4], [5, [6], [7, [8]]]]));


// const arrToString = acc => {
//   let accStr = "";
//   for (const v of acc) accStr += ':' + v;
//   return "(" + accStr.substring(1) + ")";
// };

// const table = {
//   array: (v, arr, acc, i, stack) => {
//     stack.push([arr, acc, i + 1]);
//     return [arr[i], [], 0];
//   },
//   number: (v, arr, acc, i, stack) => {
//     acc.push("" + v);
//     return [arr, acc, i + 1];
//   },
// };

// const elementProcess = (currEl, arr, acc, i, stack) =>
//   (table[typeof currEl] ?? table[!currEl ? "null" : Array.isArray(currEl) ? "array" : "object" ])?.(currEl, arr, acc, i, stack) ?? "null";

// const recursive = (arr, acc, i, stack) => {
//   if (i < arr.length) {
//     const [resultArr, resultAcc, resultIndex] = elementProcess(arr[i], arr, acc, i, stack);
//     return recursive(resultArr, resultAcc, resultIndex, stack);
//   } else {
//     const accStr = arrToString(acc);
//     const prev = stack.pop();
//     if (prev) {
//       const [prevArr, prevAcc, prevIndex] = prev;
//       prevAcc.push(accStr);
//       return recursive(prevArr, prevAcc, prevIndex, stack);
//     } else {
//       return accStr;
//     }
//   }
// };

// console.log(typeof []);

// const stringify = arr => recursive(arr, [], 0, []);

// console.log(stringify([1, 2, 3, [4], [5, [6], [7, [8]]]]));