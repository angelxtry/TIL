# decorator

데이레이터 함수에 전달하는 함수에 param이 있는 경우 다음과 같이 처리한다.

```py
def decorator_function(original_function):
    # param을 가진 함수를 decorating
    def wrapper_function(*args, **kwargs):
        print(f'{original_function.__name__} 함수가 호출되기 전 입니다.')
        return original_function(*args, **kwargs)
    return wrapper_function

@decorator_function
def display():
    print('display 함수가 실행됐습니다.')

@decorator_function
def display_info(name, age):
    print(f'display_info({name}, {age}) 함수가 실행됐습니다.')

display()
display_info('lee', 25)

# display 함수가 호출되기 전 입니다.
# display 함수가 실행됐습니다.
# display_info 함수가 호출되기 전 입니다.
# display_info(lee, 25) 함수가 실행됐습니다.
```

## class형식의 decorator

```py
# class 형식의 decorator
class DecoratorClass:
    def __init__(self, original_function):
        self.original_function = original_function

    def __call__(self, *args, **kwargs):
        print(f'{self.original_function.__name__} 함수가 호출되기 전 입니다.')
        return self.original_function(*args, **kwargs)

@DecoratorClass
def display():
    print('display 함수가 실행됐습니다.')

@DecoratorClass
def display_info(name, age):
    print(f'display_info({name}, {age}) 함수가 실행됐습니다.')

display()
display_info('lee', 25)

# display 함수가 호출되기 전 입니다.
# display 함수가 실행됐습니다.
# display_info 함수가 호출되기 전 입니다.
# display_info(lee, 25) 함수가 실행됐습니다.
```

class형식의 decorator는 잘 사용하지 않는다. 참고만하자.

## decorator 활용: logger, timer

```py
from datetime import datetime
import time


def my_logger(original_function):
    import logging
    logging.basicConfig(filename=f'{original_function.__name__}.log', level=logging.INFO)

    def wrapper(*args, **kwargs):
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M')
        logging.info(
            f'[{timestamp}] 실행결과 args - {args}, kwargs - {kwargs}'
        )
        return original_function(*args, **kwargs)

    return wrapper


def my_timer(original_function):
    def wrapper(*args, **kwargs):
        t1 = time.time()
        result = original_function(*args, **kwargs)
        t2 = time.time() - t1
        print(f'{original_function.__name__} 함수가 실행된 총 시간:{t2} 초')
        return result

    return wrapper


@my_logger
def display_info_logger(name, age):
    time.sleep(1)
    print(f'display_info_logger({name}, {age}) 함수가 실행됐습니다.')

@my_timer
def display_info_timer(name, age):
    time.sleep(1)
    print(f'display_info_timer({name}, {age}) 함수가 실행됐습니다.')


display_info_logger('lee', 25)

display_info_timer('lee', 25)

# display_info_logger(lee, 25) 함수가 실행됐습니다.
# display_info_timer(lee, 25) 함수가 실행됐습니다.
# display_info_timer 함수가 실행된 총 시간:1.0001001358032227 초
```

my_logger 데코레이터는 로그 파일을 생성하여 내용을 기록한다.

my_timer 데코레이터는 실행시간을 클릭하여 출력한다.

## decorator 2개 이상을 동시에 사용하기

```py
from datetime import datetime
import time

def my_logger(original_function):
    import logging
    logging.basicConfig(filename=f'{original_function.__name__}.log', level=logging.INFO)

    def wrapper(*args, **kwargs):
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M')
        logging.info(
            f'[{timestamp}] 실행결과 args - {args}, kwargs - {kwargs}'
        )
        return original_function(*args, **kwargs)

    return wrapper


def my_timer(original_function):
    def wrapper(*args, **kwargs):
        t1 = time.time()
        result = original_function(*args, **kwargs)
        t2 = time.time() - t1
        print(f'{original_function.__name__} 함수가 실행된 총 시간:{t2} 초')
        return result

    return wrapper


@my_logger
@my_timer
def display_info_logger_timer(name, age):
    time.sleep(1)
    print(f'display_info_logger_timer({name}, {age}) 함수가 실행됐습니다.')


display_info_logger_timer('kim', 30)

# display_info_logger_timer(kim, 30) 함수가 실행됐습니다.
# display_info_logger_timer 함수가 실행된 총 시간:1.0 초
```

이 경우 터미널 상의 출력은 정상적으로 출력된다.

하지만 wrapper.log란 이름의 로그 파일이 생성되고 로그가 기록되었다.

데코레이터의 순서를 바꿔서 다시 실행해보자.

```py
from datetime import datetime
import time

def my_logger(original_function):
    import logging
    logging.basicConfig(filename=f'{original_function.__name__}.log', level=logging.INFO)

    def wrapper(*args, **kwargs):
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M')
        logging.info(
            f'[{timestamp}] 실행결과 args - {args}, kwargs - {kwargs}'
        )
        return original_function(*args, **kwargs)

    return wrapper


def my_timer(original_function):
    def wrapper(*args, **kwargs):
        t1 = time.time()
        result = original_function(*args, **kwargs)
        t2 = time.time() - t1
        print(f'{original_function.__name__} 함수가 실행된 총 시간:{t2} 초')
        return result

    return wrapper


@my_timer
@my_logger
def display_info_logger_timer(name, age):
    time.sleep(1)
    print(f'display_info_logger_timer({name}, {age}) 함수가 실행됐습니다.')


display_info_logger_timer('kim', 30)

# display_info_logger_timer(kim, 30) 함수가 실행됐습니다.
# wrapper 함수가 실행된 총 시간:1.0 초
```

@my_timer, @my_logger의 순서를 변경하면 로그파일을 정상적으로 생성되나 터미널 출력에서 함수명이 wrapper로 변경된다.


여러개의 데코레이터를 스택하여 사용하면 아래쪽 데코레이터부터 실행된다.

@my_timer, @my_logger의 순서로 실행할 경우 @my_logger가 먼저 실행되고 @my_timer에게 wrapper 함수를 인자로 전달하기 때문에 wrapper가 터미널에 출력된다.

이런 현상을 방지하기 위해 functools의 wraps 데코레이터를 사용한다.

## from functools import wraps

```py
from datetime import datetime
from functools import wraps
import time

def my_logger(original_function):
    import logging
    logging.basicConfig(filename=f'{original_function.__name__}.log', level=logging.INFO)

    @wraps(original_function)
    def wrapper(*args, **kwargs):
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M')
        logging.info(
            f'[{timestamp}] 실행결과 args - {args}, kwargs - {kwargs}'
        )
        return original_function(*args, **kwargs)

    return wrapper


def my_timer(original_function):
    @wraps(original_function)
    def wrapper(*args, **kwargs):
        t1 = time.time()
        result = original_function(*args, **kwargs)
        t2 = time.time() - t1
        print(f'{original_function.__name__} 함수가 실행된 총 시간:{t2} 초')
        return result

    return wrapper


@my_timer
@my_logger
def display_info_logger_timer(name, age):
    time.sleep(1)
    print(f'display_info_logger_timer({name}, {age}) 함수가 실행됐습니다.')

display_info_logger_timer('kim', 30)
```

wraps를 import 하고 데코레이터 함수에 @wraps를 사용한다.

이렇게 하면 2개의 데코레이터 함수의 순서와 관계없이 최초 호출 함수인 display_info_logger_timer가 param으로 잘 전달된다.
