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