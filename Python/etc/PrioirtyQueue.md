# priority queue

priority queue는 regular queue 또는 stack data structure와 유사하지만

element에 우선 순위가있는 abstract data type(ADT)이다.

priority queue에서 우선 순위가 높은 element는 우선 순위가 낮은 element보다 먼저 제공된다.

두 element의 우선 순위가 같으면 queue의 순서에 따라 처리된다.

priority queue는 heap으로 implement되지만 개념적으로(conceptually) 구별된다.

priority queue는 list나 map과 같은 abstract concept이다.

list가 linked list나 array로 구현 될 수있는 것처럼 

priority queue는 heap 또는 unordered array 같은 다양한 다른 방법으로 구현 할 수 있다.

----

priority queue는 totally-ordered key(ex : numeric weight value)가있는 레코드 집합을 관리하는 container data structure다.

가장 작은 키 또는 가장 큰 키를 사용하여 레코드에 빠르게 액세스 할 수 있다.

priority queue는 긴급한 작업에 높은 우선순위를 부여하는 scheduling problem에서 주로 사용한다.

----

## sorted list

sorted list를 사용하여 가장 작거나 가장 큰 element를 빠르게 확인하고 삭제할 수 있다.

단점은 새 element를 list에 삽입하는 것이 느린 O(n) 작업이라는 것이다.

삽입 지점은 표준 라이브러리에서 bisect.insort를 사용하여 O(log n) 시간에 찾을 수 있지만 이것은 항상 느린 삽입(slow insertion) 단계에 의해 결정된다.

list에 추가하고 다시 정렬하여 순서를 유지하는 작업은 적어도 O(n log n) 시간이 걸린다.

따라서 sorted list는 삽입이 거의 없을 때만 적합하다.

```py
q = []

q.append((2, 'code'))
q.append((1, 'eat'))
q.append((3, 'sleep'))

q.sort(reverse=True)

while q:
    next_item = q.pop()
    print(next_item)
```

append가 발생하면 매번 sort를 하거나

bisect.insort()를 실행해야 한다.

## heapq

plain list 기반으로 구현된 binary heap이다.

가장 작은 element를 O(log n) 시간에 삽입, 추출할 수 있다.

이 모듈은 파이썬에서 priority queue를 구현하기에 좋은 방법이다.

heapq는 기술적으로 min-heap implementaion만을 제공한다.

따라서 정렬 안정성(sort stability)과 일반적으로 "실용적인" priority queue의 다른 기능을 보장하기 위해 보완이 필요하다.

```py
import heapq

q = []

heapq.heappush(q, (2, 'code'))
heapq.heappush(q, (1, 'eat'))
heapq.heappush(q, (3, 'sleep'))

while q:
    next_item = heapq.heappop(q)
    print(next_item)
```

## queue.PriorityQueue

priority queue implementation은 내부적으로 heapq를 사용하며 동일한 시간과 공간 복잡성을 갖는다. (the same time and space complexities.)

차이점은 PriorityQueue는 동기화되고 and provides locking semantics to support multiple concurrent producers and comsumers.

경우에 따라 도움이 될 수도 있고 불필요한 오버 헤드가 발생할 수도 있습니다.

heapq에서 제공하는 함수 기반 인터페이스를 사용하는 것보다 클래스 기반 인터페이스를 선호 할 수 있습니다.

```py
import queue

q = queue.PriorityQueue()
q.put((2, 'code'))
q.put((1, 'eat'))
q.put((3, 'sleep'))

while not q.empty():
    next_item = q.get()
    print(next_item)
```

priority queue를 구현해야 한다면 queue.PriorityQueue는 a good default choice일 수 있다.

locking overhead가 발생할 수도 있다.

하지만 a nice object-oriented interface와 명확하게 의도된 이름이 단점을 보완해 줄 수 있을 것이다.

