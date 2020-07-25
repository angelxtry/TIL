# aws server setting

## install

sudo apt-get update
sudo apt-get install -y build-essential

curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash --
sudo apt-get install -y nodejs

sudo apt install yarn

sudo apt-get install postgresql-client

psql -h read-and-review-db.ctqe8w7mhz3v.ap-northeast-2.rds.amazonaws.com -p 5432 -U angelxroot postgres

CREATE DATABASE read-and-review OWNER angelxroot ENCODING 'utf-8';

sudo npm i -g pm2

## git

git pull
git reset --hard

## 서버이관

1.install

2.git pull

3.npm i

4.npm i -g sequelize-cli

5.npm i -g pm2

6.npm start

7.테스트 접속

8.ip변경

9.최종 확인

## mysql

sudo apt-get install -y mysql-server

mysql_secure_installation

pw: flex01

sudo systemctl start mysql

sudo systemctl enable mysql

sudo /usr/bin/mysql -u root -p

ALTER USER 'root'@'localhost' IDENTIFIED BY 'flex01';

UPDATE mysql.user SET authentication_string=password('flex01') WHERE user='root';

FLUSH PRIVILEGES;

이렇게 설정해도 접속이 안될 수 있다.

sudo mysql로 접속하면 일단 접속이 가능하다.

USE mysql;
SELECT User, Host, plugin FROM mysql.user;


+------------------+-----------+-----------------------+
| User             | Host      | plugin                |
+------------------+-----------+-----------------------+
| root             | localhost | auth_socket           |
| mysql.session    | localhost | mysql_native_password |
| mysql.sys        | localhost | mysql_native_password |
| debian-sys-maint | localhost | mysql_native_password |
+------------------+-----------+-----------------------+
4 rows in set (0.00 sec)

root가 auth_socket으로 되어있다.

이 값을 mysql_native_password로 변경하면 로그인이 가능하다.

update user set plugin='mysql_native_password' where user='root';

flush privileges;

select user, host, plugin from user;

+------------------+-----------+-----------------------+
| User             | Host      | plugin                |
+------------------+-----------+-----------------------+
| root             | localhost | mysql_native_password |
| mysql.session    | localhost | mysql_native_password |
| mysql.sys        | localhost | mysql_native_password |
| debian-sys-maint | localhost | mysql_native_password |
+------------------+-----------+-----------------------+
4 rows in set (0.00 sec)

