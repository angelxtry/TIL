# 소소한 팁

## vscode vim 환경에서 여러 줄 주석

`visual mode`로 여러 줄 선택 후 `ctrl + /`

## vscode pylint 활성화

settings.json 파일에 추가

```json
"python.pythonPath": "각 가상환경에 맞는 PATH",
"python.linting.enabled": true
```

## vscode python lint 활성화 시 외부 라이브러리 `unable to import ...`

settings.json 파일의 python.pythonPath 확인

가상환경에서 `pip install pylint`

## 빈 리스트 empty list 확인

```py
if not empty_list:
    pass
```

* empty dictionary도 동일하다.

## windows에서 출력데이터에 unicode 또는 cp949에 없는 문자열이 포함되어 있을 경우

`print(html.encode('cp949', 'ignore'))`

encode함수에 ignore 옵션을 활용한다.

## pip freeze > requirements.txt

현재 사용중인 환경에 설치된 패키지와 버전을 확인하여 requirements.txt 파일을 생성

동일하게 환경을 설정하려면

```py
pip freeze > requirements.txt

pip install -r requirements.txt
```

## 문자열에서 특정 단어 제거하기

```py
import re

TO_REMOVE = ['python', 'ruby']
re_remove = re.compile('|'.join(TO_REMOVE))
re_remove.sub('', 'python scala ruby')

# ' scala '
```

## windows에 cx_Oracle 설치

현재 pip로 설치가능한 버전은

5.1.3, 5.2, 5.2.1, 5.3, 6.0b1, 6.0b2, 6.0rc1

5.3 부터는 Oracle 11.2 이상의 client가 필요하다.

5.2.1 설치

`pip install cx_Oracle==5.2.1`

## cx_Oracle 한글 사용시 encoding 문제

기존에 잘 사용하고 있었던 코드인데 OS를 다시 설치했더니 문제가 생겼다.

```
cursor.prepare(query)  
```

query string에 한글이 들어있을때 위 코드에서 다음과 같은 에러가 발생했다.

`UnicodeEncodeError: 'ascii' codec can't encode characters in position 743-745: ordinal not in range(128)`

해결책은 다음의 블로그에서 찾았다.

https://haandol.wordpress.com/2014/06/25/cx_oracle-insert-unicode/

```
간단히 정리하면 cx_Oracle 모듈로 오라클에 한글을 입력할 때는

커넥션을 열기전에 서버의 NLS_LANG 정보에 맞춰서 os.environ에 등록이 필요하다.
```

```py
import os
import cx_Oracle

os.environ["NLS_LANG"] = ".AL32UTF8"
# CP949의 경우 .KO16MSWIN949
```

## Windows 예약작업으로 py파일 실행

예약작업 실행

`control schedtasks`

```
프로그램/스크립트: [경로]python.exe
인수추가: [경로]xxx.py
시작위치: [경로]
```

프로그램에 pythonw.exe를 선택할 수도 있다.

pythonw.exe를 cmd 창이 나타나지 않아 더 효율적일 수도 있지만

windows에서는 process가 깔끔하게 종료되지 않는 경우가 있어 python.exe로 선택.

python.exe는 프로그램이 실행되는 동안 cmd창이 떠 있다.

시작위치는 왜 필요한지 잘 모르겠다.

파일을 생성하는 프로그램을 실행했는데 절대경로를 사용했는데도 불구하고 

시작위치가 없으면 파일이 제대로 생성되지 않았다.

## DB Select

```py
    query = "QUERY"
    db_con = db_connection.connect_db()
    cursor = db_con.cursor()
    cursor.prepare(query)
    cursor.execute(None, {'PARAM': target_date})
    row = cursor.fetchone()
    cursor.close()
    db_con.close()
```

## DB Select 2

```py
    query = "QUERY"
    db_con = db_connection.connect_db()
    cursor = db_con.cursor()
    cursor.prepare(query)
    cursor.execute(None, {'PARAM': param})
    rows = cursor.fetchall()
    cursor.close()
    db_con.close()
```
