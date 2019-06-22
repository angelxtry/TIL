# hash table

hash function을 사용하여 key를 hash value로 변환

이 hash value를 index로 삼아 key와 data를 같이 저장하는 것을 hash table이라고 한다.

내부적으로 배열을 사용하여 data를 저장한다고 한다.

![hash table](http://drive.google.com/uc?export=view&id=1WrFHNpnzQ7qkQoAt80RFxHq1Obivj8Hv)
(출처: https://en.wikipedia.org/wiki/Hash_table)

|index|data|
|---|---|
|01 | Lisa Smith, 521-8976 |

hash function은 동일한 key에 대해 동일한 hash value를 리턴한다.

hash value가 index 처럼 사용되기 때문에 data에 빠르게 접근 할 수 있다. (time complexity O(1))

hash function에 따라 다른 key가 동일한 hash value를 리턴할 수도 있다. 이런 경우를 collision이라고 한다.
