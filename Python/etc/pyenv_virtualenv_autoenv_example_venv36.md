# pyenv virtualenv autoenv example venv36

python 3.6 버전으로 테스트를 할 일이 생겼다.

3.6.0 버전으로 가상환경을 만들어보자.

```
$ pyenv virtualenv 3.6.0 venv36
Requirement already satisfied: setuptools in /Users/.pyenv/versions/3.6.0/envs/venv36/lib/python3.6/site-packages
Requirement already satisfied: pip in /Users/.pyenv/versions/3.6.0/envs/venv36/lib/python3.6/site-packages
```

이미 3.6.0 버전이 존재한다고 출력된다.

projects/pyvenv36 디렉토리에 .env 파일 생성

```
echo "***********************************"
echo "Python Virtual Env > Python 3.6.0"
echo "***********************************"
pyenv activate venv36
```

해당 폴더에 진입하면 자동으로 3.6.0 버전의 가상환경이 실행된다.

```
$ cd pyvenv36/
autoenv:
autoenv: WARNING:
autoenv: This is the first time you are about to source /Users/projects/pyvenv36/.env:
autoenv:
autoenv:   --- (begin contents) ---------------------------------------
autoenv:     echo "***********************************"$
autoenv:     echo "Python Virtual Env > Python 3.6.0"$
autoenv:     echo "***********************************"$
autoenv:     pyenv activate venv36$
autoenv:
autoenv:   --- (end contents) -----------------------------------------
autoenv:
autoenv: Are you sure you want to allow this? (y/N) y
***********************************
Python Virtual Env > Python 3.6.0
***********************************
pyenv-virtualenv: prompt changing will be removed from future release. configure `export PYENV_VIRTUALENV_DISABLE_PROMPT=1' to simulate the behavior.
```

버전 확인
```
(venv36) pyvenv36 $ python --version
Python 3.6.0
```

pylint 설치

```
(venv36) pyvenv36 $ pip install pylint
Collecting pylint
  Using cached pylint-1.6.5-py2.py3-none-any.whl
Collecting six (from pylint)
  Using cached six-1.10.0-py2.py3-none-any.whl
Collecting isort>=4.2.5 (from pylint)
  Using cached isort-4.2.5-py2.py3-none-any.whl
Collecting astroid<1.5.0,>=1.4.5 (from pylint)
  Using cached astroid-1.4.9-py2.py3-none-any.whl
Collecting mccabe (from pylint)
  Using cached mccabe-0.6.1-py2.py3-none-any.whl
Collecting wrapt (from astroid<1.5.0,>=1.4.5->pylint)
  Using cached wrapt-1.10.10.tar.gz
Collecting lazy-object-proxy (from astroid<1.5.0,>=1.4.5->pylint)
  Using cached lazy-object-proxy-1.2.2.tar.gz
Installing collected packages: six, isort, wrapt, lazy-object-proxy, astroid, mccabe, pylint
  Running setup.py install for wrapt ... done
  Running setup.py install for lazy-object-proxy ... done
Successfully installed astroid-1.4.9 isort-4.2.5 lazy-object-proxy-1.2.2 mccabe-0.6.1 pylint-1.6.5 six-1.10.0 wrapt-1.10.10
```

vscode 설정

python path 설정

`shift+cmd+p` -> `open workspace settings`

```json
{
    "editor.rulers": [80,100],
    "python.pythonPath":"/Users/.pyenv/versions/venv36/bin/python",
    "python.linting.enabled": true,
    "python.autoComplete.extraPaths":[]
}
```

task runner 설정

`shift+cmd+b` -> `other`

```json
{
    "version": "0.1.0",
    "command": "python",
    "isShellCommand": true,
    "args": ["${file}"],
    "showOutput": "always"
}
```