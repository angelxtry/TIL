# anaconda 환경에서 pylint 설치시 UnicodeDecodeError 처리

* pylint를 설치하는 과정에서 다음과 같은 에러를 만났다.

```
Collecting pylint
  Downloading pylint-1.8.2-py2.py3-none-any.whl (689kB)
    100% |████████████████████████████████| 696kB 1.9MB/s
Collecting isort>=4.2.5 (from pylint)
  Downloading isort-4.3.3-py3-none-any.whl (45kB)
    100% |████████████████████████████████| 51kB 2.2MB/s
Requirement already satisfied: colorama; sys_platform == "win32" in c:\anaconda3\envs\py36practice\lib\site-packages (from pylint)
Collecting astroid<2.0,>=1.6 (from pylint)
  Downloading astroid-1.6.1-py2.py3-none-any.whl (288kB)
    100% |████████████████████████████████| 296kB 2.0MB/s
Collecting mccabe (from pylint)
  Downloading mccabe-0.6.1-py2.py3-none-any.whl
Requirement already satisfied: six in c:\anaconda3\envs\py36practice\lib\site-packages (from pylint)
Collecting lazy-object-proxy (from astroid<2.0,>=1.6->pylint)
  Downloading lazy_object_proxy-1.3.1-cp36-cp36m-win32.whl
Collecting wrapt (from astroid<2.0,>=1.6->pylint)
  Downloading wrapt-1.10.11.tar.gz
Building wheels for collected packages: wrapt
  Running setup.py bdist_wheel for wrapt ... error
  Failed building wheel for wrapt
  Running setup.py clean for wrapt
Failed to build wrapt
Installing collected packages: isort, lazy-object-proxy, wrapt, astroid, mccabe, pylint
  Running setup.py install for wrapt ... error
Exception:
Traceback (most recent call last):
  File "C:\Anaconda3\envs\py36practice\lib\site-packages\pip\compat\__init__.py", line 73, in console_to_str
    return s.decode(sys.__stdout__.encoding)
UnicodeDecodeError: 'utf-8' codec can't decode byte 0xb6 in position 67: invalid start byte

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "C:\Anaconda3\envs\py36practice\lib\site-packages\pip\basecommand.py", line 215, in main
    status = self.run(options, args)
  File "C:\Anaconda3\envs\py36practice\lib\site-packages\pip\commands\install.py", line 342, in run
    prefix=options.prefix_path,
  File "C:\Anaconda3\envs\py36practice\lib\site-packages\pip\req\req_set.py", line 784, in install
    **kwargs
  File "C:\Anaconda3\envs\py36practice\lib\site-packages\pip\req\req_install.py", line 878, in install
    spinner=spinner,
  File "C:\Anaconda3\envs\py36practice\lib\site-packages\pip\utils\__init__.py", line 676, in call_subprocess
    line = console_to_str(proc.stdout.readline())
  File "C:\Anaconda3\envs\py36practice\lib\site-packages\pip\compat\__init__.py", line 75, in console_to_str
    return s.decode('utf_8')
UnicodeDecodeError: 'utf-8' codec can't decode byte 0xb6 in position 67: invalid start byte
```

* 문제가 발생한 `site-packages\pip\compat\__init__.py` 파일을 오픈

* 다음과 같이 변경했다.

* before
```py
if sys.version_info >= (3,):
    def console_to_str(s):
        try:
            return s.decode(sys.__stdout__.encoding)
        except UnicodeDecodeError:
            return s.decode('utf_8')
```

* after
```py
if sys.version_info >= (3,):
    def console_to_str(s):
        try:
            return s.decode('utf_8')
        except UnicodeDecodeError:
            return s.decode('cp949')
```

* 다시 pylint 설치 시도 -> 성공!
