// const recursive = (list, index = 0, acc = 0) => {
//   if(!Array.isArray(list)) return 0;
//   if(typeof list[index] !== "number") return acc;
//   return recursive(list, index, acc + list[index]);
// };

// const recursive1 = (list, index = 0, acc = 0) => {
//   if(!Array.isArray(list)) throw `invalid list ${list}`;
//   if(typeof list[index] !== "number") throw `invalid element ${list}: ${list[index]}`;
//   return recursive(list, index, acc + list[index]);
// };

// try {
//   recursive1([1, 2, 3]);
// } catch (e) {
//   console.log(e);
// }

// const listValidator = list => Array.isArray(list) || typeof list === "number";
// const elementValidator = v => typeof v === "number";

// const recursive2 = (list, index = 0, acc = 0) => {
//   if(!listValidator(list)) throw `invalid list ${list}`;
//   if(!elementValidator(list[index])) throw `invalid element ${list}: ${list[index]}`;
//   return recursive2(list, index, acc + list[index]);
// };

// // const validator = (list, el) => Boolean;

// const listValidator = (list, el) => Array.isArray(list) || typeof list === "number";
// const elementValidator = (list, el) => typeof el === "number";

// const validator = [
//   (list, el) => Array.isArray(list) || typeof list === "number",
//   (list, el) => typeof el === "number",
// ]

// const recursive3 = (list, index = 0, acc = 0) => {
//   if (!validator.every(vali => vali(list, list[index]))) throw 'input list error';
//   return recursive3(list, index + 1, acc + list[index]);
// }

const validator = {
  data: [
    (list, el) => Array.isArray(list) || typeof list === "nubmer",
    (list, el) => typeof el === "number",
  ],
  validate(list, index) {
    return this.data.every(vali => vali(list, list[index]));
  }
};

const recursive4 = (list, index = 0, acc = 0) => {
  if (!validator.validate(list, index)) throw 'index error';
  return recursive4(list, index + 1, acc + list[index]);
};

// const _sum = (arr, i, acc) => {
//   if (arr.length === i) return 0;
//   return _sum(arr, i + 1, acc + arr[index]);
// };

// const sum = list => _sum(arr, 0, 0);

// let sum;
// {
//   const _sum = (arr, i, acc) => {
//     if (arr.length === i) return 0;
//     return _sum(arr, i + 1, acc + arr[index]);
//   };

//   sum = list => _sum(arr, 0, 0);
// }

const arraySum = (() => {
  const elementSum = (arr, i, acc) => {
    if (arr.length === i) return 0;
    return elementSum(arr, i + 1, acc + arr[index]);
  };
  const arraySum = elementSum(arr, 0, 0);
  return arraySum;
})();

const arraySum = arr => {
  const elementSum= (arr, i, acc) => {
    if (arr.length === i) return 0;
    return elementSum(arr, i + 1, acc + arr[index]);
  };
  return elementSum(arr, 0, 0);
}


const _tail = (arr, i, acc) => i > 0 ? _tail(arr, i - 1, arr[i] + acc) : (arr[0] || 0) + acc;

const tail = arr => _tail(arr, 0, 0);

