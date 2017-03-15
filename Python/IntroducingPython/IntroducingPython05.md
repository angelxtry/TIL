# Introducing Python

## 문자열

파이썬3 문자열은 바이트 배열이 아닌 유니코드 문자열이다.

`unicodedata` 모듈은 유니코드 식별자와 이름으로 검색할 수 있는 함수를 제공한다.

* lookup() : 대/소문자를 구분하지 않는 인자를 취하고, 유니코드 문자를 반환

* name() : 인자로 유니코드 문자를 취하고, 대문자 이름을 반환

```
# -*- coding:utf-8 -*-
def unicode_test(value):
    import unicodedata
    name = unicodedata.name(value)
    value2 = unicodedata.lookup(name)
    print('value="%s", name="%s", value2="%s' % (value, name, value2))

unicode_test('A') # 아스키 문자
# value="A", name="LATIN CAPITAL LETTER A", value2="A

unicode_test('a') # 아스키 문자
# value="a", name="LATIN SMALL LETTER A", value2="a

unicode_test('$') # 아스키 문자 부호
# value="$", name="DOLLAR SIGN", value2="$

unicode_test('\u00a2') # 유니코드 통화 문자
#UnicodeEncodeError: 'cp949' codec can't encode character 
# '\xa2' in position 7: illegal multibyte sequence
```

* 마지막 테스트 코드는 에러가 발생한다. 

* 정확한 이유를 모르겠지만 시간 관계상 찾아보지 않았다. 꼭 찾아보자.

문자열 `len()` 함수는 유니코드의 바이트가 아닌 문자수를 센다.

```
unicode_char = '\u00a2' # 유니코드 통화 문자
print(unicode_char.encode('cp949', 'ignore')) # b''
print(unicode_char.encode('cp949', 'replace')) # b'?'
print(unicode_char.encode('cp949', 'backslashreplace')) # b'\\xa2'
print(unicode_char.encode('cp949', 'xmlcharrefreplace')) # b'&#162;'
print(unicode_char.encode('cp949'))
#UnicodeEncodeError: 'cp949' codec can't encode character 
# '\xa2' in position 7: illegal multibyte sequence
```

* encode() 함수는 인코딩 방식을 매개변수로 받는다.

* 하지만 유니코드 문자열을 인코딩할 수 없다면 UnicodeEncodeError를 발생한다.

* UnicodeEncodeError 예외를 피하기 위해 encode() 함수의 두 번째 인자를 활용한다.

* 두 번째 인자는 다음과 같은 종류가 있다.

    * ignore : b''

    * replace : b'?' 물음표로 대체

    * backslashreplace : b'\\xa2' 유니코드 문자의 문자열

    * xmlcharrefreplace : b'&#162;' 유니코드 이스케이프 시퀀스를 출력할 수 있는 문자열

