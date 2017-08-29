# collections.Counter

https://godoftyping.wordpress.com/2015/04/20/python-%EC%B9%B4%EC%9A%B4%ED%84%B0/

```py
import collections
 
myList = ['a', 'b', 'c', 'c', 'a', 'a']
myCounter = collections.Counter(myList)
print('myCounter:', myCounter)
# myCounter: Counter({'a': 3, 'c': 2, 'b': 1})
 
print("myCounter['a']:", myCounter['a'])
# myCounter['a']: 3
 
yourList = ['a', 'd', 'c', 'a', 'b']
yourCounter = collections.Counter(yourList)
print('yourCounter:', yourCounter)
# yourCounter: Counter({'a': 2, 'd': 1, 'b': 1, 'c': 1})
 
ourCounter = myCounter + yourCounter
print('ourCounter:', ourCounter)
# ourCounter: Counter({'a': 5, 'c': 3, 'b': 2, 'd': 1})
 
print('ourCounter.most_common(3):', ourCounter.most_common(3))
# ourCounter.most_common(3): [('a', 5), ('c', 3), ('b', 2)]
```

리스트 내의 element가 몇 번이나 반복되었는지 count

most_common(n) 메소드를 사용하면 상위 n개를 리턴
