# Async IO in Python: A Complete Walkthrough

Async IO는 Python에서 전폭적인 지지를 받고 있는 concurrent programming design인다.

async IO는 어디에 적합할까?

이 글에서는 다음의 내용을 다룬다.

- asynchronous IO(async IO): 여러 programming language에서 구현한 특정 언어에 귀속되지 않는 패러다임
- async/await: coroutine을 위해 정의된 Python의 새로운 키워드
- asyncio: coroutine을 정의하고 동작하기 위해 제공되는 Python package

coroutine(specialized generator functions)은 async IO의 심장이다.

이 글에서 async IO는 특정 언어에 귀속되지 않는 용어로 사용한다. asyncio는 Python package를 의미한다.

aiohttp, aiofiles 같은 package를 사용하려면 Python 3.7이 필요하다.

## Setting Up Your Environment

Python 3.7 설치
aiohttp, aiofiles 설치

```cmd
pip install aiohttp aiofiles
```

## The 10,000-Foot View of Async IO

AsyncIO는 multiprocessing이나 threading 보다 다소 덜 알려져있다.
이 섹션에서 async IO가 무엇이고, 어떤 상황에 가장 적합한지 알아보자.

### Where Does Async IO Fit In

parallelism은 여러가지 동작은 동시에 수행하는 것을 의미한다.
multiprocessing은 parallelism을 수행하는 수단이다. CPU를 통해 작업은 분산시킨다. 그래서 multiprocessing은 CPU-bound task에 적합하다. for 루프나 수학적 계산은 이 카테고리에 속한다.
concurrency는 parallelism보다 더 넒은 의미의 용어다.
threading은 다수의 thread를 동시에 실행하는 것이다. 하나의 프로세스가 여러 개의 thread를 포함할 수 있다. Python은 GIL 때문에 multi thread가 제한된다. threading은 IO-bound task에 적합하다.

concurrency는 CPU-bound task에 적합한 multiprocessing, IO-bound task에 적합한 threading을 모두 아우르는 표현이다.
parallelism은 concurrency의 일부분이라고 할 수 있다.
Python 표준 라이브러리는 multiprocessing, threading, concurrent.futures package로 concurrency를 지원해왔다.

async IO는 새로운 개념은 아니다. 다른 언어에 이미 존재했다.

asyncio package는 threading도 아니고 multiprocessing도 아니다.
async IO는 single-thread, single-process design이다. 이것은 협력적인 멀티태스킹(cooperative multitasking) 방식이다.
async IO는 single process에서 single thread를 사용함에도 불구하고 concurrency의 느낌을 준다.
async IO의 핵심 기능인 coroutine은 동시에 스케줄링 될 수 있지만 본질적으로 concurrent하지는 않다.

async IO는 parallelism이 아니라 concurrent programming의 스타일이다. 이것은 multiprocessing보다 threading에 가깝다.
하지만 본질적으로 이 둘과 다르다. async IO는 concurrency의 속임수 같은 거다.

그렇다면 asynchronous는 무엇일까? 엄격한 정의는 아니지만 두 가지 정도의 의미를 생각할 수 있다.

- asynchronous routine은 최종 결과가 나올 때까지 멈춤이 가능하다. 그리고 멈춰있는 동안 다른 것들을 실행할 수 있다.
- 이러한 매커니즘을 통해 asynchronous code는 concurrent execution을 가능하게 한다. 다르게 표현하자면 asynchronous code는 concurrency의 look and feel을 준다.

Concurrency는 Parallelism을 포함하는 개념이다. Concurrency를 구현하는 것이 Threading과 Async IO, Parallelism을 구현하는 것은 Multiprocssing이다.

### Async IO Explained

async IO는 반직관적이고 역설적으로 보일 수 있다. 어떻게 single thread와 single core에서 concurrent code를 가능하게 할까?

다음 예를 보자.

체스 마스터가 여러명의 아마추어 선수와 동시에 경기를 한다.
아마추어 선수는 24명이다.
체스 마스터는 5초 내에 자신의 턴을 진행해야 하고 아마추어 선수는 55초 동안 진행한다.
한 게임의 턴은 30번이다.

