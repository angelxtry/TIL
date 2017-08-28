# dict sorting

## value 기준으로

```py
import operator
x = {1: 2, 3: 4, 4: 3, 2: 1, 0: 0}
sorted_x = sorted(x.items(), key=operator.itemgetter(1)) 
```

## key 기준으로

```py
import operator
x = {1: 2, 3: 4, 4: 3, 2: 1, 0: 0}
sorted_x = sorted(x.items(), key=operator.itemgetter(0))
```

* 세번째 인자로 `reverse=True`를 사용할 수 있다.

# list sort

```py
word_list = [['a', 3], ['b', 4], ['c', 1]]
word_list.sort(key=lambda x: x[1], reverse=True)
```

* 리스트를 2번째 element를 기준으로 sorting
