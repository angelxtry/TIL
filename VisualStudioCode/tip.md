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

```
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

## 참조사이트
Python Extension : <https://github.com/DonJayamanne/pythonVSCode>