Synchronous version
(55 + 5) * 30 == 1800(30min)
24 * 30min = 720min(12hours)

Asynchronous version
체스 마스터가 체스를 하는데 걸리는 시간은
24 * 5 = 120
120 * 30 = 3600(1houes)

## The asyncio Package and async/await

Python의 asyncio package는 3.4에 도입되었다.

### The async/await Syntax and Native Coroutines

asyncio API는 3.4부터 3.7까지 빠르게 변해왔다. 과거에 주로 사용되었던 패턴은 현재 사용되지 않는다. 이 문서도 빠르게 outdate될 수도 있다.

asyncio의 핵심은 coroutine이다. coroutine은 Python generator function의 특별한 버전이다.

coroutine function은 return이 도착할 때까지 실행을 멈출 수 있다.

이제 asyncio의 코드를 작성해 보자. asyncio의 Hello World 같은 코드다.

```py
#!/usr/bin/env python
import asyncio

async def count():
    print('One')
    await asyncio.sleep(1)
    print('Two')


async def main():
    await asyncio.gather(count(), count(), count())


if __name__ == '__main__':
    import time
    s = time.perf_counter()
    asyncio.run(main())
    elapsed = time.perf_counter() - s
    print(f'{__file__} executed in {elapsed:0.2f} seconds.')

```

```cmd
ne
One
One
Two
Two
Two
countasync.py executed in 1.00 seconds.
```

async IO의 핵심은 출력의 순서다.

sync 방식으로 작성한 코드와 비교해보자.

```py
#!/usr/bin/env python
import time

def count():
    print('One')
    time.sleep(1)
    print('Two')


def main():
    for _ in range(3):
        count()


if __name__ == '__main__':
    s = time.perf_counter()
    main()
    elapsed = time.perf_counter() - s
    print(f'{__file__} executed in {elapsed:0.2f} seconds.')

```

```cmd
One
Two
One
Two
One
Two
countsync.py executed in 3.00 seconds.
```

time.sleep()과 async.sleep()은 평범해보인다. 이 함수들은 시간이 오래 걸리는 어떤 실행을 기다리는 것 처럼 사용되었다.

time.sleep()은 시간이 소모되는 blocking function call을 의미한다. async.sleep()은 nonblocking function call을 의미한다.

await의 장점은 당장 무언가를 할 수 있는 function으로 code control을 넘겨준다는 것이다.

blocking function은 다른 코드와 함께 실행될 수 없다. blocking funciton이 실행되는 동안 모든 코드는 멈춰있다.

### The Rules of Async IO

async, await 그리고 coroutine의 형식적인 정의는 순서를 만드는 것이다.

`async def`는 native coroutine이나 asynchronous generator를 도입힌다. `async for`, `async with`도 사용할 수 있다.

await는 function control을 event loop로 돌려준다. 이것은 coroutine의 실행을 지연시키는 것과 동일한 효과다.

만약 g() 스코프에 있는 await f()를 만난다면 다음의 의미와 동일하다. f()의 return 이 올때까지 g()의 실행을 멈춰라. 그리고 다른 것을 먼저 실행하자.

`async def`를 사용한 함수는 coroutine이 된다. 여기에 ​await, return , yield를 사용할 수 있다. 이 3가지는 optional이다.

```py
async def noop():
    pass
```

이런 것도 유효하다.

coroutine function을 호출하면 반드시 await로 받아야 한다.

흔하게 쓰이지는 않지만 ​`async def` block에서 yield를 사용할 수도 있다. 이런 것을 asynchronous generator라고 한다.

`async def`에 yield from을 사용하면 Syntax Error가 발생한다.

이런 규칙들을 정리하면 다음과 같다.

```py
async def f(x):
    y = await(z) # await, return 모두 사용할 수 있다.
    return y

async def g(x):
    yield x  # asynchronous generator

async def m(x):
    yield from gen(x)  # SyntaxError

def m(x):
    y = await z(x)  # SyntaxError
    return y
```