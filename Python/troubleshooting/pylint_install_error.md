# python troubles

## virualenv 환경에서 pip install error

Python 3.4.6 가상환경에서 `pip install pylint`를 했는데 다음과 같은 오류가 발생했다.

```
Command "python setup.py egg_info" failed with error code 1 in /private/var/folders/sx/cmc3vqt14812bfhdbsj_gt9w0000gn/T/pip-build-pbrgcj5c/lazy-object-proxy/
```

매우 당황...

pip에서 에러가 발생하는 경우는 본 적이 거의 없어서...

구글링 시작


Distribute has been merged into Setuptools as of version 0.7. If you are using a version <=0.6, upgrade using `pip install --upgrade setuptools` or `easy_install -U setuptools`.


이런 내용은 stackoverflow에서 발견

바로 시도했다.

```
(venv34) $ pip install --upgrade setuptools
Collecting setuptools
  Downloading setuptools-34.3.2-py2.py3-none-any.whl (389kB)
    100% |████████████████████████████████| 399kB 2.7MB/s
Collecting packaging>=16.8 (from setuptools)
  Downloading packaging-16.8-py2.py3-none-any.whl
Collecting appdirs>=1.4.0 (from setuptools)
  Downloading appdirs-1.4.3-py2.py3-none-any.whl
Collecting six>=1.6.0 (from setuptools)
  Using cached six-1.10.0-py2.py3-none-any.whl
Collecting pyparsing (from packaging>=16.8->setuptools)
  Downloading pyparsing-2.2.0-py2.py3-none-any.whl (56kB)
    100% |████████████████████████████████| 61kB 6.5MB/s
Installing collected packages: six, pyparsing, packaging, appdirs, setuptools
  Found existing installation: setuptools 28.8.0
    Uninstalling setuptools-28.8.0:
      Successfully uninstalled setuptools-28.8.0
Successfully installed appdirs-1.4.3 packaging-16.8 pyparsing-2.2.0 setuptools-34.3.2 six-1.10.0
```

그리고 다시 pylint install try

```
(venv34) $ pip install pylint
Collecting pylint
  Using cached pylint-1.6.5-py2.py3-none-any.whl
Collecting astroid<1.5.0,>=1.4.5 (from pylint)
  Using cached astroid-1.4.9-py2.py3-none-any.whl
Collecting mccabe (from pylint)
  Using cached mccabe-0.6.1-py2.py3-none-any.whl
Collecting isort>=4.2.5 (from pylint)
  Using cached isort-4.2.5-py2.py3-none-any.whl
Requirement already satisfied: six in /Users/.pyenv/versions/3.4.6/envs/venv34/lib/python3.4/site-packages (from pylint)
Collecting lazy-object-proxy (from astroid<1.5.0,>=1.4.5->pylint)
  Using cached lazy-object-proxy-1.2.2.tar.gz
Collecting wrapt (from astroid<1.5.0,>=1.4.5->pylint)
  Using cached wrapt-1.10.10.tar.gz
Installing collected packages: lazy-object-proxy, wrapt, astroid, mccabe, isort, pylint
  Running setup.py install for lazy-object-proxy ... done
  Running setup.py install for wrapt ... done
Successfully installed astroid-1.4.9 isort-4.2.5 lazy-object-proxy-1.2.2 mccabe-0.6.1 pylint-1.6.5 wrapt-1.10.10
```

pylint 설치 성공!
