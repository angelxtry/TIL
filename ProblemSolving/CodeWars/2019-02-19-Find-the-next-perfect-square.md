# Find the next perfect square

입력받은 수가 어떤 정수의 제곱이라면 해당 정수보다 1 큰 정수의 제곱을 return한다.

입력받은 수가 정수의 제곱이 아니라면 -1을 return 한다.

Example

```txt
findNextSquare(121) --> returns 144
findNextSquare(625) --> returns 676
findNextSquare(114) --> returns -1 since 114 is not a perfect
```

내가 작성한 코드

```py
def find_next_square(sq):
    # Return the next square if sq is a square, -1 otherwise
    initial = 0
    while True:
        square = initial * initial
        if square > sq:
            break
        if square == sq:
            find_value = initial + 1
            return find_value * find_value
        initial = initial + 1

    return -1
```

단순무식하게 0부터 시작하여 제곱한 값이 sq와 같은지 아니면 큰지 판단해서 크다면 return -1, 같다면 +1 하여 제곱을 return 했다.

테스트를 다 통과하긴 했지만 너무 비효율적인 방법이었다.

좋은 코드를 컨닝해보자.

```py
def find_next_square(sq):
    # Return the next square if sq is a square, -1 otherwise
    root = sq ** 0.5
    return (root + 1) ** 2 if root.is_integer() else -1
```

math를 import하지 않아도 0.5를 제곱하는 것으로 root를 찾았다. 그리고 root가 정수라면 (root + 1) ** 2를 return 하고 그렇지 않으면 -1을 return 한다.
if문이 복잡해 보인다면 풀어서 쓰는 것도 좋겠다.

CodeWars 재미있다. 내 수준이 얼마나 낮을지 다시 한번 깨닫게 해줘서 고맙다.

일주일에 2문제 정도 풀어볼 예정이다.