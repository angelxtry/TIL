# cx_Oracle tip

## windows에 cx_Oracle 설치

현재 pip로 설치가능한 버전은

5.1.3, 5.2, 5.2.1, 5.3, 6.0b1, 6.0b2, 6.0rc1

5.3 부터는 Oracle 11.2 이상의 client가 필요하다.

5.2.1 설치

`pip install cx_Oracle==5.2.1`

----

* 20180118 현재 Oracle client를 버전을 변경하여 재설치 한 것 때문에 cx_Oracle이 제대로 설치되지 않는다.

* `myvenv\Lib\site-packages` 경로에서 `cx_Oracle.cp36-win_amd64.pyd` 파일을 copy

* 새롭게 만드는 project 디렉토리의 `myvenv\Lib\site-packages`에 해당 파일을 paste

* 기존 project에서 `db_connection.py` 를 c&p

* 테스트를 위해 `python db_connection.py` 실행

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

## db_connection.py sample

```py
"""
DB Connection 처리
"""
import os
import cx_Oracle

def connect_db():
    """
    DB Connection 처리
    """
    os.environ["NLS_LANG"] = ".AL32UTF8"
    db_con = cx_Oracle.Connection("", "", "")
    return db_con

def main():
    query = """
        SELECT SYSDATE FROM DUAL
    """
    db_con = connect_db()
    cursor = db_con.cursor()
    cursor.prepare(query)
    cursor.execute(None)
    row = cursor.fetchone()
    print(row)
    cursor.close()
    db_con.close() 


if __name__ == '__main__':
    main()
```

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

## DB Select 3

```py
    query = "QUERY"
    db_con = db_connection.connect_db()
    cursor = db_con.cursor()
    cursor.prepare(query)
    cursor.execute(None)
    colnames = [i[0] for i in cursor.description]
    dic_grade = {}
    for row in cursor:
        dic_grade[row[0], row[2]] = dict(zip(colnames, row))
    cursor.close()
    db_con.close()
```