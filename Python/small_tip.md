# 소소한 팁

## vscode vim 환경에서 여러 줄 주석

`visual mode`로 여러 줄 선택 후 `ctrl + /`

## vscode pylint 활성화

settings.json 파일에 추가

```json
"python.pythonPath": "각 가상환경에 맞는 PATH",
"python.linting.enabled": true
```

## vscode python lint 활성화 시 외부 라이브러리 `unable to import ...`

settings.json 파일의 python.pythonPath 확인

가상환경에서 `pip install pylint`
