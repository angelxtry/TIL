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

const recursive = (arr, i, acc, stack) => {
  if (i < arr.length) {
    if (Array.isArray(arr[i])) {
      stack.push({ arr, i, acc });
      return recursive(arr[i], 0, "", stack);
    }
    else return recursive(arr, i + 1, acc + `,${el.stringify(arr[i])}`, stack);
  } else {
    if (stack.length > 0) {
      const parent = stack.pop();
      return recursive(parent.arr, parent.i + 1, parent.acc + `,[${acc.substring(1)}]`, stack);
    } else {
      return `[${acc.substring(1)}]`;
    }
  }
};

const stringifyUsingWhile = arr => {
  let acc = "", i = 0, stack = [];
  while(true) {
    while (i < arr.length) {
      if (Array.isArray(arr[i])) {
        stack.push({ arr, i, acc });
        arr = arr[i];
        i = 0;
        acc = "";
      } else {
        arr = arr;
        acc = acc + `,${el.stringify(arr[i])}`;
        i = i + 1;
      }
    }
    if (stack.length > 0) {
      const parent = stack.pop();
      arr = parent.arr;
      i = parent.i + 1;
      acc = parent.acc + `,[${acc.substring(1)}]`;
    } else {
      break;
    } 
  }
  return `[${acc.substring(1)}]`;
}

const stringify = arr => {
  if(!Array.isArray(arr)) throw "invalid arr";
  // return recursive(arr, 0, "", []);
  return stringifyUsingWhile(arr);
};

const array = [1, 2, [1, ["ab\"c"], 1], "abc", [3, 4]];
console.log(JSON.stringify(array));
console.log(stringify(array));
