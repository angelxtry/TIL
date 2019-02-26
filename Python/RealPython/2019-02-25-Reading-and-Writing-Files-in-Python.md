# Reading and Writing Files in Python

Python으로 파일을 읽고 쓰는 작업은 가장 흔한 작업이다.

이 튜토리얼에서 다음 항목을 배울 수 있다.

- 파일을 구성하는 것과 왜 그것들이 중요한가
- 파일을 읽고 쓰는 것의 기초

## What Is a File

modern file system에서 파일을 세 가지 주요 part로 구성된다.

1.Header
 파일 contents에 대한 metadata(파일명, 크기, 타입 등)
2.Data
 파일에 기록된 것
3.End of file
 파일의 끝을 나타내는 특수한 문자

이 구성항목들은 확장자에 따라 다르다.

### File Paths

file path는 세 가지 part로 구성된다.

1.Folder Path
2.File Name
3.Extension

### Line Endings

파일 데이터를 처리할 때 종종 마주하는 문제는 new line 또는 line ending이다.

ASA(American Standards Association)의 표준은 CR+LF(\r\n)이다.
ISO표준은 CR+LF 또는 LF다.

Windows는 CR+LF를 사용한다.
Unix와 최신의 Mac은 LF를 사용한다.

### Character Encoding

주로 쓰이는 두 가지 encoding은 ASCII와 UNICODE다.

ASCII는 128개의 문자를 이용한다.

중요한 것은 일치하지 않는 encoding으로 file을 parsing하는 것이다.

## Opening and Closing a File in Python

### Text File Types

```py
file = open('filename.txt')
type(file)

<class '_io.TextIOWrapper'>
```

### Buffered Binary File Types

binary file을 읽고 쓰려고 하면 buffered file type object가 된다.

```py
file = open('filename.txt', 'rb)
type(file)
<class '_io.BufferedReader'>

file = open('filename.txt', 'wb)
type(file)
<class '_io.BufferedWriter'>
```

### Raw File Types

low-level building block 또는 text stream을 위해 사용한다.

```py
`file = open('dog_breeds.txt', 'rb', buffering=0)
type(file)
<class '_io.FileIO'>
```

## Reading and Writing Opened Files

파일을 읽는 method는 대표적으로 세 가지가 있다.

```py
read()
readline()
readlines()
```

read(size=-1)

인자로 받은 byte만큼 파일을 읽는다.
인자가 없거나, None, -1이면 파일 전체를 읽는다.

readline(size=-1)

인자로 받은 문자의 수 만큼 라인에서 읽는다.
인자가 없거나, None, -1이면 라인 전체를 읽는다.

readlines()

라인 전체를 읽는다. 라인 전체를 한 개의 list로 만들어 반환한다. 한 라인은 list의 element가 된다.

```py
if __name__ == '__main__':
    filename = 'TheZenOfPython.txt'
    with open(filename, 'r') as reader:
        print(reader.read(5))
        print(reader.read())

# Beaut
# iful is better than ugly.
# Explicit is better than implicit.
# Simple is better than complex.
# Complex is better than complicated.
# Flat is better than nested.
# ... 파일 전체

    with open(filename, 'r') as reader:
        print(reader.readline())
# Beautiful is better than ugly.

    with open(filename, 'r') as reader:
        print(reader.readlines())
# ['Beautiful is better than ugly.\n', 'Explicit is better than implicit.\n', 'Simple is better than complex.\n', 'Complex is better than complicated.\n', 'Flat is better than nested.\n', ...]
```

### Iterating Over Each Line in the File

파일 전체의 모든 라인을 반복해서 읽는 일은 흔하다.
이런 작업은 readline()을 이용하여 처리할 수 있다. 하지만 file object 자체로 iterating 하는 것이 더 단순하다.

```py
if __name__ == '__main__':
    filename = 'TheZenOfPython.txt'
    with open(filename, 'r') as reader:
        for line in reader:
            print(line, end='')
# 파일 전체를 출력한다.
```

`print()` 함수에 end param을 이용하면 파일 그대로 출력된다.

```py
if __name__ == '__main__':
    filename = 'TheZenOfPython.txt'
    with open(filename, 'r') as reader:
        for line in reader:
            print(line)
