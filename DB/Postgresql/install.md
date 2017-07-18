# Postgresql 설치

Version : postgresql-9.6.3-2-windows-x64

디폴트로 설정하였다면 psql로 접속하기 위해 다음과 같이 입력한다.

## CLI 접속

`psql -U postgres`

-U 옵션을 사용하지 않으면 windows에 로그인한 계정으로 접속을 시도한다.


## 계정생성 및 권한부여

`psql`로 접속하여 계정을 생성한다.

먼저 등록되어있는 USER들을 확인한다.

`select * from pg_shadow;`

postgres=# select * from pg_shadow;
  usename  | usesysid | usecreatedb | usesuper | userepl | usebypassrls |               passwd                | valuntil | useconfig
-----------+----------+-------------+----------+---------+--------------+-------------------------------------+----------+-----------
 postgres  |       10 | t           | t        | t       | t            | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx |          |


 user를 생성한다.

 `create user test1;`

  usename  | usesysid | usecreatedb | usesuper | userepl | usebypassrls |               passwd                | valuntil | useconfig
-----------+----------+-------------+----------+---------+--------------+-------------------------------------+----------+-----------
 postgres  |       10 | t           | t        | t       | t            | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx|          |
 test1     |    16394 | f           | f        | f       | f            |                                     |          |


password를 변경한다.

`alter user test1 with password 'PASSWORD';`

  usename  | usesysid | usecreatedb | usesuper | userepl | usebypassrls |               passwd                | valuntil | useconfig
-----------+----------+-------------+----------+---------+--------------+-------------------------------------+----------+-----------
 postgres  |       10 | t           | t        | t       | t            | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx |          |
 test1     |    16394 | f           | f        | f       | f            | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx |          |


django orm을 이용하여 postgresql에 접근할 것이므로 createdb 권한을 부여한다.

`alter user test1 with createdb`

postgres=# \du

                                 롤 목록
  롤 이름  |                       속성                       | 소속 그룹:
----------+--------------------------------------------------+------------
 postgres | 슈퍼유저, 롤 만들기, DB 만들기, 복제, Bypass RLS   | {}
 test1    | DB 만들기                                        | {}

postgres=# select * from pg_shadow;

 usename  | usesysid | usecreatedb | usesuper | userepl | usebypassrls |               passwd                | valuntil | useconfig
----------+----------+-------------+----------+---------+--------------+-------------------------------------+----------+-----------
 postgres |       10 | t           | t        | t       | t            | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx |          |
 test1    |    16393 | t           | f        | f       | f            | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx |          |


## DB 생성

`create database testproj;`

postgres=# \l

                                      데이터베이스 목록
    이름    |  소유주  | 인코딩 |     Collate      |      Ctype       |      액세스 권한
-----------+----------+--------+------------------+------------------+-----------------------
 postgres  | postgres | UTF8   | Korean_Korea.949 | Korean_Korea.949 |
 template0 | postgres | UTF8   | Korean_Korea.949 | Korean_Korea.949 | =c/postgres          +
           |          |        |                  |                  | postgres=CTc/postgres
 template1 | postgres | UTF8   | Korean_Korea.949 | Korean_Korea.949 | =c/postgres          +
           |          |        |                  |                  | postgres=CTc/postgres
 testproj  | postgres | UTF8   | Korean_Korea.949 | Korean_Korea.949 |

## DB 권한 부여

`grant all privileges on database testproj to test1;`

postgres=# \l

                                      데이터베이스 목록
    이름    |  소유주  | 인코딩 |     Collate      |      Ctype       |      액세스 권한
-----------+----------+--------+------------------+------------------+-----------------------
 postgres  | postgres | UTF8   | Korean_Korea.949 | Korean_Korea.949 |
 template0 | postgres | UTF8   | Korean_Korea.949 | Korean_Korea.949 | =c/postgres          +
           |          |        |                  |                  | postgres=CTc/postgres
 template1 | postgres | UTF8   | Korean_Korea.949 | Korean_Korea.949 | =c/postgres          +
           |          |        |                  |                  | postgres=CTc/postgres
 testproj  | postgres | UTF8   | Korean_Korea.949 | Korean_Korea.949 | =Tc/postgres         +
           |          |        |                  |                  | postgres=CTc/postgres+
           |          |        |                  |                  | test1=CTc/postgres



여기까지.

일단 django로 DB접근 권한을 확인한다.
