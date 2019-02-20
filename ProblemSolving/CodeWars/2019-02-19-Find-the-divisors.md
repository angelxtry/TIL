# Find the divisors

1보다 큰 숫자를 인자로 받아 약수를 list로 return한다.
list는 작은 숫자부터 정렬되어 있어야 한다.
소수일 경우 13 is prime를 return 한다.

Example

```txt
divisors(12); #should return [2,3,4,6]
divisors(25); #should return [5]
divisors(13); #should return "13 is prime"
```

```py
def divisors(integer):
    dividers = set()
    for i in range(2, integer):
        if i in dividers:
            continue

        div, mod = divmod(integer, i)
        if mod == 0:
            dividers.add(i)
            dividers.add(div)

    return sorted(list(dividers)) if dividers else f"{integer} is prime"
```

set을 하나 만들어 놓고 약수가 발견될 때마다 두 값을 set에 저장하여 계산 횟수를 줄이려고 시도했다. 결과를 return 할 때 list로 변환하고 정렬했다. 모든 테스트 통과!

```py
def divisors(integer):
    dividers = set()
    for i in range(2, int(integer ** 2) + 1):
        div, mod = divmod(integer, i)
        if mod == 0:
            dividers.add(i)
            dividers.add(div)

    return sorted(list(dividers)) if dividers else f"{integer} is prime"
```

best practice를 찾아보니 