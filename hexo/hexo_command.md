# hexo
## install
npm install -g hexo-cli

directory 생성

cd directory

hexo init .

hexo server

cd themes

tranquilpeak 설치

# Site
title: TIL
subtitle:
description:
author: John Doe
language: en
timezone: ROK


npm install hexo-deployer-git --save

deploy:
  type: git
  repo: https://github.com/angelxtry/angelxtry.github.io

npm install hexo-generator-feed --save

feed:
    type: atom
    path: atom.xml
    limit: 20


https://github.com/LouisBarranqueiro/hexo-theme-tranquilpeak/blob/master/docs/user.md#enable-pages

```
Enable all-categories page
To enable all-categories page :

Run hexo new page "all-categories". A new folder named all-categories will be created in source/
Replace source/all-categories/index.md content with :
---
title: "all-categories"
layout: "all-categories"
comments: false
---
New page will be reach at : /all-categories. On this page, users will be able to search and filter categories.

Enable all-tags page
To enable all-tags page :

Run hexo new page "all-tags". A new folder named all-tags will be created in source/
Replace source/all-tags/index.md content with :
---
title: "all-tags"
layout: "all-tags"
comments: false
---
New page will be reach at : /all-tags. On this page, users will be able to search and filter tags.

Enable all-archives page
To enable all-archives page :

Run hexo new page "all-archives". A new folder named all-archives will be created in source/
Replace source/all-archives/index.md content with :
---
title: "all-archives"
layout: "all-archives"
comments: false
---
New page will be reach at : /all-archives.
On this page, users will be able to search and filter posts.
Search pattern : YYYY/MMM/DD
```

## hexo -> git 배포

```
hexo clean
hexo generate --deploy
```

## hexo 글쓰기

### draft 작성

```
hexo new draft "md파일명"
```

* md파일명에서 `.md`확장자는 제외한다.

* permalink 로 사용되므로 영문명으로 작성한다.

* 소문자만 가능하다.

* 공백이 있을경우 `-`로 자동치환된다.

* `"`를 양쪽에 붙이는 것이 좋다.

* title을 원하는 제목으로 수정한다. 한글도 된다.


### draft를 post로 변경

```
hexo publish "md파일명"
```
