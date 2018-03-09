# 사용법

* conda.exe 파일 경로
  * Anaconda3\Scripts
  * path에 Anaconda3\Scripts 경로를 넣어야 conda 커멘드가 어디서든 실행된다.

* `conda --version`

* update
    * `conda update conda`

* conda create -n DIR_NAME python=VERSION anaconda
    * ex) conda create -n py35 python=3.5 anaconda
    * ...\Anaconda3\envs 경로에 선택한 VERSION의 python을 설치
    * 설치가 끝나면 다음과 같은 구문이 나온다.

```sh
#
# To activate this environment, use:
# > activate py35
#
# To deactivate an active environment, use:
# > deactivate
#
# * for power-users using bash, you must source
#
```

* 생성된 가상환경의 목록 확인
  * `conda info --envs`

```sh
> conda info --envs
# conda environments:
#
untitled                 C:\Anaconda3\envs\untitled
untitled1                C:\Anaconda3\envs\untitled1
root                  *  C:\Anaconda3
```

* anaconda를 이용하여 가상환경을 하나 더 만들어보았다.

```sh
> conda create -n py36practice python=3.6
Fetching package metadata .............
Solving package specifications: .

Package plan for installation in environment C:\Anaconda3\envs\py36practice:

The following NEW packages will be INSTALLED:

    certifi:        2018.1.18-py36_0
    pip:            9.0.1-py36had87c14_4
    python:         3.6.4-h6538335_1
    setuptools:     38.4.0-py36_0
    vc:             14-h0510ff6_3
    vs2015_runtime: 14.0.25123-3
    wheel:          0.30.0-py36h1201a8d_1
    wincertstore:   0.2-py36hcdd9a18_0

Proceed ([y]/n)? y

#
# To activate this environment, use:
# > activate py36practice
#
# To deactivate an active environment, use:
# > deactivate
#
# * for power-users using bash, you must source
#
```

* -n은 name의 약자
* py36practice라는 이름으로 만든다는 의미
  * py36practice라는 디렉토리가 생성된다.
  * activate 하는 이름도 동일하다.

## 가상환경 활성화

* `activate <virtual env name>`

## 가상환경 비활성화

* `deactivate <virtual env name>`
