# Split Strings

인자로 받은 문자열을 2개씩 잘라서 list를 반환한다. 문자열의 길이가 홀수일 경우 마지막 문자에 '_'를 붙인다.

## Example

```py
def test_solution():
    assert solve.solution('abcd') == ['ab', 'cd']
    assert solve.solution('abcde') == ['ab', 'cd', 'e_']
    assert solve.solution('') == []
    assert solve.solution('a') == ['a_']
```

## 내가 작성한 코드

```py
def solution(s):
    result = []
    while s:
        c = s[:2]
        result.append(c) if len(c) == 2 else result.append(c + '_')
        s = s[2:]
    return result
```

별로 설명할 내용은 없다.

```py
def best_solve1(s):
    if len(s) % 2:
        s = s + '_'
    return [s[i:i + 2] for i in range(0, len(s), 2)]
```

i를 사용하지 않는 방법은 없나?
