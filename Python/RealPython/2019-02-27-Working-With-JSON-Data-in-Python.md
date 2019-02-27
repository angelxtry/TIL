# Working With JSON Data in Python

JSON(JavaScript Object Notation)

```json
{
    "firstName": "Jane",
    "lastName": "Doe",
    "hobbies": ["running", "sky diving", "singing"],
    "age": 35,
    "children": [
        {
            "firstName": "Alice",
            "age": 6
        },
        {
            "firstName": "Bob",
            "age": 8
        }
    ]
}
```

JSON은 string, number, nested list, object 와 같은 primitive type을 지원한다.

JSON은 얼핏봐도 Python dictionary와 비슷해 보인다.

## Python Supports JSON Natively

Python에는 json이라고 불리는 built-in package가 있다. JSON data를 encoding, decoding 할 수 있다.

### A Little Vocabulary

JSON으로 encoding 하는 것을 serialization이라고 한다. 이 용어는 data을 a series of byets로 변환하는 것을 의미한다. 변환된 데이터는 저장하거나 network를 통해 전송할 때 사용한다. deserialization은 JSON data를 decoding 하는 것을 의미한다.

### Serializing JSON

Python object는 다음과 같이 JSON으로 변환된다.

dict -> object
list, tuple -> array
str -> string
int, long, float -> number
True -> true
False -> false
None -> null

### A Simple Serialization Example

```py
data = {
    "president": {
        "name": "Verovero",
        "species": "Superman"
    }
}
```

메모리에 있는 데이터를 disk에 옮기고 싶다.

```py
with open("data_file.json", 'w') as write_file:
    json.dump(data, write_file)
```

`dump()`는 2개의 positional arguments를 받는다. 첫 번째는 serialize하려고 하는 데이터, 두 번째는 데이터를 기록하기 위한 file-like object다.

JSON data를 프로그램에서 사용하려면 dumps()를 사용한다. 이 메서드는 JSON data를 Python str object로 변환한다.

```py
json_string = json.dumps(data)
```

dump()와 dumps()의 차이는 두 번째 file-like object의 유무다.

## Some Useful Keyword Arguments

JSON은 사람이 읽기 쉽게하려는 의도로 만들어졌지만, 뭉쳐있으면 읽기 어렵다. JSON 데이터에 format을 추가하여 좀 더 읽기 쉽게 만들 수 있다.

dump()와 dumps() 메서드는 같은 keyword argument를 사용한다.

```py
json.dumps(data, indent=4)
json.dumps(data, speerators=(',', ':'))
```

sort_keys keyword argument는 JSON 데이터를 key로 정렬한다.

```py
import json

x = {
    "name": "Ken",
    "age": 45,
    "married": True,
    "children": ("Alice","Bob"),
    "pets": ['Dog'],
    "cars": [
        {"model": "Audi A1", "mpg": 15.1},
        {"model": "Zeep Compass", "mpg": 18.1}
    ]
}
# sorting result in asscending order by keys:
sorted_string = json.dumps(x, indent=4, sort_keys=True)
print(sorted_string)
```

### Deserializing JSON

```py
blackjack_hand = (8, 'Q')
encoded_hand = json.dumps(blackjack_hand)
decoded_hand = json.loads(encoded_hand)

print(encoded_hand == decoded_hand)
print(type(blackjack_hand))
print(type(decoded_hand))

# False
# tuple
# list
```

load(), loads() 메서드를 이용하여 deserialize 한다.

data를 serialize한 후 다시 deserialize 하면 원본 데이터와 꼭 동일하다고 볼 수 없다.

### A Simple Deserialization Example

```py
with open("data_file", 'r') as read_file:
    data = json.load(read_file)
    print(data)

# dict
```

대부분 root object는 dict나 list가 된다.

JSON formatted data의 문자열을 Python에서 사용하기 위해서는 보통 loads() 메서드를 사용한다.

```py
json_string = """
{
    "researcher": {
        "name": "Ford Prefect",
        "species": "Betelgeusian",
        "relatives": [
            {
                "name": "Zaphod Beeblebrox",
                "species": "Betelgeusian"
            }
        ]
    }
}
"""
data = json.loads(json_string)
print(type(data))

# dict
```

## A Real World Example(sort of)

[JOSNPlaceholder](https://jsonplaceholder.typicode.com/)

연습 목적으로 fake JSON data를 제공

```py
import json
import requests
from pprint import pprint


response = requests.get('https://jsonplaceholder.typicode.com/todos')
todos = json.loads(response.text)
pprint(todos[:10])
```
