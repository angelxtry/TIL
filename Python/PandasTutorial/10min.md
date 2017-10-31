# Pandas Tutorial


* pandas의 사용법을 익히기 시도

## 설치
* `pip install pandas`

## 데이터 준비
* 사내 DB 데이터를 csv로 다운받았다.
* encoding은 UTF-8

## 기본 사용법
* python 실행

```py
import pandas
df = pandas.read_csv('BP_REVAL_20171101.csv')
# 기본 encoding = 'utf-8'

# 전체 데이터 출력
df
# 일부 데이터만 출력 된 후 [2439 rows x 25 columns] 값이 출력된다.
```

## 10 Minutes to pandas

* http://pandas.pydata.org/pandas-docs/stable/10min.html#min
* https://dandyrilla.github.io/2017-08-12/pandas-10min/

### import
* pandas를 사용하기 위해 관례적으로 다음과 같이 import 한다.
```py
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
```

* 배열 구조나 랜덤 값 생성 등의 기능을 활용하기 위해 numpy
* 그래프를 그리기 위해 matplotlib

### 1. 데이터 오브젝트 생성
* pandas의 데이터 구조 중 Series는 리스트를 매개변수로 전달한다.
* 인덱스는 자동으로 정수 인덱스(default)

```py
>>> s = pd.Series([1, 3, 5, np.nan, 6, 8])
>>> s
0    1.0
1    3.0
2    5.0
3    NaN
4    6.0
5    8.0
dtype: float64
```

* DataFrame은 numpy array를 받아 생성할 수 있다.
* 인덱스로 날짜를 설정, 컬럼의 이름도 설정
```py
>>> dates = pd.date_range('20171031', periods=6)
>>> dates
DatetimeIndex(['2017-10-31', '2017-11-01', '2017-11-02', '2017-11-03',
               '2017-11-04', '2017-11-05'],
              dtype='datetime64[ns]', freq='D')
>>>
>>> df = pd.DataFrame(np.random.randn(6,4), index=dates, columns=list('ABCD'))
>>> df
                   A         B         C         D
2017-10-31  2.628543 -1.137942 -0.083963  0.004897
2017-11-01  0.593681 -0.038138 -0.651711 -0.858506
2017-11-02 -0.421952  1.014687 -0.990720 -0.992066
2017-11-03  0.174529  1.464415  0.252903 -0.594610
2017-11-04  1.156861  0.711038 -0.321796  1.110521
2017-11-05 -1.647078  1.101581  0.524389  0.497843
```

* 참고: `np.random.randn(6,4)`
* Numpy의 random에는 난수를 생성하는 명령이 3가지가 있다.(더 있나?)
    * rand: 0부터 1사이의 균일 분포
    * randn: 가우시안 표준 정규 분포
    * randint: 균일 분포의 정수 난수

1. rand
    * 0부터 1사이에서 균일한 확률 분포로 실수 난수를 생성한다.
```py
>>> np.random.rand(10)
array([ 0.97326756,  0.49948884,  0.88755571,  0.40038799,  0.82858612,
        0.7088712 ,  0.21564592,  0.08513903,  0.50986402,  0.76239339])

>>> np.random.rand(3, 5)
array([[ 0.40055398,  0.98794843,  0.49255637,  0.75341528,  0.79346564],
       [ 0.53279899,  0.99235919,  0.98893501,  0.43204835,  0.0566346 ],
       [ 0.96682525,  0.59413213,  0.2557734 ,  0.31933991,  0.62649951]])
```

2. randn
    * 기대값이 0이고 표준편차가 1인 가우시안 표준 정규 분포를 따르는 난수를 생성
    * 사용법은 rand와 동일

3. randint
    * `np.random.randint(low, high=None, size=None)`
    * high를 입력하지 않으면 0rhk low 사이의 숫자
    * high를 입력하면 low와 high 사이의 숫자
    * size는 난수의 갯수 
```py
>>> np.random.randint(10, size=10)
array([7, 8, 7, 2, 1, 5, 6, 8, 2, 8])
>>>
>>> np.random.randint(10, 20, size=10)
array([16, 17, 13, 19, 19, 11, 19, 19, 16, 15])
>>>
>>> np.random.randint(10, 20, size=(3,5))
array([[12, 12, 14, 19, 15],
       [18, 15, 13, 14, 17],
       [17, 11, 14, 16, 19]])
```