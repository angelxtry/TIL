# zsh install

zsh 설치

`brew install zsh`

oh my zsh 설치

`curl -L https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh | sh`

shell 변경

`chsh -s /usr/local/bin/zsh`

터미널에 다시 접속하면 zsh가 적용된 것을 확인할 수 있다.

테마변경

` ~/.zshrc` 파일을 에서 `ZSH_THEME`를 변경한다.

`ZSH_THEME="agnoster"`

Solarized dark는 iTerm에 기본으로 포함되어 있었는지 다운받지 않아도 선택할 수 있었다.

폰트 추가

https://github.com/powerline/fonts 여기서 다운로드

Meslo LG M Regular for Powerline.ttf 를 더블 클릭하여 설치

터미널에서 깨져 보이던 글자가 잘 보인다!

멀티라인 적용

http://totuworld.github.io/2016/04/08/zsh2line/ 참고

~/.oh-my-zsh/themes/agnoster.zsh-theme 파일에 위 블로그의 내용을 추가한다.

```
prompt_newline() {
  if [[ -n $CURRENT_BG ]]; then
    echo -n "%{%k%F{$CURRENT_BG}%}$SEGMENT_SEPARATOR
%{%k%F{blue}%}$SEGMENT_SEPARATOR"
  else
    echo -n "%{%k%}"
  fi

  echo -n "%{%f%}"
  CURRENT_BG=''
}
```

```
## Main prompt
build_prompt() {
  RETVAL=$?
  prompt_status
  prompt_virtualenv
  prompt_context
  prompt_dir
  prompt_git
  prompt_hg
  prompt_newline
  prompt_end
}
```

터미널에 다시 접속하면 끗