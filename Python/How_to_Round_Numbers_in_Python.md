# How to Round Numbers in Python

2019-02-07

Python round() 함수는 두 개의 인자를 받는다.

숫자 n과 반올림 하기 위핸 ndigits.

ndigits는 default가 0이다. 즉, integer를 만든다.

```py
print(round(3.12345))

3
```

다음의 예제를 보자. 뭔가 이상하다.

```py
print(round(2.5))
2

print(round(1.5))
2
```

truncate 함수를 만들어보자. 1000을 곱한 후 int로 변환하고 다시 1000으로 나눈다. 소수점 3자리 이하 숫자를 버리는 함수다.

## decimal

```py
import decimal


if __name__ == '__main__':
    print(decimal.getcontext())

Context(
    prec=28,
    rounding=ROUND_HALF_EVEN,
    Emin=-999999,
    Emax=999999,
    capitals=1,
    clamp=0,
    flags=[],
    traps=[
        InvalidOperation,
        DivisionByZero,
        Overflow
    ]
)
```

decimal module의 default rounding strategy는 ROUND_HALF_EVEN이다.
이 전략은 built-in round 함수와 동일하다.

decimal ​module은 Decimal class를 사용하여 수를 표현한다. 숫자는 string으로 입력해야 한다.

```py
from decimal import Decimal


if __name__ == '__main__':
    zero_point_one = Decimal("0.1")
    print(zero_point_one)

0.1
```

```py
from decimal import Decimal


if __name__ == '__main__':
    zero_point_one = Decimal("0.1")

    print(0.1 + 0.1 + 0.1)
    print(zero_point_one + zero_point_one + zero_point_one)

0.30000000000000004
0.3
```

Decimal의 반올림은 quantize 메소드를 이용한다.

```py
from decimal import Decimal


if __name__ == '__main__':
    decimal_num = Decimal("1.65").quantize(Decimal("1.0"))
    print(decimal_num)

    decimal_num2 = Decimal("1.675").quantize(Decimal("1.00"))
    print(decimal_num2)

1.6
1.68
```

1.6은 ROUND_HALF_EVEN에서 오류가 아니다.

decimal.getcontext().prec attribute를 이용하여 산술연산을 할 때 반올림 위치를 지정할 수도 있다.

```py
import decimal
from decimal import Decimal


if __name__ == '__main__':
    decimal.getcontext().prec = 2
    print(Decimal("1.23") + Decimal("2.32"))

    decimal.getcontext().prec = 3
    print(Decimal("1.234") + Decimal("2.321"))

3.6
3.56
```

decimal.getcontext().rounding attribute를 이용하여 rounding strategy를 수정할 수 있다.

ROUND_CEILING은 숫자가 커지는 방향으로 올림한다.

```py
import decimal
from decimal import Decimal


if __name__ == '__main__':
    decimal.getcontext().rounding = decimal.ROUND_CEILING

    print(Decimal("1.32").quantize(Decimal("1.0")))
    print(Decimal("-1.32").quantize(Decimal("1.0")))

1.4
-1.3
```

ROUND_FLOOR는 숫자가 작아지는 방향으로 내림한다.

```py
from decimal import Decimal


if __name__ == '__main__':
    decimal.getcontext().rounding = decimal.ROUND_FLOOR

    print(Decimal("1.32").quantize(Decimal("1.0")))
    print(Decimal("-1.32").quantize(Decimal("1.0")))

1.3
-1.4
```

ROUND_DOWN은 truncate 같은 효과가 발생한다.

```py
from decimal import Decimal


if __name__ == '__main__':
    decimal.getcontext().rounding = decimal.ROUND_DOWN

    print(Decimal("1.32").quantize(Decimal("1.0")))
    print(Decimal("-1.32").quantize(Decimal("1.0")))

1.3
-1.3
```

ROUND_UP은 0에서 멀어지는 방향으로 올림한다.

```py
from decimal import Decimal


if __name__ == '__main__':
    decimal.getcontext().rounding = decimal.ROUND_UP

    print(Decimal("1.32").quantize(Decimal("1.0")))
    print(Decimal("-1.32").quantize(Decimal("1.0")))

1.4
-1.4
```

ROUND_HALF_UP 0에서 멀어지는 방향으로 반올림한다.
5는 0에서 멀어진다.

```py
from decimal import Decimal


if __name__ == '__main__':
    decimal.getcontext().rounding = decimal.ROUND_HALF_UP

    print(Decimal("1.32").quantize(Decimal("1.0")))
    print(Decimal("-1.32").quantize(Decimal("1.0")))

    print(Decimal("1.35").quantize(Decimal("1.0")))
    print(Decimal("-1.35").quantize(Decimal("1.0")))

1.3
-1.3
1.4
-1.4
```

ROUND_HALF_DOWN 0에 가까워지는 방향으로 반올림 한다.
5는 0으로 가까워진다.

