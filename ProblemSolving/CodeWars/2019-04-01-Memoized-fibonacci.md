# Memoized Fibonacci

fibonacci 수열은 [0, 1]부터 시작하여 마지막 두 수를 더하는 수열이다.

[0, 1, 1, 2, 3, 5, 8, 13, 21, ...]

다음과 같은 fibonacci 수열을 구하는 함수를 memoization을 이용하여 개선하라.

```py
def fibonacci(n):
    if n in [0, 1]:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
```

이번 문제는 통과하지 못했다. memoization을 잘못생각했다.

## 내가 작성한 코드

```py
def fibonacci(n):
    fib = [0, 1]
    if n in fib:
        return n
    for _ in range(n - 1):
        fib.append(fib[-1] + fib[-2])
    return fib[-1]
```

이렇게 하면 값을 구해지지만 계산 시간이 너무 오래 걸리는지 timeout이 발생했다.

몇 번 시도하다가 solution을 봤다.

## best solution

```py
cache = {0: 1, 1: 1}

def fibonacci(n):
    if n not in cache:
        cache[n] = fibonacci(n-1) + fibonacci(n-2)
    return cache[n]
```

당황스럽게도 위 코드가 테스트를 통과했다.

난 함수를 벗어나면 안된다고 생각했는데 memoization 관련 문제에서는 그렇지 않은 것 같다.
