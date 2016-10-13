# 설치 과정
(삽질과정ㅠ_ㅠ)

Gollum을 설치하고자 마음먹고 어설프게나마 설치를 성공하기까지 반나절에 가까운 삽질을 했다.

삽질의 원인은 주로 ruby 였던 것 같다. 혼파망에서 벗어난지 얼마 안되서 아직도 정신이 멍하다.

간략하게 설치 과정을 기록한다.

## 1. ruby 설치

gollum을 windows에 설치하려면 JRuby가 필요하다. 

[git page]('https://github.com/gollum/gollum')에 크게 적어 놓았다. 그냥 Ruby 설치하지 말자. (왜 나는 SYSTEM REQUIRMENTS를 보고도 Ruby를 설치했는가-_-)

[jruby page]('http://jruby.org/download')에서 JRuby 9.1.5.0 Windows Executable를 다운 받아 설치했다.

설치는 문제없이 진행됐다.

## 2. gollum 설치

```
$ gem install gollum

Successfully installed mime-types-1.25.1
Successfully installed rjgit-4.4.1.0
Successfully installed gollum-rjgit_adapter-0.3.3-java
Successfully installed rouge-2.0.6
Successfully installed nokogiri-1.6.8.1-java
Successfully installed stringex-2.5.2
Successfully installed sanitize-2.1.0
Successfully installed github-markup-1.4.0
Successfully installed gollum-lib-4.2.1-java
Successfully installed kramdown-1.8.0
Successfully installed rack-1.6.4
Successfully installed tilt-2.0.5
Successfully installed rack-protection-1.5.3
Successfully installed sinatra-1.4.7
Successfully installed mustache-0.99.8
Successfully installed useragent-0.14.0
Successfully installed gollum-4.0.1
17 gems installed
```  

간단히 완료

## 3. gollum 실행

로컬 git 저장소에서 ```gollum``` 이라고 입력하면 끗

```
$ gollum
[2016-10-13 16:51:07] INFO  WEBrick 1.3.1
[2016-10-13 16:51:07] INFO  ruby 2.3.1 (2016-09-07) [java]
== Sinatra (v1.4.7) has taken the stage on 4567 for development with backup from WEBrick
[2016-10-13 16:51:07] INFO  WEBrick::HTTPServer#start: pid=22344 port=4567
``` 