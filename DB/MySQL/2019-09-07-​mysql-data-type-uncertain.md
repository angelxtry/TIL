# mysql data type (근거불충분)

주로 사용할 것 같은 data type을 정리해봤다.

## 숫자

### 1. tinyint

1 byte
-128 ~ 127
unsigned일 경우 0 ~ 255

### 2. int

4 byte
-21억 ~ 21억
unsigned일 경우 0 ~ 42억

### 3. bigint

8 byte
–9,223,372,036,854,775,808 ~ 9,223,372,036,854,775,807
이정도의 범위라는데;; 얼마나 큰지 잘 감이 안온다.
unsigned도 알아서 생각하자.

## 문자

character set에 따라 차지하는 데이터 크기가 가변적이다.

### 1. char

고정길이
0 ~ 255
남은 공간을 공백으로 채운다.

### 2. varchar

가변길이
0 ~ 65535
검색에서 text보다 유리하다.

### 3. text

가변길이
0 ~ 65535
처음 n개까지만 인덱싱 가능

### 4. longtext

가변길이
0 ~ 4294967295

### 5. enum

ENUM(Y, N)

### 6. blob(Binary Large OBject)

가변길이
binary 데이터 저장에 유리

## 참고 사이트

[MySQL Datatype과 테이블 설계방법](https://yongji.tistory.com/23)
[MySQL 데이터 타입](https://ra2kstar.tistory.com/82)
