# Find the divisors

1보다 큰 숫자를 인자로 받아 약수를 list로 return한다.
list는 작은 숫자부터 정렬되어 있어야 한다.
소수일 경우 '해당 소수 is prime'을 return 한다.

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

best practice를 찾아보니 나와 비슷하게 만든 코드가 있었는데 훨씬 더 효율적이었다.

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

나는 set()에 이미 값이 포함되어 있는지 검사하는 로직을 넣었는데 위 코드는 아예 정수를 반으로 잘라버려서 set()에서 중복값을 검색할 필요도 없다.

실행 시간은 훨씬 더 느리지만 코드 자체가 깔끔한 풀이도 있었다.

```py
def divisors(integer):
    divs = [i for i in range(2, integer) if integer % i == 0]

    return divs if divs else f"{integer} is prime"
```
