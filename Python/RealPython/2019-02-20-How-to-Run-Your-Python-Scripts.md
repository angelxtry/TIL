# How to Run Your Python Scripts

파이썬 개발자가 되기 위해 가장 중요한 스킬 중 하나는 코드와 스크립트를 실행할 수 있는 능력이다. 이것은 당신이 계획한 대로 코드를 동작하게 하는 방법이다. 결국 코드가 어떻게 동작하는 지 알아야 한다.

파이썬을 실행하는 방법은 다음과 같다.

os의 command line 또는 terminal에서 실행하는 것
python interactive mode
가장 선호하는 IDE나 텍스트 에디터
특정 system의 파일 시스템에서 script의 icon을 더블 클릭하는 것

## Script vs Module

script라는 단어는 순차적인 작업을 포함하는 파일이나 배치 작업 파일을 의미한다. script는 interpreter에 의해 실행된다.

파이썬 코드가 담겨 있는 파일도 script라고 한다. 하지만 이것은 top-level program 파일이다.

다른 파이썬 파일이 import 하여 불러올 목적으로 만들어진 python 파일은 module이라고 불린다.

module과 script의 가장 큰 차이는 다른 파일에 import되어 사용될 것인가 아니면 직접 실행될 것인가다.

module, scirpt로 작성된 파이썬 코드가 각각 어떻게 실행되는지 아는 것이 중요하다.

## What’s the Python Interpreter

파이썬은 interpreter라고 불리는 소프트웨어의 한 종류다.

interpreter는 program과 computer hardware 사이에서 코드를 동작시키기 위해 사용하는 소프트웨어 layer다.

파이썬 script를 실행하기 위해서 당신의 system에 interpreter를 제대로 설치하는 것이 중요하다.

interpreter는 2가지 방식으로 파이썬 코드를 실행할 수 있다.
module이나 scirpt를 실행
interactive session에서 입력한 코드를 실행

## How Does the Interpreter Run Python Scripts

파이썬 스크립트를 실행하면 다음과 같은 과정을 거친다.

1.스크립트의 문장을 순차적으로 실행한다.
2.소스 코드를 bytecode라고 불리는 intermediate format으로 compile한다.

bytecode는 platform에 종속적인 low-level language로 변환한 것이다. bytecode로 변환하는 이유는 코드 실행을 최적화하기 위해서다. interpreter는 bytecode를 실행한다.
엄밀하게 말하자면 실행되는 script를 최적화하는 것이 아니라 import된 module을 최적화 하는 것이다.

3.실행을 위해 코드를 ship off 한다.
이 시점에서 Python Virtual Machine(PVM)이 동작한다. PVM은 Python의 runtime engine이다. bytecode의 instruction이 하나씩 실행하는 것을 반복한다.
PVM은 Python interpreter의 마지막 단계다.

이것이 Python Execution Model이라고 불리는 Python script를 실행하는 전체 과정이다.

## How to Run Python Scripts Using the Command-Line

hello.py 파일을 다음과 같이 만든다.

```py
#!/usr/bin/env python3

print('Hello World!')
```

command line에서 다음과 같이 실행할 수 있다.

`python hello.py`

### Running Modules With the -m Option

Python은 다양한 command line option을 제공한다.

module을 실행하기를 원한다면 `-m` 옵션을 사용한다. `-m` 옵션을 사용하면 sys.path에서 해당 module을 찾는다. 그리고 해당 내용을 `__main__`으로 실행한다.

### Using the Script Filename

최신 버전의 Windows에서는 ​`hello.py`만 실행해도 Python script가 동작한다. Windows는 특정한 확장자를 처리하도록 system registry에 등록해 두었다.

Unix/Linux 시스템에서도 비슷하게 실행할 수 있다. `hello.py`에서 한 것처럼 파일의 첫 라인에 `#!/usr/bin/env python3` 라고 적어둔다. 이것은 해당 파일을 실행하기 위한 프로그램을 가리킨다. `#!`는 보통 hash bang 또는 shebang이라고 부른다. `#!` 뒤에 interpreter의 path를 적는다.

path는 2가지 방식을 사용한다.

1.`#!/usr/bin/python` : absolute path
2.`#!/usr/bin/env python` : os의 env command를 이용하여 PATH 변수에 설정된 Python을 찾아 실행한다.

마지막으로 script에 실행 권한을 설정하면 파일명만으로 script를 실행할 수 있다.

## How to Run Python Scripts Interactively

interactive session에서도 script와 module을 실행할 수 있다.

### Taking Advantage of import

module을 import하면 module을 load한다.

module에 classes, functions, variables, and constants definitions 만 포함되었더라도, 명시적으로 실행하지 않아도 출력 등의 명령문이 포함된 경우 그것이 실행되는 것을 볼 수 있다.

다음처럼 hello.py를 import만 해도 실행이 되어 Hello World!가 출력되는 것을 볼 수 있다.

```py
>>> import hello
Hello World!
```

import는 session당 한 번만 수행된다. import를 한 후에, 심지어 모듈을 수정해도 다시 import를 하면 아무것도 하지 않는다.
import operation은 비용이 비싸기 때문에 한번만 실행된다.

이러한 방식이 동작하기 위해서는 몇 가지 조건이 필요하다.
1.파이썬 코드는 반드시 current working directory에 있어야 한다.
2.파일은 Pythom Module Search Path(PMSP)라고 하는 경로에 있어야 한다. 파이썬은 해당 경로에서 import 하고자 하는 모듈이나 package를 찾는다.

PMSP를 확인하려면 다음과 같이 실행해보자.

```py
>>> import sys
>>> for path in sys.path:
...     print(path)
...
```

### Using importlib and imp

Python Standard Library에서 importlib를 찾을 수 있다. 이 모듈은 import_module()을 포함한다.

impoort_module()을 이용하여 import operaion의 동작을 알아볼 수 있다.

```py
>>> import importlib
>>> importlib.import_module('hello')
Hello World!
<module 'hello' from 'E:\\Projects\\PythonStudy\\hello.py'>
```

importlib.reload()를 이용하면 module을 다시 import 할 수 있다.

```py
import hello
import importlib
importlib.reload(hello)
Hello World!!
<module 'hello' from 'E:\\Projects\\PythonStudy\\hello.py'>
```

importlib.reload를 실행하기전에 import를 하지 않으면 NameError가 발생한다.
importlib.reload()는 importlib.import_module()과 달리 문자열이 아니라 모듈명을 써야 한다.
문자열을 쓰면 TypeError가 발생한다.

### Using runpy.run_module() and runpy.run_path()
