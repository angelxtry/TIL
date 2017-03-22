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

## 디코딩

외부 소스(파일, DB, 웹사이트, 네트워크 API 등)에서 텍스트를 얻을 때마다 그것은 바이트 문자열로 인코딩 되어 있다.

문제는 바이트 문자열이 어떻게 인코딩되었는지 알 수 없다.

```
place = 'caf\u00e9'
print(type(place)) # <class 'str'>
# print(place) # UnicodeEncodeError(Windows)
place_bytes = place.encode('utf-8')
print(type(place_bytes)) # <class 'bytes'>
print(len(place_bytes)) # 5
print(place_bytes) # b'caf\xc3\xa9'

place2 = place_bytes.decode('utf-8')
print(type(place2)) # <class 'str'>
print(len(place2)) # 4
#print(place2) # UnicodeEncodeError(Windows)
```

* 유니코드 문자열을 utf-8로 인코딩한 후 다시 디코딩했다.

* 이게 무슨 의미가 있는지 잘 모르겠다 ;ㅁ;

## 포멧

옛 스타일 %

* string % data

    * %s 문자열
    * %d 10진 정수
    * %x 16진 정수
    * %o 8진 정수
    * %f 10진 부동소수점수
    * %e 지수로 나타낸 부동소수점수
    * %g 10진 부동소수점수 혹은 지수로 나타낸 부동소수점수
    * %% 리터럴 %

`'%10d %10f %10s' % (n, f, s)`

* 각 변수에 최소 10칸의 공간을 설정하고, 오른쪽으로 정렬한다. 사용하지 않는 왼쪽 공간은 공백으로 채운다.

`'%-10d %-10f %-10s' % (n, f, s)`

* 왼쪽으로 정렬

`'%*d' % (10, 4)`

* 하드코딩하지 않고, 인자로 필드 길이를 지정한다.


새로운 스타일의 포메팅: {}와 format

`print('{} {} {}'.format(n, f, s))`

`print('{2} {0} {1}'.format(n, f, s))`

* 순서를 지정할 수도 있다.

`print('{n} {f} {s}'.format(n=4, f=7.03, s='string cheese'))`

* 변수명을 직접 지정할 수도 있다.

`'{0[n]} {0[f]} {0[s]} {1}'.format(d, 'other')`

* 0은 dict type인 d를 의미하고 1은 문자열 other를 의미한다.

`'{0:d} {1:f} {2:s}'.format(n, f, s)`

* `:`다음에 타입 지정자를 입력할 수 있다.

`'{0:10d} {1:10f} {2:10s}'.format(n, f, s)`

* 최소 공간의 크기가 10이고, 오른쪽으로 정렬

`'{0:>10d} {1:>10f} {2:>10s}'.format(n, f, s)`

* 위와 동일한 의미. `>` 기호는 오른쪽 정렬이라고 좀 더 명확하게 표시.

`'{0:<10d} {1:<10f} {2:<10s}'.format(n, f, s)`

* 왼쪽 정렬

`'{0:!^20s}'.format('BIG SALE')`

* 공백에 문자를 채워넣는다.

## 정규표현식

`import re`

정규표현식을 사용하려면 표준 모듈 `re`를 import 한다.

`source = 'Young Frankenstein'`

### match() : 처음부터 일치하는 패턴 찾기

```
m = re.match('You', source)
if m:
    print(m.group()) # You
```

* match는 match 객체를 반환한다.

* match 객체에는 group()과 groups() 메서드가 있다.

* group() 일치하는 item을 하나의 문자열로 반환.

* groups() 일치하는 item을 element로 가지는 tuple 반환

```
m = re.match('^You', source)
if m:
    print(m.group()) # You
```

* 문자열이 `You`로 시작하는지 확인

```
m = re.match('Frank', source)
if m:
    print(m.group()) # 출력값 없음
```

* match()는 패턴이 source의 처음에 있는 경우에만 동작한다.


m = re.search('Frank', source)
if m:
    print(m.group())

m = re.match('.*Frank', source)
if m:
    print(m.group())

m = re.findall('n', source)
print(m)
print('Found', len(m), 'matches')

m = re.findall('n.', source)
print(m)

m = re.findall('n.?', source)