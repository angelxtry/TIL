# Django Girls 01. 기본 환경 설정

Django를 다시 공부하기 시작했다.

목표는 잘했어요 노트를 웹으로 구현하는 것. 그리고 그 과정을 자세히 글로 남기는 것이다.

그 시작으로 Django Girls로 Django에 대한 감을 잡아보려고 한다.

Django Girls 튜토리얼에서 앞부분은 건너뛰고 [장고 설치하기](https://tutorial.djangogirls.org/ko/django_installation/)부터 시작한다.

pyenv를 이용하여 Python 최신 버전을 확인한다.

```cmd
pyenv install --list
```

최신 버전이 리스트에 없다면 pyenv를 update한다.

```cmd
pyenv update
```

Python 최신 버전은 3.7.2다. 설치하자.

```cmd
pyenv install 3.7.2
```

설치가 다 되었다면 가상환경을 만든다.

Django Girls를 공부할 예정이므로 가상환경 이름도 DjangoGirls로 만들자.

```cmd
pyenv virtualenv 3.7.2 DjangoGirls
```

가상환경이 만들어졌다.

DjangoGirls 디렉토리를 만든다.

```cmd
mkdir DjangoGirls
```

DjangoGirls 가상환경을 실행한다.

```cmd
pyenv shell DjangoGirls
```

가상환경이 잘 실행되었는지 확인하기 위해 Python 버전과 pip list를 확인해본다.

```cmd
python --version

pip list
```

Python 버전은 3.7.2, pip list에는 설치된 것이 거의 없고 pip를 upgrade하라는 메시지가 보인다.

upgrade 하자.

```cmd
pip install --upgrade pip
```

이제 Django를 설치한다.

2.2 버전이 LTS이므로 설치한다.

```cmd
pip install Django==2.2
```

너무 최신 버전을 설치한 건 아닌가 살짝 걱정이 되기도 한다.

설치된 Django의 버전을 다시 한번 확인해보자.

```cmd
python -c "import django; print(django.get_version())
```

2.2라고 출력된다.

pip를 실행한 김에 필요한 패키지를 몇 개 설치하자.

일단 pylint, pytest, pylava를 설치한다.

기본적인 설치가 완료되었다.

이제 django project를 생성한다.
