함수형 프로그래밍

함수 개념을 가장 우선순위에 ㄷ놓는다.

함수형 사고방식은 동사 위주로

순수함수 vs. 순수함수가 아닌 함수

순수함수를 추구한다.

```js
/* 순수함수 */
function add(a, b){
    return a+ b;
}

/* 다시 순수 함수 */
function add3(obj, b){
    return obj+val + b;
}

/* 객체를 리턴하는 순수함수 */
function add4(obj, obj2){
    return { val: obj.val + obj2.val };
}

console.log( add4(obj1, { val: 10 } ) );

obj1 = add4(obj1, {val: 10});

/* add_maker */

```