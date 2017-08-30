# 파이썬에서 정규 표현식을 지원하는 re모듈

https://wikidocs.net/4308

* 파이썬은 정규 표현식을 지원하기 위해 re(regular expression의 약어) 모듈을 제공한다.

* re 모듈은 파이썬이 설치될 때 자동으로 설치되는 기본 라이브러리다.

```py
>>> import re
>>> p = re.compile('ab*')
```

* re.compile 을 이용하여 정규표현식(위 예에서는 ab*)을 컴파일

* 컴파일된 패턴객체(re.compile의 결과로 리턴되는 객체 p)를 이용하여 그 이후의 작업을 수행한다.

* 정규식 컴파일 시 특정 옵션을 주는 것도 가능하다.

* 패턴이란 정규식을 컴파일한 결과이다.

## 정규식을 이용한 문자열 검색

컴파일 된 패턴 객체는 다음과 같은 4가지 메소드를 제공한다.

1. match() 문자열의 처음부터 정규식과 매치되는지 조사한다.
2. search() 문자열 전체를 검색하여 정규식과 매치되는지 조사한다.
3. findall() 정규식과 매치되는 모든 문자열(substring)을 리스트로 리턴한다.
4. finditer() 정규식과 매치되는 모든 문자열(substring)을 iterator 객체로 리턴한다.

* match, search는 정규식과 매치될 때에는 match 객체를 리턴

* 매치되지 않을 경우에는 None을 리턴한다. 

* match 객체란 정규식의 검색 결과로 리턴되는 객체이다.

```py
>>> import re
>>> p = re.compile('[a-z]+')
```

### match

match 메서드는 문자열의 처음부터 정규식과 매치되는지 조사한다. 

```py
>>> m = p.match("python")
>>> print(m)
<_sre.SRE_Match object at 0x01F3F9F8>
```

"python"이라는 문자열은 [a-z]+ 정규식에 부합되므로 match 객체가 리턴된다.

```py
>>> m = p.match("3 python")
>>> print(m)
None
```

"3 python"이라는 문자열은 처음에 나오는 3이라는 문자가 정규식 [a-z]+에 부합되지 않으므로 None이 리턴된다.

match의 결과로 match 객체 또는 None이 리턴되기 때문에 파이썬 정규식 프로그램은 보통 다음과 같은 흐름으로 작성한다.

```py
p = re.compile(정규표현식)
m = p.match( 'string goes here' )
if m:
    print('Match found: ', m.group())
else:
    print('No match')
```

즉, match의 결과값이 있을 때만 그 다음 작업을 수행하겠다는 의도이다.

### search

컴파일된 패턴 객체 p를 가지고 이번에는 search 메서드를 수행해 보자.

```py
>>> m = p.search("python")
>>> print(m)
<_sre.SRE_Match object at 0x01F3FA68>
```

"python"이라는 문자열에 search 메서드를 수행하면 match 메서드를 수행했을 때와 동일하게 매치된다.

```py
>>> m = p.search("3 python")
>>> print(m)
<_sre.SRE_Match object at 0x01F3FA30>
```

"3 python"이라는 문자열의 첫 번째 문자는 "3"이지만 search는 문자열의 처음부터 검색하는 것이 아니라 문자열 전체를 검색하기 때문에 "3 " 이후의 "python"이라는 문자열과 매치된다.

이렇듯 match 메서드와 search 메서드는 문자열의 처음부터 검색할지의 여부에 따라 다르게 사용해야 한다.

### findall

이번에는 findall 메서드를 수행해 보자.

```py
>>> result = p.findall("life is too short")
>>> print(result)
['life', 'is', 'too', 'short']
```

"life is too short"라는 문자열의 "life", "is", "too", "short"라는 단어들이 각각 [a-z]+ 정규식과 매치되어 리스트로 리턴된다.

### finditer

이번에는 finditer 메서드를 수행해 보자.

```py
>>> result = p.finditer("life is too short")
>>> print(result)
<callable_iterator object at 0x01F5E390>
>>> for r in result: print(r)
...
<_sre.SRE_Match object at 0x01F3F9F8>
<_sre.SRE_Match object at 0x01F3FAD8>
<_sre.SRE_Match object at 0x01F3FAA0>
<_sre.SRE_Match object at 0x01F3F9F8>
```

finditer는 findall과 동일하지만 그 결과로 반복 가능한 객체(iterator object)를 리턴한다. 

반복 가능한 객체가 포함하는 각각의 요소는 match 객체이다.
