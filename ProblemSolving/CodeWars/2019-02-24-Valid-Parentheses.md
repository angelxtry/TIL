# Valid Parentheses

괄호의 열고 닫는 것이 정상인지 확인한다.

## Example

```py
def test_valid_parentheses():
    """valid_parentheses test"""

    assert solve.valid_parentheses("  (") is False
    assert solve.valid_parentheses(")test") is False
    assert solve.valid_parentheses("") is True
    assert solve.valid_parentheses("hi())(") is False
    assert solve.valid_parentheses("hi(hi)()") is True
```

내가 작성한 코드

```py
def valid_parentheses(string):
    chs = [ch for ch in string]
    left_parentheses = 0
    for ch in chs:
        if ch == '(':
            left_parentheses += 1
        if ch == ')':
            left_parentheses -= 1
        if left_parentheses < 0:
            return False
    if left_parentheses == 0:
        return True
    else:
        return False
```

이번 문제도 쉬웠다.

하지만 best solve를 보니 내 코드에는 군더더기가 너무 많았다.

Python의 기본 문법이 탄탄하지 않고, Python 다운 코드를 만드는 실력이 부족한 것 같다.

더 노력하자.

```py
def best_solve(string):
    count = 0
    for ch in string:
        if ch == '(':
            count += 1
        if ch == ')':
            count -= 1
        if count < 0:
            return False
    return True if count == 0 else False
```

마지막 return 코드를 다음과 같이 작성하면 더 단순해진다.

```py
return count == 0
```
