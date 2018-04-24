# pyenv, virtualenv, autoenv를 이용한 Python 개발 환경 구축

`pyenv` : Simple Python Version Management

- 로컬에 다양한 파이썬 버전을 설치하고 사용할 수 있다.

`virtualenv` : Virtual Python Environment builder

- 패키지 의존성을 해결하기 위해 사용
- 가상환경에서 설치한 패키지는 로컬이나 다른 가상환경에 영향을 주지 않는다.

`autoenv` :

- 특정 프로젝트 디렉토리로 들어가면 자동으로 개발환경을 설정

## pyenv

### pyenv 설치

```cmd
brew update
brew install pyenv
echo 'eval "$(pyenv init -)"' >> ~/.bash_profile
```

### pyenv 사용법

#### `pyenv version`

- 지금 사용하고 있는 파이썬의 버전 확인
- 따로 설정하지 않았다면 system에 설치되어 있는 파이썬을 사용하고 있다고 알려준다.

```cmd
$ pyenv version
system (set by /Users/USERNAME/.pyenv/version)
$ python --version
Python 2.7.10
```

#### `pyenv versions`

- 설치된 파이썬 리스트 확인

```cmd
$ pyenv versions
* system (set by /Users/USERNAME/.pyenv/version)
  3.6.0
```

#### `pyenv install --list`

- 설치 가능한 리스트를 출력

```cmd
$ pyenv install --list
Available versions:
  ...
  2.7.4
  2.7.5
  2.7.6
  2.7.7
  2.7.8
  2.7.9
  2.7.10
  2.7.11
  2.7.12
  2.7.13
  ...
  3.4.6
  3.4.6rc1
  3.5.0
  3.5-dev
  3.5.1
  3.5.2
  3.5.3
  3.5.3rc1
  3.6.0
  3.6-dev
  3.7-dev
  anaconda-1.4.0
  ...
```

#### `pyenv install version`

- version을 설치한다. 예를들어 pyenv install 3.4.6 이라고 입력하면 설치된다.

#### `pyenv shell version`

- 특정 version으로 변경

```cmd
$ python --version
Python 2.7.10
$ pyenv shell 3.6.0
$ python --version
Python 3.6.0
$ pyenv versions
  system
* 3.6.0 (set by PYENV_VERSION environment variable)
```

## virtualenv

### virtualenv 설치

```cmd
brew install pyenv-virtualenv
echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bash_profile
```

- virtualenv 는 단독 패키지도 있다.
- pyenv-virtualenv를 설치했다.
- `.bash_profile` 에 `pyenv`를 설치할 때 입력했던 `$ echo 'eval "$(pyenv init -)"' >> ~/.bash_profile` 도 남아있어야 한다.

### virtualenv 사용법

#### `pyenv virtualenv VERSION VIRTUAL_ENV_NAME`

- Virtual Environment 생성

```cmd
$ pyenv virtualenv 3.4.6 ex-virtualenv-3.4.6
pyenv-virtualenv: `3.4.6' is not installed in pyenv.
$ pyenv virtualenv 3.6.0 ex-virtualenv-3.6.0
Requirement already satisfied: setuptools in /Users/USERNAME/.pyenv/versions/3.6.0/envs/ex-virtualenv-3.6.0/lib/python3.6/site-packages
Requirement already satisfied: pip in /Users/USERNAME/.pyenv/versions/3.6.0/envs/ex-virtualenv-3.6.0/lib/python3.6/site-packages
```

- ex-virtualenv-3.4.6 을 생성시도 -> 3.4.6 버전이 없다고 에러 메시지가 출력된다.
- ex-virtualenv-3.6.0 생성 성공

#### `pyenv virtualenvs`

- Virtual Environment 생성 확인

```cmd
$ pyenv virtualenvs
  3.6.0/envs/ex-virtualenv-3.6.0 (created from /Users/USERNAME/.pyenv/versions/3.6.0)
  ex-virtualenv-3.6.0 (created from /Users/USERNAME/.pyenv/versions/3.6.0)
```

- 두 개 생성된 거 아니다. 짧은 것은 symlink 다.

#### `pyenv virtualenv VIRTUAL_ENV_NAME`

- 다음과 같이 단축 명령어 `pyenv virtualenv VIRTUAL_ENV_NAME`로 가상환경을 생성할 수도 있다.
- 단축 명령어로 생성할 경우 현재 선택한 python version으로 가상환경이 생성된다.

```cmd
$ pyenv versions
* system (set by /Users/USERNAME/.pyenv/version)
  3.4.6
  3.6.0
  3.6.0/envs/ex-virtualenv-3.6.0
  ex-virtualenv-3.6.0
```

- `pyenv versions`으로 설치되어있는 버전 확인

```cmd
$ pyenv shell 3.4.6
$ pyenv versions
  system
* 3.4.6 (set by PYENV_VERSION environment variable)
  3.6.0
  3.6.0/envs/ex-virtualenv-3.6.0
  ex-virtualenv-3.6.0
```

- `pyenv shell 3.4.6`으로 버전 변경

```cmd
$ pyenv virtualenv venv34
Requirement already satisfied: setuptools in /Users/USERNAME/.pyenv/versions/3.4.6/envs/venv34/lib/python3.4/site-packages
Requirement already satisfied: pip in /Users/USERNAME/.pyenv/versions/3.4.6/envs/venv34/lib/python3.4/site-packages
$ pyenv virtualenvs
  3.4.6/envs/venv34 (created from /Users/USERNAME/.pyenv/versions/3.4.6)
  3.6.0/envs/ex-virtualenv-3.6.0 (created from /Users/USERNAME/.pyenv/versions/3.6.0)
  ex-virtualenv-3.6.0 (created from /Users/USERNAME/.pyenv/versions/3.6.0)
  venv34 (created from /Users/USERNAME/.pyenv/versions/3.4.6)
```

#### `pyenv shell VIRTUAL_ENV_NAME`

- 생성한 virtuelenv를 실행한다.

```cmd
$ pyenv shell venv34
(venv34) $
```

#### `pyenv activate VIRTUAL_ENV_NAME`, `pyenv deactivate`

- 간단하게 가상환경을 실행하고, 호스트 환경으로 돌아갈 수 있다.

```cmd
(venv34) $ pyenv shell system
$ pyenv activate venv34
pyenv-virtualenv: prompt changing will be removed from future release. configure `export PYENV_VIRTUALENV_DISABLE_PROMPT=1' to simulate the behavior.
(venv34) $ pyenv deactivate
$
```

- 가상환경이 실행되면 완전히 독립된 개발환경이다.
- `pip install`로 package를 설치하더라도 완전히 독립적으로 동작한다.
- 호스트에 이미 설치되어있는 package도 다시 설치해야 한다.

#### `pyenv uninstall VIRTUAL_ENV_NAME`

- 가상환경 삭제

## autoenv

### autoenv 설치

```cmd
brew install autoenv
echo "source $(brew --prefix autoenv)/activate.sh" >> ~/.bash_profile
```

### autoenv 사용법

- 특정 디렉토리 내에 .env 파일을 생성하고 실행하고자 하는 스크립트를 기록한다.
- 해당 디렉토리로 이동하면(`cd DIR_NAME`) 자동으로 스크립트가 실행된다.

```cmd
$ cat projects/python_study/.env
echo "***********************************"
echo "Python Virtual Env > Python 3.4.6"
echo "***********************************"
pyenv activate venv34
```
