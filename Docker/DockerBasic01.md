# docker basic

## 버전 확인

docker version

## docker image 확인

docker images
docker images -a

## none image만 조회

docker images -f "dangling=true"

ID만 조회
docker images -f "dangling=true" -q

### rmi(image 삭제)와 연계

docker rmi (docker images -f "dangling=true" -q)

## Dockerfile을 만들어서 test

```Dockerfile
# python 3.7.2 slim image를 사용
FROM python:3.7.2-slim

# RUN 명령이 실행될 dir
WORKDIR ${PWD}/app

# 현재 경로에 있는 파일들을 지정한 경로에 mount?
ADD . /app

# 명령어 실행
RUN pip install --no-cache-dir -r requirements.txt

# 80 port를 노출?
EXPOSE 80

# 환경변수 지정
ENV NAME World

# cmd 실행
CMD ["python", "app.py"]
```

## docker image 생성

docker build -f flask-hello .

## docker 실행

docker run -p 4000:80 flask-hello

daemon으로 실행
docker run -d -p 4000:80 flask-hello

## 실행중인 container를 확인

docker container list

​docker container list -a

## 실행중인 container를 멈춤

docker stop CONTAINER ID or NAMES

## container 삭제

docker rm CONTAINER ID or NAMES
