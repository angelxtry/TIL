# 내가 사용하는 convention

여러가지 문서와 [스포카 기술문서](https://spoqa.github.io/2012/08/03/about-python-coding-convention.html)를 참조했다.

* 들여쓰기는 공백 4칸

* 한 줄은 최대 79자

* 최상위 함수와 클래스 정의는 2줄

* 클래스 내의 메소드는 1줄

* 키워드인자와 인자의 기본값의 = 는 붙여쓴다.

## Naming Conventions

* _single_leading_underscore: 내부적으로 사용되는 변수

* single_trailing_underscire: 파이썬 기본 키워드와 충돌을 피하려고 사용

* 모듈명은 짧은 소문자로 구성하며 필요하다면 밑줄로 나눈다.

* 클래스명은 CamelCase

    * 내부적으로 쓰이면 밑줄을 앞에 붙인다.

    * Exception은 실제로 에러인 경우 "Error"를 뒤에 붙인다.

* 함수명은 소문자로 구성하며 필요하면 밑줄로 나눈다.

* 인스턴스 메소드의 첫 번째 인자는 self

* 클래스 메소드의 첫 번째 인자는 cls

* 메소드명은 함수명과 같으나 비공개 메소드이면 밑줄을 앞에 붙인다.

* 상수는 모듈 단위에서만 정의하며 모두 대문자이고 필요하다면 밑줄로 나눈다.

## 기타

* None을 비교할때는 is, is not 만 사용한다.

* 클래스 기반의 예외를 사용한다.

* 예외를 except: 로 설정하지 말고 명확한 예외를 명시한다. (ex: except ImportError:)

* 접두사나 접미사를 검사할 때는 `startswith()`, `endswith()`를 사용한다.

* 객체의 타입을 비교할 때는 `isInstance()`를 사용한다.

* 빈 시퀀스(문자열, 리스트, 튜플)는 조건문에서 `false`이다.

* boolean형의 값을 조건문에서 `==`를 통해 비교하지 않는다.

