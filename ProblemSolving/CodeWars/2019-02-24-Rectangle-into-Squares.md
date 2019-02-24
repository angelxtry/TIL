# Rectangle into Squares

사각형의 가로, 세로를 인자로 받아 어떤 정사각형이 몇개 들어가는지 찾는다.

5, 4를 인자로 받았다면 `4*4` 정사각형 하나, `1*1` 정사각형이 4개 들어갈 수 있다.

이 경우 [4, 1, 1, 1, 1]을 반환한다.

## Example

```py
def test_sqInRect():
    """ find_next_square test """
    assert solve.sqInRect(5, 3) == [3, 2, 1, 1]
    assert solve.sqInRect(5, 4) == [4, 1, 1, 1, 1]
    assert solve.sqInRect(5, 5) is None
    assert solve.sqInRect(5, 6) == [5, 1, 1, 1, 1, 1]
    assert solve.sqInRect(5, 7) == [5, 2, 2, 1, 1]
    assert solve.sqInRect(3, 7) == [3, 3, 1, 1, 1]
    assert solve.sqInRect(70, 4) == [4, 4, 4, 4, 4, 4,
                                     4, 4, 4, 4, 4, 4,
                                     4, 4, 4, 4, 4, 2, 2]
```

내가 작성한 코드

```py
import math


def sqInRect(lng, wdth):
    if lng == wdth:
        return None
    area = lng * wdth
    result = []
    if lng > wdth:
        minimum, maximum = wdth, lng
    else:
        minimum, maximum = lng, wdth

    while area > 3:
        root = math.floor((area) ** 0.5)
        root = root if root < minimum else minimum
        result.append(root)
        area -= root ** 2
        maximum -= root
        if minimum > maximum:
            minimum, maximum = maximum, minimum
    if area <= 3:
        for _ in range(area):
            result.append(1)
    return sorted(result, reverse=True)
```

코드에 if가 계속 들어가고 쓸데없이 길어지는 느낌이 들때부터 뭔가 잘못되어가고 있다는 것을 느꼈다.

best practice를 보니 내 코드가 부끄럽다. 잘못된 접근이었다.

부끄럽지만 기록해둔다.

```py
def best_practice1(lng, wdth):
    if lng == wdth:
        return None
    if lng > wdth:
        wdth, lng = lng, wdth
    result = []
    while wdth != lng:
        result.append(lng)
        wdth -= lng
        if lng > wdth:
            wdth, lng = lng, wdth
    result.append(lng)
    return result
```

위 코드처럼 가로, 세로 길이만을 비교하여 큰 것에서 작은 것을 빼는 것만으로 풀 수 있는 문제였다.

다음과 같이 코드를 더 줄일 수도 있다.

```py
def best_practice2(lng, wdth):
    if lng == wdth:
        return None
    result = []
    while wdth != lng:
        wdth, lng = sorted([wdth, lng])
        result.append(wdth)
        wdth, lng = wdth, lng - wdth
    result.append(wdth)
    return result
```