```

end를 제거하면 각 라인마다 newline이 들어간다.

파일에 내용을 작성하기 위해 다음과 같은 함수를 사용할 수 있다.

write(string)
 파일에 string을 작성한다.

writelines(seq)
 파일에 sequence가 기록된다. 각 sequence의 끝에 ​Line Feed 같은 것이 추가되지 않는다. 필요하다면 CR 또는 LF 같은 것을 적절하게 추가해주어야 한다.

```py
with open(filename, 'r') as reader:
    zen_of_python = reader.readlines()

new_file = 'TheZenOfPython_reversed.txt'
with open(new_file, 'w') as writer:
    for line in reversed(zen_of_python):
        writer.write(line)
```

write() 메서드를 이용하여 파일을 기록했다.

```py
with open(filename, 'r') as reader:
    zen_of_python = reader.readlines()

new_file = 'TheZenOfPython_reversed.txt'
with open(new_file, 'w') as writer:
    writer.writelines(reversed(zen_of_python))
```

writelines() 메서드를 이용하여 파일에 기록했다.

### A Full Example: dos2unix.py

dos2unix.py는 `\r\n`을 `\n`으로 변환한다.

```py
import argparse
import os


def str2unix(input_str: str) -> str:
    r"""\
    Converts the string from \r\n line endings to \n

    Parameters
    ----------
    input_str
        The string whose line endings will be converted

    Returns
    -------
        The converted string
    """
    r_str = input_str.replace('\r\n', '\n')
    return r_str


def dos2unix(source_file: str, dest_file: str):
    r"""\
    Coverts a file that contains Dos like line endings into Unix like

    Parameters
    ----------
    source_file
        The path to the source file to be converted
    dest_file
        The path to the converted file for output
    """
    # NOTE: Could add file existence checking and file overwriting
    # protection
    with open(source_file, 'r') as reader:
        dos_content = reader.read()

    unix_content = str2unix(dos_content)

    with open(dest_file, 'w') as writer:
        writer.write(unix_content)


if __name__ == '__main__':
    # Create our Argument parser and set its description
    parser = argparse.ArgumentParser(
        description=\
            'Script that converts a DOS like file to an Unix like file',
    )

    # Add the arguments:
    #   - source_file: the source file we want to convert
    #   - dest_file: the destination where the output should go

    # Note: the use of the argument type of argparse.FileType could
    # streamline some things
    parser.add_argument(
        'source_file',
        help='The location of the source '
    )

    parser.add_argument(
        '--dest_file',
        help=\
            'Location of dest file '
            '(default: source_file appended with `_unix`)',
        default=None
    )

    args = parser.parse_args()
    s_file = args.source_file
    d_file = args.dest_file

    if d_file is None:
        file_path, file_extension = os.path.splitext(s_file)
        d_file = f'{file_path}_unix.{file_extension}'

    dos2unix(s_file, d_file)
```

이 코드는 크게 세 가지 부분으로 나눌 수 있다.

첫 번째는 `str2unix()`다. 이 함수는 `\r\n`을 `\n`으로 변환한다.

두 번째는 `dos2unix`다. 이 함수는 `str2unix()`를 호출한다.

마지막으로 `__main__` block이다.

## Tips and Tricks

### __file__

파일의 pathame을 return 한다. 상대경로를 사용한다.

실행되고 있는 코드의 절대 경로가 필요하다면 `os.getcwd()`를 이용한다.

### Working With Two Files at the Same Time

동시에 두 개의 파일을 다룰 때가 있다.

```py
d_path = 'TheZenOfPython.txt'
d_r_path = 'TheZenOfPython_reversed.txt'
with open(d_path, 'r') as reader, open(d_r_path, 'w') as writer:
    zen_of_python = reader.readlines()
    writer.writelines(reversed(zeo_of_python))
```

### Creating Your Own Context Manager

custom class 내부에서 file object를 더 훌륭하게 다루고 싶을 수 있다.

이럴 때 몇 가지 magic method를 사용해야만 with문을 사용할 수 있다.

`__enter__`, `__exit__`를 추가해야 한다.

이런 magic method를 추가하는 것을 context manager를 만들었다고 한다.

`__enter__()`는 with문이 호출될 때 호출된다.
`__exit__()`는 with문이 끝날 때 호출된다.

```py
class my_file_reader():
    def __init__(self, file_path):
        self.__path = file_path
        self.__file_object = None

    def __ender__(self):
        self.__file_object = open(self.__path)
        return self

    def __exit__(self, type, val, tb):
        self.__file_object.close()
```

이 class는 open() built-in 함수와 비슷하게 사용할 수 있다.

```py
with my_file_reader('TheZenOfPython.txt') as reader:
    pass
```
