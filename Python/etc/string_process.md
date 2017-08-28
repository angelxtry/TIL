# 문자열 처리

```py
def read_file(path_to_file):
    with open(path_to_file) as f:
        data = data + list(f.read())
```

* 파일을 읽어서 문자열을 list()를 이용하여 개별 문자로 저장한다.


```py
with open(path_to_file) as f:
    word_list = f.read().split(',')
```

* 문자열을 읽어서 ','구분자를 기준으로 단어로 나누어 리스트로 만든다.