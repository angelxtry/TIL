# Reverse polish notation calculator

문제 설명이 길다. 바로 예제를 보자.

## Example

```py
def test_calc():
    """ find_next_square test """
    assert solve.calc('') == 0
    assert solve.calc('3') == 3
    assert solve.calc('3.5') == 3.5
    assert solve.calc('3.5 4 +') == 7.5
    assert solve.calc('3 4 -') == -1
    assert solve.calc('3 4 5 + +') == 12
    assert solve.calc('3 4 5 - +') == 2
    assert solve.calc('3 4 9 - +') == -2
    assert solve.calc('3 4 *') == 12
    assert solve.calc('3 4 2 * *') == 24
    assert solve.calc('2 4 /') == 0.5
    assert solve.calc('10 2 4 / *') == 5
    assert solve.calc('5 1 2 + 4 * + 3 -') == 14

```

내가 작성한 코드

```py
def calc(expr):
    if expr == '':
        return 0

    numbers = []
    for elem in expr.split():
        if elem not in "+-*/":
            numbers.append(float(elem) if '.' in elem else int(elem))
        else:
            second = numbers.pop()
            first = numbers.pop()
            if elem == '+':
                numbers.append(first + second)
            elif elem == '-':
                numbers.append(first - second)
            elif elem == '*':
                numbers.append(first * second)
            elif elem == '/':
                numbers.append(first / second)

    return numbers[0]
```

문제는 그다지 어렵지 않게 풀었지만 코드가 지저분하다.
좀 더 예쁜 코드를 보자.

```py
import operator


def best_solve1(expr):
    OPERATOR = {
        '+': operator.add, '-': operator.sub,
        '*': operator.mul, '/': operator.truediv
        }
    stack = [0]
    for token in expr.split():
        if token in OPERATOR:
            op2, op1 = stack.pop(), stack.pop()
            stack.append(OPERATOR[token](op1, op2))
        else:
            stack.append(float(token))
    return stack.pop()
```

operator package를 사용했다. 생각해보니 magic method를 사용할 수도 있겠다.
지저분한 if chain 대신에 dictionary를 사용해서 코드가 더 깔끔해졌다.
stack 배열에 초기값 0을 넣어 expr이 빈 문자열일 경우를 처리하도록 했다.

다른 코드를 하나 더 보자.

```py
def best_solve2(expr):
    OPERATOR = ['+', '-', '*', '/']
    stack = []
    for token in expr.split():
        if token in OPERATOR:
            op2, op1 = stack.pop(), stack.pop()
            stack.append(str(eval(op1 + token + op2)))
        else:
            stack.append(token)
    return eval(stack[0]) if stack else 0
```

기본적인 방향은 비슷하다. 이 코드는 eval을 사용하여 문자열을 수식으로 변환했다.

stack 배열에 계속 str을 넣어 관리하는 것에 주의해야 한다. 그래서 최종 결과를 return 할 때도 eval()이 필요하다. eval()을 사용한 것이 신기해서 살펴봤지만 best_solve1 코드가 더 깔끔하다.
