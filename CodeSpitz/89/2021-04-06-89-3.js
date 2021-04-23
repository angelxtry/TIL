const stringCheck = {
  data: [[/[\r\l\n]/g, "\\n"], [/"/g, "\\\""], [/\t/g, "\\t"]],
  convert(v) {
    return this.data.reduce((acc, curr) => acc.replace(curr[0], curr[1]), v);
  }
};
const el = {
  data: {
    number: v => v.toString(),
    boolean: v => v.toString(),
    string: v => `"${stringCheck.convert(v)}"`,
    // array: v => v,
  },
  stringify(v) {
    return this.data[typeof v]?.(v) ?? "null";
    // return (this.data[typeof v] ?? this.data[!v ? "null" : Array.isArray(v) ? "array" : "object"])?.(v) ?? "null";
  },
};

const EMPTY = {};

// const recursive = (arr, acc, i) => i < arr.length
//   ? recursive(arr, acc + `,${el.stringify(arr[i])}`, i + 1)
//   : `[${acc.substring(1)}]`;


const resultProcess = {
  data: {
    "true": arr => "[]",
    "false": arr => {
      let acc = "", i = 0;
      while(i < arr.length) {
        acc = acc + `,${el.stringify(arr[i])}`;
        i = i + 1;
      }
      return `[${acc.substring(1)}]`;
    },
  },
  process(arr) {
    return this.data[arr.length == 0](arr);
  }
};

const recursive = (arr, i, acc, stack) => {
  if (i > arr.length - 1) {
    if (stack.length < 1) {
      return `[${acc.substring(1)}]`;
    } else {
      const p = stack.pop();
      return recursive(p.arr, p.i + 1, p.acc + `,[${acc.substring(1)}]`, stack);
    }
  } else {
    if (Array.isArray(arr[i])) {
      stack.push({ arr, i, acc });
      return recursive(arr[i], 0, "", stack);
    }
    else return recursive(arr, i + 1, acc + `,${el.stringify(arr[i])}`, stack);
  }
};

const stringify = arr => {
  if(!Array.isArray(arr)) throw "invalid arr";
  // return resultProcess.process(arr);
  return recursive(arr, 0, "", [])
};

const array = [1, [4, 5, "a\"bc"], 6, [4, 5, ["a\"bc"]]];
// const array = [1, 2, 3, "a\"bc", [4, 5, "a\"bc"], 6, [7]];
// const array = [[1]];
console.log(JSON.stringify(array))
console.log(stringify(array));
// console.log(el.stringify([[4, 5, "a\"bc"]]))
// const ttt = '';