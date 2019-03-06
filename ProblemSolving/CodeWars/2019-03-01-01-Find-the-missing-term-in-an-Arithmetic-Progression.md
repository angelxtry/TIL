# Find the missing term in an Arithmetic Progression

Arithmetic Progression은 일정한 차이가 있는 숫자들의 집합이다.
숫자 집합에서 한 개의 숫자가 누락되었다. 첫 번째와 마지막 숫자는 아니다.
누락된 숫자를 찾아라.

## Example

```py
def test_find_missing():
    """ find_missing test """
    assert solve.find_missing([1, 3, 4, 5]) == 2
    assert solve.find_missing([1, 2, 4, 5]) == 3
    assert solve.find_missing([1, 2, 3, 5]) == 4
    assert solve.find_missing([1, 3, 7, 9]) == 5
    assert solve.find_missing([0, 10, 15, 20, 25]) == 5
```

## 내가 작성한 코드

```py
def find_missing(sequence):
    diffs = [sequence[i + 1] - sequence[i] for i in range(3)]
    for n in diffs:
        if diffs.count(n) >= 2:
            diff = n
            break

    for i in range(len(sequence)):
        if sequence[i + 1] - sequence[i] != diff:
            return sequence[i] + diff
```

첫 번째는 정상적인 숫자라고 했으니 초반 4개의 항목만 확인하면 된다고 생각했다. 그래서 차이를 구하여 전체 sequence를 순회하면서 누락된 숫자를 찾았다.

```py
def best_solve1(seq):
    return (seq[-1] + seq[0]) * (len(seq) + 1) / 2 - sum(seq)
```

이런 방법이 있을거라고는 상상도 못했다. 꽤나 충격적이다.

```py
def best_solve2(seq):
    diff = (seq[-1] - seq[0]) / len(seq)
    for prev, next in enumerate(seq[1:]):
        if next - seq[prev] != diff:
            return next - diff
```

첫 번째, 마지막 항목은 누락된 숫자가 아니라고 문제에서 주어진 것 자체가 힌트였다. 차이를 구하는 방식이 효율적이다.
