
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
  },
  stringify(v) {
    return this.data[typeof v]?.(v) ?? "null";
  },
};

const recursive = (arr, i, acc, stack) => {
  if (i > arr.length - 1) {
    if (stack.length < 1) {
      return `[${acc.substring(1)}]`;
    } else {
      const parent = stack.pop();
      return recursive(parent.arr, parent.i + 1, parent.acc + `,[${acc.substring(1)}]`, stack);
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
  return recursive(arr, 0, "", [])
};

const array = [1, [4, 5, "a\"bc"], 6, [4, 5, ["a\"bc"]]];
console.log(JSON.stringify(array))
console.log(stringify(array));