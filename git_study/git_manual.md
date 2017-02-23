# 내가 써보는 git 메뉴얼

- git을 잘 사용하고 싶은데 잘 안된다.
- 여러번 삽질도 해봤고 생활코딩에 강의도 들었다.
- Source Tree를 사용하면 기본적인 기능은 사용할 수 있는데 뭔가 좀 부족하게 느껴졌다.
- command line으로 사용법을 배워두는 것이 좋다고 생각한다.
- 그래서 다른 사람에게 설명한다고 가정하고 git 메뉴얼을 써보기로 했다.
- Outsider님의 글을 발췌, 요약하면서 진행한다.
- <https://blog.outsider.ne.kr/865>

## Fork
- Github의 기존 저장소를 보면 `Clone and download` 버튼이 있다.
- 이 버튼을 클릭하면 `https://github.com/...` 으로 시작하는 주소가 보인다.
- 혼자 소스를 살펴보기만 할다면 이 주소를 사용해서 `git clone 주소`하면 소스를 다운받을 수 있다.
- 오픈소스 저장소들은 대부분 읽기만 가능하다.
- 이 소스를 수정하고 싶다면 `Fork`한 뒤에 `Pull Request`하는 방식으로 진행된다.
- Github의 우측 상단에 보면 `Fork` 버튼이 있다.
- 이 `Fork` 버튼을 클릭하면 해당 저장소의 현재 상태 그대로를 복사해서 자신의 Github 계정에 저장소를 생성한다.
- `Fork`는 git의 기본 기능이 아니다. Github가 git의 기능을 이용하여 제공하는 Github 만의 기능이다.
- 이제 자신의 계정에 동일한 저장소가 생겼고 Read, Write 권한이 모두 주어진다.





remote를 추가한다.
remote의 이름을 origin이라고 붙인다.
remote의 주소는 https://github.com/try-git/try_git.git

git remote add origin https://github.com/try-git/try_git.git
