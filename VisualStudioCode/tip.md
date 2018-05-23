# Visual Studio Code Tip

## ● markdown 미리보기

확장자 md 파일을 수정 한 후 ```Ctrl + Shift + V```

## ● markdown 화면분할하여 동시에 보기

```Ctrl + k, v```

## ● terminal에서 code 실행하기

Command Palette에서 `shell command`

특정 디렉토리에서 `code .` 이라고 입력하면 vscode가 실행된다.

## ● Intellisense, Autocomplete, Linting, Formatting 등에 사용되는 Python 버전 설정

특정 버전의 Python을 사용하고 있으면 `setting.json`에 해당 버전의 Python interpreter 경로를 설정해 주어야 한다.

가상환경일 경우에도 동일하다.

현재 설정은 다음과 같다.

```json

{
    "editor.rulers": [80,100],
    "python.pythonPath":"VIRTUAL_ENV_PATH/bin/python",
    "python.linting.enabled": true,
    "python.autoComplete.extraPaths":[]
}

```

`setting.json` 변경 후 반드시 vscode를 재시작한다.

## ● UI 언어 변경

Command Palette > conf lang 입력

`"locale":"ko"` -> `"locale":"en"` 변경

## ● task runner 설정(python)

`ctrl+shift+p` 를 눌러서 task를 입력하면 `Tasks: Configure Task Runner` 항목이 나온다.

이것을 실행하면 현재 디렉토리에 `.vscode` 디렉토리와 `task.json` 파일이 생성된다.

```json

{
    "version": "0.1.0",
    "command": "python",
    "isShellCommand": true,
    "args": ["${file}"],
    "showOutput": "always"
}

```

자동으로 생성된 json 형식의 내용에서 `command`와 `args`를 위와 같이 수정한다.

저장한 후 `ctrl+shift+b`를 입력하면 결과를 확인할 수 있다.

## 참조사이트

Python Extension : <https://github.com/DonJayamanne/pythonVSCode>

## js auto formatting

`alt + shift + f`
