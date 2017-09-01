# list

## 리스트에 포함된 element x의 개수 세기 count

```py
print(item_list.count(E))
```

응용

```py
import heapq

heapq.nlargest(25, set(words)-set(
    open(path_to_file).split(',').lower()), words.count)
```

## list copy

* 결론: 중첩리스트는 함부로 copy하지 말자.

```py
import copy

list1 = ['a']
list2 = ['b']
list1.append(list2)
# ['a', ['b']]

print(list1)

result1 = list1[:]
result2 = list(list1)
result3 = copy.copy(list1)
result4 = copy.deepcopy(list1)

print()
print(f'list1[:] {result1}')
# ['a', ['b']]
print(f'list(list1) {result2}')
# ['a', ['b']]
print(f'copy.copy(list1) {result3}')
# ['a', ['b']]
print(f'copy.deepcopy(list1) {result4}')
# ['a', ['b']]


list1.append('x')
list2.append('z')
print()
print(f'list1 {list1}')
# ['a', ['b', 'z'], 'x']
print(f'list1[:] {result1}')
# ['a', ['b', 'z']]
print(f'list(list1) {result2}')
# ['a', ['b', 'z']]
print(f'copy.copy(list1) {result3}')
# ['a', ['b', 'z']]
print(f'copy.deepcopy(list1) {result4}')
# ['a', ['b']]
```

http://www.python-course.eu/python3_deep_copy.php