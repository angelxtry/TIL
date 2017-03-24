# Introducing Python

## 바이트와 배열

바이트는 튜플처럼 immutable

바이트 배열은 리스트처럼 mutable

```python
blist = [1, 2, 3, 255]
the_bytes = bytes(blist)
print(the_bytes)
# b'\x01\x02\x03\xff'

the_byte_array = bytearray(blist)
print(the_byte_array)
#bytearray(b'\x01\x02\x03\xff')
```

바이트 값은 b로 시작하고 인용부호가 따라온다.

인용부호 안에는 16진수 시퀀스가 온다.

바이트 변수인 the_bytes를 변경하려고 하면 `TypeError`가 발생한다.

## 파일 입출력

파일은 파일 이름으로 저장된 바이트 시퀀스다.

```python
poem = '''This is file in/out test. 한글은 어떻게 될까?'''

fout = open('FileName', 'w')
count_bytes = fout.write(poem)
fout.close()

print(count_bytes)
# 37
```

write() 함수는 파일에 쓴 바이트 수를 반환한다.

write() 함수는 print() 함수처럼 스페이스나 줄바꿈을 추가하지 않는다.

```python
poem = '''This is file in/out test. 한글은 어떻게 될까?'''

fout = open('FileName', 'w')
print(poem, file=fout)
fout.close()
```

print()는 각 인자 뒤에 스페이스를, 끝에 줄바꿈을 추가한다.

print()를 write()처럼 작동하게 하려면 print()에 다음의 인자를 추가한다.

sep(구분자-seperator)

end(문자열의 끝-end string)

```python
print(poem, file=fout, sep='', end='')
```

파일에 쓸 문자열이 크면 특정 단위(chunk)로 나누어서 파일에 쓴다.
```python
poem = """
Do Not Go Gentle into That Good Night

Do not go gentle into that good night,
Old age should burn and rave at close of day;
Rage, rage against the dying of the light.
Though wise men at their end know dark is right,
Because their words had forked no lightning they
Do not go gentle into that good night.
Good men, the last wave by, crying how bright
Their frail deeds might have danced in a green bay,
Rage, rage against the dying of the light.
Wild men who caught and sang the sun in flight,
And learn, too late, they grieved it on its way,
Do not go gentle into that good night.
Grave men, near death, who see with blinding sight
Blind eyes could blaze like meteors and be gay,
Rage, rage against the dying of the light.
And you, my father, there on the sad height,
Curse, bless, me now with your fierce tears, I pray.
Do not go gentle into that good night.
Rage, rage against the dying of the light.
"""

fout = open('FileName.txt', 'w')
size = len(poem)
offset = 0
chunk = 100
while True:
    if offset > size:
        break
    count = fout.write(poem[offset:offset+chunk])
    print(count)
    offset += chunk
```
* 위와 같이 실행하면 100byte 단위로 나누어서 파일에 기록한다.

```python
fout = open('FileName.txt', 'x')
```

* `x`모드로 파일을 open했을 때 이미 파일이 존재하면 `FileExistsError` 예외가 발생한다.

## 텍스트 파일 읽기

`read()` 함수는 파일을 한번에 읽는다.

파일의 크기가 크다면 메모리를 지나치게 많이 소비할 수 있으므로 주의해야 한다.

`read()` 함수에 최대 문자수를 인자로 전달하여 한 번에 얼마만큼 읽을 것인지 크기를 제한할 수 있다.

```py
poem = ''
fin = open('FileName.txt', 'r')
chunk = 100
while True:
    fragment = fin.read(chunk)
    if not fragment:
        break
    poem += fragment
fin.close()
print(len(poem))
```
* 파일을 다 읽어서 끝에 도달하면 `read()` 함수는 빈 문자열(`''`)을 반환한다.

* 빈 문자열일 경우 fragment는 `False`가 되고 `not False`는 결국 `True`가 된다.

`readline()` 함수를 사용하여 파일을 라인 단위로 읽을 수 있다.

```py
poem = ''
fin = open('FileName.txt', 'r')
while True:
    line = fin.readline()
    if not line:
        break
    poem += line
fin.close()
print(len(poem))
```
* 텍스트 파일의 빈 라인의 길이는 1(`'\n'`)이고 이것은 `True`로 판단한다.

* 파일의 끝에 도달했을 때 `readline()` 함수도 `False`로 간주되는 빈 문자열을 반환한다.

텍스트 파일을 가장 읽기 쉬운 방법은 `iterator`를 사용하는 것이다.

`iterator`는 한 번에 한 라인씩 반환한다.

```py
poem = ''
fin = open('FileName.txt', 'r')
for line in fin:
    poem += line
fin.close()
print(len(poem))
```

`readlines()` 함수는 한 번에 모든 라인을 읽고, 한 라인으로 된 문자열들의 리스트를 반환한다.

```py
fin = open('FileName.txt', 'r')
lines = fin.readlines()
fin.close()
print(len(lines), 'lines read')
for line in lines:
    print(line, end='')
```

모드에 `'b'`를 포함시키면 파일을 이진 모드로 연다.

이 경우 문자열 대신 파이트를 읽고 쓸 수 있다.

파이썬에는 context manager가 있다.

context manager를 실행하면 코드 블록의 코드가 실행되고 나서(잘 수행되거나, 문제가 있는 경우 예외를 발생하고 나서) 자동으로 파일을 닫아준다.

## CSV

```py
import csv
bond = [['KRYZMBD67V05', '20181026'],
        ['KRYZMBD67V06', '20181026'],
        ['KRYZMBD67V07', '20181026'],
        ['KRYZMBD67V08', '20191026'],
        ['KRYZMBD67V09', '20191026']]

with open('bond', 'w', newline='') as fout:
    csvout = csv.writer(fout)
    csvout.writerows(bond)

with open('bond', 'r') as fin:
    cin = csv.reader(fin)
    bonds = [row for row in cin]
print(bonds)
```

중첩 리스트 구조로 되어 있는 문자열들을 csv 형식으로 출력할 수 있다.

그리고 csv 형식의 텍스트 파일을 읽어 중첩 리스트 구조로도 변환할 수 있다.

