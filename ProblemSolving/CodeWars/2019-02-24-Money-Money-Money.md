# Money, Money, Money

principal, interest, tax, desired을 인자로 받는다.

이자는 복리로 계산되고 tax는 이자에만 계산된다.

principal이 desired보다 커지려면 몇 년이 걸리는지 구하라.

## Example

```py
def test_caculate_years():
    """caculate_years test"""
    assert solve.calculate_years(1000, 0.05, 0.18, 1100) == 3
    assert solve.calculate_years(1000, 0.01625, 0.18, 1200) == 14
    assert solve.calculate_years(1000, 0.05, 0.18, 1000) == 0
```

내가 작성한 코드

```py
def calculate_years(principal, interest, tax, desired):
    total_sum = principal
    year = 0
    while desired > total_sum:
        year = year + 1
        total_sum = total_sum + \
            (total_sum * interest) - (total_sum * interest * tax)
    return year
```

이번 문제는 너무 쉬웠다.

```py
def best_solve(principal, interest, tax, desired):
    total_sum = principal
    year = 0
    while desired > total_sum:
        year += 1
        total_sum += (total_sum * interest) * (1 - tax)
    return year
```

Python에서도 `+=` 연산자를 사용할 수 있구나. 왜 안된다고 생각하고 있었을까.

세금 처리하는 부분은 기억해두자. 세금을 따로 계산해서 빼는 게 아니라 `1 - tax` 를 곱하는 것으로 간단하게 처리했다.
