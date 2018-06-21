# 설치시 설정한 password 분실 시 변경 방법

- `PostgreSQL\9.6\scripts\runpsql.bat` 실행

```cmd
Server [localhost]:
Database [postgres]:
Port [5432]:
Username [postgres]:
psql (9.6.3)
도움말을 보려면 "help"를 입력하십시오.

postgres=#
```

```sql
ALTER USER postgres WITH PASSWORD 'passwd';
```

- 위의 query로 password를 변경한다.
