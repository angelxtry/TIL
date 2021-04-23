var stringifyJSON = function(obj) { 
  // 재귀함수로 사용하기 위해 반복되는 데이터 타입 확인
  if(typeof obj === 'number' || obj === null || typeof obj === 'boolean') {
    return '' + obj;
  } else if(typeof obj === 'string') {
    return '"' + obj + '"';
  }
  var bin = [];
  if(Array.isArray(obj)) {
    if(obj.length === 0) {
      return '[]';
    } else {
      for(var i = 0; i < obj.length; i++) {
        if(typeof obj[i] === 'string') {
          var str = stringifyJSON(obj[i]);
          bin.push(str);
        } else if(Array.isArray(obj[i])) {
          var arr = stringifyJSON(obj[i]);
          bin.push(arr);
        } else if(typeof obj[i] === 'number') {
          bin.push(obj[i]);
        } else {
          var ifObj = stringifyJSON(obj[i]);
          bin.push(ifObj);
        }
      }
      return '[' + bin + ']';
    }
  } else { 
    var createdArr = [];
    if(Object.keys(obj).length === 0) { 
      return '{}';
    } else {
      for(var key in obj) {
        if(typeof obj[key] === 'string' || typeof obj[key] === 'boolean' || obj[key] === null) {
          var strKey = stringifyJSON(key);
          var strVal = stringifyJSON(obj[key]);
          var strArr = strKey + ':' + strVal;
          createdArr.push(strArr);
        } else if(Array.isArray(obj[key])) {
          var arrKey = stringifyJSON(key);
          var arrVal = stringifyJSON(obj[key]);
          var arrArr = arrKey + ':' + arrVal;
          createdArr.push(arrArr);
        } else if(typeof obj[key] === 'function' || obj[key] === undefined) {
          delete obj[key];
          stringifyJSON(obj);
        } else {
          var objKey = stringifyJSON(key);
          var objVal = stringifyJSON(obj[key]);
          var objObj = objKey + ':' + objVal;
          createdArr.push(objObj);
        }
      }
    }
    return '{' + createdArr + '}';
    }
  }; 
  