// const a = [1, "ab\"c", true, undefined, null, _=>3, Symbol()];
// JSON.stringify(a)  === arrayStringify(a);
// 가 되도록 arrayStringify를 구현
// 재귀, 꼬리재귀, for 세버전

const _arrayStringify1 = (arr, i) => {
  const processElement = elem => {
    let result;
    if (typeof elem === "symbol" || typeof elem === "function" || typeof elem === "undefined" || elem === null) {
      result = "null"
    }
    else if (typeof elem === "string") {
      const processString = param => {
        const arr = param.split("");
        let str = "";
        for (let i = 0; i < arr.length; i = i + 1) {
          let temp = arr[i];
          if (temp === "\"") temp = "\\\"";
          str += temp;
        }
        return `"${str}"`;
      }
      result = processString(elem);
    } 
    else result = `${elem}`;
    if (i > 0 && i < arr.length) result = ',' + result;
    return `${result}`;
  }

  if (arr.length - 1 < i) return '';
  return processElement(arr[i]) + _arrayStringify1(arr, i + 1)
}

// 1. 오류와 실패의 관계 -오류는 중간요소의 내결합성 때문에 실패로 이어지지 않을 수 있다 : 오류가 최대한 빨리 실패로 이어지게 짜라. 컨텍스트에러가 더 무서우니까 -> 신뢰성, 안정성(컨텍스트에러발생이 올라감)
// 2. 코드의 분리 또는 정리 - 수정되는 원인에 따라 :: 변화율(변화율이 같은 애들끼리 코드를 모아라) 변화율의 원인->수정되는 이유
// 3. 자바스크립트 인터페이스란 함수의 이름 인자 반환값의 형식이 일치하는 경우
// 4. 인터페이스를 일치시키면 컬렉션으로 묶을 수 있다. -> 일종의 일반화 -> 서로 다른 형태인경우 인터페이스를 일치시켜 일반화를 한다.
// 5. 데이터와 데이터를 이용한 알고리즘이 이원화 되면 관리가 불가능->데이터를 소유한 쪽에서 데이터를 사용하는 알고리즘을 제공한다.
// 6. 꼬리최적화함수를 루프로 고칠때 기계적으로 고친다는 의미
// 7. 결국 루프는 클로저에만 의존하는 함수를 반복시키고, 재귀함수는 인자에만 의존하는 함수를 반복시킨다.
// 8. 반복되는 코드를 제거하기 위해 집착해라.

const a = [1, "ab\"c", true, undefined, null, _=>3, Symbol()];
console.log(JSON.stringify(a));

const validator = {
  data: [
    (list) => Array.isArray(list),
  ],
  validate(list) {
    return this.data.every(vali => vali(list));
  }
};

const stringify = {
  "symbol": _ => "null",
  "function": _ => "null",
  "string": param => {
    let str = "";
    for (let i = 0; i < param.length; i = i + 1) {
      let temp = param[i];
      if (temp === "\"") temp = "\\\"";
      str += temp;
    }
    return `"${str}"`;
  },
  "number": param => `${param}`,
  "boolean": param => `${param}`,
  "object": _ => "null",
  process(elem) {
    if (elem === null || typeof elem === "undefined") return "null";
    return this[typeof elem](elem);
  },
};

const _recursive = (arr, i) => {
  if (!validator.validate(arr)) throw `invalid argument: ${arr}`;
  const length = arr.length - 1;
  if (length < i) return '';
  let result = stringify.process(arr[i]);
  if (i < length) result += ',';
  return result + _recursive(arr, i + 1);
};

const arrayStringifyRecursive = arr => {
  return `[${_recursive(arr, 0)}]`;
};

const _tailRecursive = (arr, i, result) => {
  if (!validator.validate(arr)) throw `invalid argument: ${arr}`;
  const length = arr.length - 1;
  if (length < i) return result;
  result += stringify.process(arr[i]);
  if (i < length) result += ',';
  return _tailRecursive(arr, i + 1, result);
};

const arrayStringifyTail = arr => {
  return `[${_tailRecursive(arr, 0, '')}]`;
};

const _forloop = (arr) => {
  if (!validator.validate(arr)) throw `invalid argument: ${arr}`;
  let result = "";
  const length = arr.length - 1;
  for (let i = 0; i < length; i = i + 1) {
    result += stringify.process(arr[i]);
    if (i < length) result += ',';
  }
  result += stringify.process(arr[length]);
  return result;
};

const arrayStringify = arr => {
  return `[${_forloop(arr)}]`;
};

try {
  console.log(arrayStringifyRecursive(a));
} catch(e) {
  console.log(e);
}

try {
  console.log(arrayStringifyTail(a));
} catch(e) {
  console.log(e);
}

try {
  console.log(arrayStringify(a));
} catch(e) {
  console.log(e);
}
