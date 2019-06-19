# linked list

array와 달리 node 간의 link를 이용하여 list를 구현한 것.
array는 구성 요소를 보통 element라고 부르지만 linked list는 node라고 부른다.
뒷 node와 앞 node를 모두 참조할 수 있는 doubly linked list가 많이 쓰인다.

array와 비교해서 데이터의 추가/삭제에 유리하다.
​

## method

doubly linked list를 기준으로 다음과 같은 메서드가 존재할 수 있을 듯 하다.

- `addFirst(node) -> null`
- `addLast(node) -> null`
- `addBefore(node, value) -> null`
- `addAfter(node, value) -> null`
- `find(value) -> node`
- `findLast(value) -> node`
- `remove(value) -> null`
- `removeFirst() -> null`
- `removeLast() -> null`

편의 기능이 있는 메서드를 더 만들 수 있겠지만 기본적인 것만 적어봤다.

`->` 뒤의 값은 return 값을 의미한다.

가장 중요하다고 생각되는 remove, addAfter 등의 pseudo code를 생각해보자.

### `remove(value) -> null`

head에서 시작한다.
next node로 이동, 삭제하려는 value와 같은지 확인.
삭제하려는 value를 찾을 때까지 반복.
삭제하려는 value를 찾았다면
삭제하려는 Node: Current, 이전 Node: Before, 다음 Node: After

```cmd
After Node prev = Current Node prev
Before Node next = Cueent Node next
delete Current Node
```

### `addAfter(node, value) -> null`

head에서 시작하여 next로 넘어가면서 인자로 받은 node와 동일한 Node를 찾는다.
해당 Node를 찾았다면

```cmd
Current Node pre = After Node pre
Current Node next = Before Node next

Before Node next = Current Node
After Node prev = Current Node
```

## object

### Node

```js
class Node {
  constructor(value, prev = null, next = null) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}
```

### double linked list

```js
class DoubleLinkedList {
  constructor() {
    this.head = new Node('head');
    this.tail = new Node('tail');
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
}
```
