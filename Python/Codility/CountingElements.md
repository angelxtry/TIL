# Counting Elements

{0, 1, ..., m} 같은 수의 집합이 있다고 가정한다.
같은 숫자가 중복해서 나올 수 있고, 숫자의 가장 큰 값은 m이다.
숫자는 0을 포함한 양의 정수다.
각 숫자의 갯수를 확인하라.

```py
def counting(A):
    max_element = max(A)
    count = [0] * (max_element + 1)
    for i in range(len(A)):
        count[A[i]] += 1
    return count
```

수의 집합에 음수가 포함되어 있다면 어떻게 해야할까?

```py
def counting(A):
    min_value = min(A) * -1
    for i in range(len(A)):
        A[i] += min_value
    count = [0] * (max(A) + 1)
    for i in range(len(A))
        count[A[i]] += 1
    for 
```