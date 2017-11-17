# first class function

* 함수 자체를 인자로써 다른 함수에 전달 가능
* 함수 자체를 return 할 수 있음
* 함수를 변수에 할당할 수 있음

```py
def square(x):
    return x * x

def my_map(func, arg_list):
    result = []
    for i in arg_list:
        result.append(func(i))
    return result

my_list = [1, 2, 3, 4, 5]

squares = my_map(square, my_list)

print(squares)

```

* 위의 코드를 보자.

* 결과를 쉽게 예상할 수 있다.

* my_map보다 list를 인자로 받아 list의 element를 각각 제곱하는 함수를 만드는 것이 더 간단하다.

* 위의 코드만 놓고 보면 굳이 my_map 같은 함수를 만들어 square 함수를 인자로 전달할 필요가 없어보인다.

* 왜 함수를 first class로 만들어야 했을까?

```py
def square(x):
    return x * x

def cube(x):
    return x * x * x

def quad(x):
    return x * x * x * x

def my_map(func, arg_list):
    result = []
    for i in arg_list:
        result.append(func(i))
    return result

my_list = [1, 2, 3, 4, 5]

squares = my_map(square, my_list)
cubes = my_map(cube, my_list)
quads = my_map(quad, my_list)

print(squares)
print(cubes)
print(quads)
```

* square, cube, quad 처럼 my_map 함수를 활용하는 함수가 많아질수록 function을 인자로 받는 my_map 함수의 의미가 생긴다.