```py
from decimal import Decimal


if __name__ == '__main__':
    decimal.getcontext().rounding = decimal.ROUND_HALF_DOWN

    print(Decimal("1.35").quantize(Decimal("1.0")))
    print(Decimal("-1.35").quantize(Decimal("1.0")))

    print(Decimal("1.36").quantize(Decimal("1.0")))
    print(Decimal("-1.36").quantize(Decimal("1.0")))

1.3
-1.3
1.4
-1.4
```

ROUND_HALF_EVEN 5일 때 짝수 방향으로 간다.

```py
from decimal import Decimal


if __name__ == '__main__':
    decimal.getcontext().rounding = decimal.ROUND_HALF_EVEN

    print(Decimal("1.35").quantize(Decimal("1.0")))
    print(Decimal("-1.35").quantize(Decimal("1.0")))

    print(Decimal("1.45").quantize(Decimal("1.0")))
    print(Decimal("-1.45").quantize(Decimal("1.0")))

1.4
-1.4
1.4
-1.4
```

ROUND_05UP은 가장 이상하다. 끝자리는 무조건 버려진다.
버러지고 난 뒤의 소수점 첫 번째 자리가 5면 6으로 변한다.

```py
from decimal import Decimal


if __name__ == '__main__':
    decimal.getcontext().rounding = decimal.ROUND_05UP

    print(Decimal("1.35").quantize(Decimal("1.0")))
    print(Decimal("-1.35").quantize(Decimal("1.0")))

    print(Decimal("1.45").quantize(Decimal("1.0")))
    print(Decimal("-1.45").quantize(Decimal("1.0")))

    print(Decimal("1.54").quantize(Decimal("1.0")))
    print(Decimal("-1.54").quantize(Decimal("1.0")))

    print(Decimal("1.65").quantize(Decimal("1.0")))
    print(Decimal("-1.65").quantize(Decimal("1.0")))

1.3
-1.3
1.4
-1.4
1.6
-1.6
1.6
-1.6
```

## numpy

```py
import numpy as np


if __name__ == '__main__':
    np.random.seed(444)
    data = np.random.randn(3, 4)
    print(data)
    print(np.around(data, decimals=3))

[[ 0.35743992  0.3775384   1.38233789  1.17554883]
 [-0.9392757  -1.14315015 -0.54243951 -0.54870808]
 [ 0.20851975  0.21268956  1.26802054 -0.80730293]]

[[ 0.357  0.378  1.382  1.176]
 [-0.939 -1.143 -0.542 -0.549]
 [ 0.209  0.213  1.268 -0.807]]
```

np.around()는 round()와 동일하다. round 오류도 동일하다.

```py
    print(np.ceil(data))

[[ 1.  1.  2.  2.]
 [-0. -1. -0. -0.]
 [ 1.  1.  2. -0.]]
```

negative zero가 발생한다.

numpy에는 다음과 같은 함수들이 존재한다.

numpy.floor()
numpy.trunc()
numpy.rint()

rint는 ROUND_HALF_EVEN과 동일하다.

ROUND_HALF_UP은 다음과 같이 구현한다.

```py
def round_half_up(n, decimals=0):
    multiplier = 10 ** decimals
    return np.floor(n*multiplier + 0.5) / multiplier
```

## pandas

```py
import numpy as np
import pandas as pd


if __name__ == '__main__':
    np.random.seed(444)
    series = pd.Series(np.random.randn(4))
    print(series)
    print(series.round(2))

0    0.357440
1    0.377538
2    1.382338
3    1.175549
dtype: float64
0    0.36
1    0.38
2    1.38
3    1.18
dtype: float64
```

```py
import numpy as np
import pandas as pd


if __name__ == '__main__':
    np.random.seed(444)
    df = pd.DataFrame(np.random.randn(3, 3), columns=["A", "B", "C"])
    print(df)
    print(df.round(2))


          A         B         C
0  0.357440  0.377538  1.382338
1  1.175549 -0.939276 -1.143150
2 -0.542440 -0.548708  0.208520
      A     B     C
0  0.36  0.38  1.38
1  1.18 -0.94 -1.14
2 -0.54 -0.55  0.21
```

```py
import numpy as np
import pandas as pd


if __name__ == '__main__':
    np.random.seed(444)
    df = pd.DataFrame(np.random.randn(3, 3), columns=["A", "B", "C"])
    print(df.round({"A": 1, "B": 2, "C": 3}))

    decimals = pd.Series([1, 2, 3], index=["A", "B", "C"])
    print(df.round(decimals))
```

dataframe을 numpy 메소드의 인자로 전달할 수 있다.

```py
np.floor(df)
np.ceil(df)
np.rint(df)
```

numpy의 array를 인자로 전달했던 round_half_up 함수도 그대로 사용할 수 있다.

```py
round_half_up(df, decimals=2)
```

## best strategy

최대한 늦게 round 처리를 한다.
local 통화 규정을 준수한다.
의심스러울 땐 ROUND_HALF_EVEN
