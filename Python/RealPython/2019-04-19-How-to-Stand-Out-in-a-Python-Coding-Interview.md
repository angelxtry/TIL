# How to Stand Out in a Python Coding Interview

당신이 clean production code를 작성할 수 있다는 것을 보여줘야 합니다.

이 아티클은 Python의 기본 제공 기능부터 시작하여, 기본적으로 제공하는 Data Structure, 그리고 마지막으로 강력한 Standard library를 최대한 활용하는 방법을 설명한다.

이 아티클에서 다음의 항목들을 배울 수 있다.

- enumerate(), index와 value를 동시에 iterate
- breakpoint()로 디버깅하는 방법
- f-string 활용
- custom arguments로 list를 정렬하는 방법
- memory를 절약하기 위해 list comprehension 대신 generator를 사용하는 법
- dictionary의 key를 찾기 위해 default value를 정의하는 법
- collections.Counter class를 이용하여 hashable object를 세는 법
- Standard library를 활용하여 permutaion과 combination list를 만드는 방법

## Select the Right Built-In Function for the Job

### range() 대신 enumerate() 활용

FizzBuzz 문제를 살펴보자.

1.3으로 나누어 떨어지는 수는 fizz
2.5로 나누어 떨어지는 수는 buzz
3.3 또는 5로 나누어 떨어지는 수는 fizzbuzz

