# 프로그래밍의 정석

## 시작하며

> 초보자용 책으로는 문법과 노하우까지는 익힐 수 있을지언정 본질적인 부분의 프로그래밍 기술 개선에는 도달하지 못한다. 그렇다고 해서 프로그래밍 달인들의 유명한 책을 읽어보면 이번에는 문턱이 높고 너무 어려워서 좌절하거나, 지식이 머릿속에서 바로 빠져나가 결국 얻는 것 하나 없이 끝나고 만다.

> 각 정석에 관해서 그것은 무엇이고(what), 그것이 왜 그렇고 왜 필요하며(why), 그렇다면 어떻게 해야 하는지(how)를 중심으로 설명한다.

> 정석은 특정 기술에 특화되지 않은 추상도가 높은 정보이므로 언뜻 보면 이게 무슨 도움이 될까 싶은 내용도 있을 것이다. 그러나 현존하는 구체적인 기술은 사실 정석의 목적을 구현한 것이다.

> 정석을 이해하고 있다면 구체적인 기술을 배울 때 기술의 존재 이유, 즉 해당 기술이 왜 필요한지를 이해할 수 있다.

## 0.1 정석의 카테고리
> 1. 전제 - 프로그래밍 불변의 사실
> * 프로그래밍의 보편적 사실에 관한 정석을 소개한다. 여기서 소개하는 정석은 '사실'이지 '테크닉'은 아니다.
> * 이 내용은 프로그래밍을 하는 데 매우 중요한, 영원히 변하지 않는 사실이다. 앞으로 소개될 모든 정석의 전제가 되는 지식이기도 하다.

> 2. 원칙 - 프로그래밍의 가이드라인
> * 대부분의 경우에 공통으로 적용되어야 할 프로그래밍의 기본 규칙. 예외를 인정하는 다소 느슨한 규칙이다.

> 3. 사상 - 프로그래밍의 이데올로기

> * 6가지
>   * 프로그래밍 이론
>   * 아키텍처 기본 기법
>   * 아키텍처 비기능 요구사항
>   * 7가지 설계 원리
>   * UNIX 사상
>   * UNIX 철학

> 4. 관점 - 프로그래머가 보는 시각
> * 프로그래밍의 관점과 견해에 관한 정석
> * 프로그래밍에 능숙한 사람은 의식적이든 무의식적이든 장래에 개선하기 쉬운 코드를 작성한다.
> * 그런 코드에는 '이런 관점으로 생각하고 이런 요소를 고려해 두면 나중에 좋다.' 처럼 생명력이 오래가는 코드로 만들기 위한 관점과 견해가 존재한다.

> 5. 습관 - 프로그래머의 일상
> * 좋은 코드를 작성하는 습관과 행동 지침

> 6. 기법 - 프로그래머의 도구 상자
> * 여기서 말하는 도구란 사고의 프레임워크이자 설계 기법 혹은 문제 해결 방식

> 7. 법칙 - 프로그래밍의 안티패턴
> * 소프트웨어를 개발할 때 빠지기 쉬운 함정에 관한 정석을 소개
> * 안티패턴(일반적으로 사용되지만 실제로는 비효율적이거나 비생산적인 디자인 패턴)

## 1.1 프로그래밍에 은제 탄환은 없다.
> 소프트웨어 본질에는 그런 난해성을 보여주는 4가지 성질이 있다.
> 1. 복잡성
> 2. 동조성: 소프트웨어는 실세계와 계속 동조해야 한다.
> 3. 가변성: 설령 계획대로 소프트웨어가 완성되더라도 그것을 사용하는 사용자는 다른 요구사항을 떠올린다. 이는 완성된 소프트웨어가 세상을 바꾸기 때문이다. 소프트웨어가 사용자의 인식에 영향을 미치며 새로운 요구사항이 생긴다.
> 4. 비가시성: 추상화해서 단순한 도면으로 만드는 작업은 가능한다. 다만 이때는 정보가 사상되므로 모든 정보를 표현할 수는 없다.

가변성이 많이 와닿는다. 개발보다 기획쪽에 치우쳐서 일을 해보면 소프트웨어가 완성된 후에 좀 더 나은 개선사항이 나오는 것을 종종 겪었다. 기획의 부족함일 수도 있겠지만 여기서 말하는 가변성일 수도 있겠다라는 생각이 든다.

> 소프트웨어의 본질은 난해성이며 최대 요인은 복잡함에 있다. 소프트웨어 개발의 역사는 사실 복잡함과의 투쟁의 역사다. 역사를 배우고 다양한 기법이나 사고방식을 익혀서 착실하게 복잡함을 줄여 나가자.

> 우유(비본질)란 우연히 발생했다는 의미가 아니라 부차적이고 부수적이라는 의미로 그것이 없어도 대상물이라고 할 수 있는 성질이다. 소프트웨어 개발 현장에서 필요한 기술이라고 알려진 것의 대부분은 우유적인 부분이다.

우유는 상당히 어려운 단어 같다. 좀 더 쉬운 표현은 없었을까.

> 빌드 환경, 프로그래밍 언어, 라이브러리, 프레임워크 등은 우유적이다.

> 본질절진 부분의 작업에 주력하는 데는 우유적인 부분의 작업이 큰 역할을 수행한다. 왜냐하면 우유적인 부분은 본질적인 부분과는 대조적으로 쉽게 개선할 수 있기 때문이다. 예를 들어 적잘한 프로그래밍 언어를 선택하기만 해도 생산성은 극적으로 올라간다.

> 우유적인 부분의 개선 중에서 특히 큰 성과를 낸 것이 자동화다. 테스트나 빌드, 환경 설정 등을 자동화해서 작업 효율이나 작업 품질이 크게 개선되었다. 우유적인 부분을 찾아냈다면 자동화해서 가능한 한 본질적인 부분에 시간을 할애하자.

## 1.2 코드는 설계서다.
> 기본 설계부터 상세 설계, 프로그래밍, 테스트, 디버깅까지 모든 과정이 설계이며, 설계의 결과물인 설계서가 코드다. 제조에 해당하는 공정은 배포와 빌드다. 즉, 제조는 프로그래머가 아닌 컴파일러나 빌드 시스템이 수행한다.

> 제품의 개선은 설계 공정에서 수행한다. 제조 공정에서 기능을 개선하는 일은 있을 수 없다. 제조나 생산 공정에서는 설계대로 물건을 만들 뿐이다.

> 기본 설계, 상세 설계, 프로그래밍, 테스트, 디버깅까지가 설계라는 한 묶음의 작업이라면, 그런 작업을 분담하는 것이 바람직한 방식은 아니라는 점을 알 수 있다. 

> 로제타 스톤: 유지보수 담당자에게 필요한 가이드북
> * 여기에는 소프트웨어 개발 환경을 이해하기 위한 정보와 소프트웨어 아키텍처를 이해하기 위한 정보가 담겨 있다.
> * 소프트웨어 개발 환경은 빌드와 테스트 프로세스를 수행하는 벙법을 기술한다.
> * 소프트웨어 아키텍처는 전체를 파악하기 위해 필요한 그림, 즉 코드로부터 파악할 수 없는 코드 전체를 부감해서 본 그림을 기술한다.

> 코드에는 how와 what은 잘 표현되어 있지만 why, 즉 설계 이유가 없다. 설계 이유를 문서에 기술해 두면 유지보수 담당자가 수정을 판단하는 정보로 활용할 수 있어 장래 대부분의 상황에서 도움이 된다.

설계이유를 적은 적이 한번이라도 있었던가?

코드가 설계서라는 부분이 많이 공감된다. 회사에서 계속 기획, 설계, 코드 작성, 운용을 별개의 인원으로 나누어서 일을 진행하려고 한다. 각 단계의 담당자들은 서로 교류할 필요가 없다고 생각한다. 

## 1.3 코드는 반드시 변경된다.
> 프로그래밍에서 하나하나의 판단은 해당 코드가 변경된다는 점을 전제로 수행하도록 하자. 즉, 변경에 강한 코드를 작성한다는 뜻이다.

> 그렇게 하려면 코드가 읽기 쉬워야 한다. 결국 코드라는 것은 작성하는 시간보다 읽는 시간이 훨씬 길어진다.

## 2.1 KISS
> Keep It Simple, Stupid. Keep It Short and Simple.

> 코드를 작성할 때 최우선 가치를 단순성과 간결성에 둔다.

> 장래에 필요해질지도 모르니, 그렇다면 지금 작성하는 것이 최선이라고 생각하면서 코드를 넘치게 작성할 때가 있다. 그러나 지금 필요하지 않다면 지금 작성할 것이 아니다. 대부분 그렇게 작성한 코드는 필요해지지 않는다.

> 기능만 많고 복잡한 소프트웨어는 결국 사용하지 않는다. 기능과 인터페이스를 단순하게 유지하면 사용하기 쉽고 많이 사용하는 소프트웨어가 된다.

> 오컴의 면도날
> * 어떤 사항을 설명하는 데 필요 이상으로 많은 전제를 가정해서는 안된다.
> * 뭔가에 관해 여러 가지 설명이 가능하다면 가장 단순한 방식이 옳다.

구현 기능이나 화면에도 오컴의 면도날이 통용될 수 있을까? 실제로 사용되지는 않지만 같은 결과를 처리할 수 있는 기능을 많이 만들어 놓아야 한다고 주장하는 사람들이 있다. 주로 사용하지는 않지만 여러 화면을 만들어두고 어떤 화면에 유용한지 판단해야 된다고 주장하는 사람들도 있다. 그 말이 옳은걸까?

## 2.2 DRY
> Don't Repeat Yourself

> 같은 조건을 다루는 제어문 블록이 여러 군데 중복해서 나타날 때도 있다. 이것도 중복이다.

> 정수 리터럴을 직접 코드에 내장하는 것도 코드 중복이다.

> 중복 코드는 대부분 해당 부분에 대한 테스트가 없다.

> 코드를 추상화하여 중복을 제거하자. 코드 로직을 추상화하려면 처리하는 코드를 묶고 이름을 붙여 함수화, 모듈화한다. 데이터라면 이름을 붙여 상수를 정의한다. 이렇게 이름을 붙인 코드를 반복해서 나오는 부분에 치환한다.

> 추상화하면 다음과 같은 장점이 있다.
> * 코드의 양이 줄어 읽는 양을 줄일 수 있다.
> * 로직이나 데이터에 이름이 붙었으므로 코드가 읽기 쉬워진다.
> * 똑같은 코드가 한 군데에 집약되어 있어서 한 군데만 수정하면 되므로 코드를 수정하기 쉽고, 품질을 담보하기 쉬워진다.
> * 재사용이 쉬워진다.

> DRY의 적용 범위는 코드에만 한정되지 않는다. 자동화 대상으로 여겨지는 대표적인 작업으로는 '지속적인 통합'이라고 불리는 스프트웨어의 테스트, 빌드, 배포 작업이 있다.

> 불가피한 중복도 존재한다.
> * 임피던스 불일치. 프로그래밍과 프로그래밍이 사용하는 서비스 사이의 틈을 메우는 정보 부분에서 불가피하게 중복이 발생한다.
> * 추상화 스타일이 서로 다른 경계선.

> WET: DRY가 되어 있지 않은 코드에 대해 비꼬는 표현으로 사용한다.

> OFOP
> * One Fact in One Place
> * 한 곳에는 하나의 사실. 데이터베이스 논리 설계에서 테이블 설계의 핵심이 되는 원칙.

> 레거시 코드. 최근에는 테스트에 의한 품질 보호를 중요시할 목적으로 테스트가 없는 코드라고 재정의 되었다.

## 2.3 YAGNI
> You Aren't Going to Need it

> 미리 여러 가지 사태에 대비해 코드를 넣어 두더라도 결국 이용되지 않는 것이 대부분이다.
> 오히려 시간이 지날수록 어째서 이렇게 사용하지도 않는 코드가 있는 것인지 영문을 알 수 없다.

> 범용성보다 단순성을 선택하자. 단순한 방식이 사실 범용성이 더 높을 때가 많다.

> DTSTTCPW
> * Do The Simplest Thing That Could Possiby Work
> * 효과가 있는 방법 중에서 가장 간단한 방법으로 하라.

## 2.4 PIE
> Program Intently and Expressively

> 코드를 작성할 때 의도를 명확하게 표현해야 한다. 코드는 컴파일러가 아닌 사람이 읽기 위한 것이다.

> 코드는 작성하는 경우보다 읽히는 경우가 훨씬 많다. 코드는 실행 효율보다 읽는 효율이 우선시 된다. 읽기 쉽다면 나중에 실행 효율을 높이기는 간단하다.

> 자기 코드든 남의 코드는 읽었을 때 곧장 의도하는 것이 무엇인지 이해할 수 없다면 즉각 이해하기 쉽도록 다시 작성하자.

> 주석 없이도 읽을 수 있을 법한 이해하기 쉬운 코드를 작성하는 것이 이상적이다. 다만 코드는 어디까지나 what과 how, 즉 '무엇을 하는지'와 '어떻게 하는지'밖에 표현하지 못한다. why, 즉 '어째서 그것을 하는지'를 표현하려면 주석을 사용할 필요가 있다.

> 문학적 프로그래밍에는 다음과 같은 이점이 있다.
> * 문서를 별도로 작성하지 않기 때무에 코드 설명이나 정당성의 근거를 기술하면서 프로그래밍을 진행할 수 있고, 프로그래머가 코드에 관해 다른 관점에서 생각해 볼 수 있다.
> * 코드와 설명이 가까운 위치에 기술되므로 수정 작업이 쉽고, 코드를 변경할 때 설명이 적절하게 갱신된다.
> * 전체적으로 코드 기반 문서가 단 하나만 존재하는 것이 보증된다.
> * 일반적인 주석에는 기술되지 않는 종류의 정보(알고리즘의 설명, 정당성을 입증한 증명, 설계상의 결정 근거 등)도 코드에 포함된다.

## 2.5 SLAP
> Single Level of Abstraction Principle

> 코드를 작성할 때 높은 수준의 추상화 개념과 낮은 수준의 추상화 개념을 분리한다.
> 코드의 추상화 수준을 일치시키면 훌륭한 책처럼 읽을 수 있다.

> 코드가 수준이 일치된 함수로 분할되어 있으면 요약성과 열람성을 동시에 충족한다. 함수 일람은 목차가 되고 요약성을 지닌다. 분할된 함수는 작은 코드 묶음이 되어 열람성이 좋아진다. 코드를 읽다가 갑자기 추상도가 달라지면 흐름이 도중에 끊긴다.

> 함수를 구조화하면 각 함수는 자신보다 한 단계 낮은 수준의 함수를 호출하는처리가 증삼이 된다. 이처럼 다른 함수를 호출하는 코드를 구성하는 함수를 복합 함수(composed method)라고 부른다.

> 훌륭한 글을 쓸 때 핵심은 '내용을 쓰는 것'과 '내용을 이해하기 쉽게 전하기 위한 구성을 생각하는 것'을 별개로 작업하는 데 있다. ... 구체적인 처리를 작성하는 작업과 추상화 수준을 일치시키는 작업은 모드를 전환해서 별개의 작업으로 수행하도록 하자.

## 2.6 OCP
> Open Closed Principle

> 코드는 확장에 대해서 열려 있고 수정에 대해서 닫혀 있는 2가지 속성을 동시에 충족하도록 설계한다.
> * 확장에 대해서 열려 있다는 말은 코드의 동작을 확장할 수 있다는 의미다.
> * 수정에 대해서 닫혀 있다는 말은 코드의 동작을 확장하더라도 그 밖의 크도는 전혀 영향을 받지 않는다는 의미다.

> 클라이언트와 서버 사이에 모듈 사용자를 위한 클라이언트 인터페이스를 만든다. 서버는 클라이언트 인퍼테이스를 구현한다. 클라이언트는 클라이언트 인터페이스를 사용한다.

> 코드의 모든 부분에 OCP를 적용하는 것은 과한 방식이다. OCP의 과도한 적용을 방지하려면 변경 내용을 지나치게 예측하지 말아야 한다. (KISS, YANGI)

> OCP 적용의 핵심은 변경 내용을 예측하기보다 변화할 법한 부분을 예측하는 데 있다.

> OCP를 구현하는 방법 가운데 대표적인 기술이 객체지향의 다형성이다. 다만 OCP가 객체지향만의 전유물인 것은 아니다. 예를 들어 컴파일러에 의해 링크를 할 때 링크 대상 라이브러리를 교체하는 방식 등을 생각한다면 객체지향 이외의 언어에서도 OCP를 실현할 수 있다.

> 디자인 패턴의 대부분은 OCP를 실현하기 위한 수단으로 사용할 수 있다. 대표적인 패턴으로는 스트레티지 패턴, 옵저버 패턴, 템플릿 메서드 패턴, 데코레이터 패턴 등이 있다.

## 2.7 명명이 중요하다.
> 이름은 코드를 읽는 사람에 대한 사용자 인터페이스다.

> 이름을 스스로 점검해보고 싶다면 처리를 작성하기 전에 테스트를 작성하도록 한다. 그렇게 하면 코드를 사용자 관점에서 생각할 수 있다.

## 3.1 프로그래밍 이론
> 최고의 코드를 실현하기 위해 프로그래밍에는 이론이 있다. 프로그래밍 이론은 다음 3가지 가치에 의해 지탱되고 있다.
> * 의사소통
> * 단순함
> * 유연성

> 프로그래밍에서 문제 해결방법은 상황에 따라 달라진다. 매번 상황이 달라지기 때문에 목적에 맞는 적용 이유를 찾아내지 못하면 적절한 기술을 선택할 수 없다.

> 기술을 잘 사용하려면 '어째서 이런 것을 할 필요가 있는가?', '이것에 어떤 가치가 있는가?', '언제 이것을 사용하면 좋은가?'와 같은 점은 알아두어야 한다.

코드를 작성한 후 한 줄 한 줄 읽으면서 왜 이렇게 작성했는지 설명하는 과정이 필요하다. 요건을 설명하는 것이 아니라 왜 요건을 이렇게 구현했는지 설명할 수 있어야 한다.

> 그래서 프로그래밍 이론이 필요하다. 프로그래밍 이론에서 제시되는 가치는 개별 기술을 적용하는 이유가 된다.

> 가치를 실제 프로그래밍에 사용하기에는 다소 지나치게 추상적이다. 가치를 프로그래밍과 연결할 수 있는 중간 개념이 필요하다. 이를 위해 가치와 프로그래밍 사이에 가교 역할을 하는 6가지 원칙이 존재한다.
> * 결과의 국소화 -> OCP와 연결된다.
> * 반복의 최소화 -> DRY
> * 로직과 데이터의 일체화
> * 대칭성
> * 선언형의 표현
> * 변경 빈도

> 기술을 배울 때는 동작 원리나 발전 과정, 설계 배경 등도 동시에 알아야 한다. 이렇게 해야 기술이 적합해서 목적을 달성하기 쉬워진다.

## 3.2 의사소통
> 방금 전의 자신과도 코드를 통해 의사소통하는 셈이다. 

## 3.3 단순함
> 코드를 어떻게든 동작하게 만들려고 격투를 벌인 흔적에 의한 복잡성을 뜻한다.

> 코드가 다소 장황해지더라도 망설이지 말고 의사소통을 우선시하자.

## 3.4 유연성
> 기존 코드가 새롭게 추가되는 코드를 반발이나 거부 반응 없이 받아들일 수 있는 점, 자신이 망가지지 않도록 완충을 해서 받아들일 수 있는 점, 양쪽 관점으로 '유연'이라는 표현이 사용되고 있다.

> 복잡성을 갖지 않고 유연성을 갖게 하려면 즉시 효과가 나타나는 코드 이외는 자제하고 작성하지 않도록 하자.

> 경직된 설계에서 하향식으로 얻어지는 유연성보다는 단순함에서 시작해 단위 테스트를 통해 상향식으로 얻어지는 유연성이 실제로 효과적이다.

## 3.5 결과의 국소화
> 변경이 미치는 영향이 국소에 머무르도록 코드를 구성한다는 뜻이다.

> 모듈화는 바로 이 목적 때문에 생겨난 기술 중 하나다.

> 관계성이 높은 코드는 모으고, 관계성이 낮은 코드는 서로 종속되지 않도록 코드를 작성하자. 이를 위해 관계성이 높은 코드는 집약해서 모듈화한다.

## 3.6 반복의 최소화
> 중복을 최대한 제거한다.

## 3.7 로직과 데이터의 일체화
> 로직과 해당 로직이 조작하는 데이터를 서로 가까이에 배치시키는 것을 뜻한다. 가까이란 같은 함수, 같은 모듈이며 가까우면 가까울수록 좋은 코드다.

> 코드를 수정할 때 로직과 해당 로직이 조작하는 데이터는 대개 같은 시점에 변경된다.

## 3.8 대칭성
> (SLAP와 유사)

> 프로그래밍에서 대칭성이란 도형보다는 개념적이다. 이것은 똑같은 생각으로 작성한 코드라면 어느 부분에서든 똑같이 표현된다는 점을 의미한다. 다시 말해 그룹 안에서의 수준 맞추기다.

> 같은 종류의 것, 즉 동질의 것은 같은 수준으로 표현한다.

> 대칭성의 추구는 본질상 중복을 제거하기 위한 준비 작업이기도 하다.

> * 추가 메서드가 있다면 대응하는 삭제 메서드를 작성한다.
> * 특정 그룹에 있는 함수는 같은 파라미터를 갖도록 한다.
> * 특정 모듈 안의 데이터는 전부 생존 기간이 같아지게끔 한다.
> * 특정 함수 안에서 호출하는 함수의 추상도는 같은 수준으로 한다.

## 3.9 선언형의 표현
> 가능한 한 명령형보다는 선언형으로 표현

> 명령형 프로그래밍은 문제의 해법, 즉 자료구조와 알고리즘을 기술한다.

> 반면에 선언형 프로그래밍은 문제의 정의, 즉 해결해야 한 문제의 성질이나 이때 충족해야 할 제약을 기술한다.

> 선언형 코드는 순서나 조건 분기가 없다.

> 대표적인 기법에는 어노테이션(annotation)이나 DSL이 있다.

django의 loginrequired 같은 것.

## 3.10 변경 빈도
> 변경 빈도란 코드를 수정하는 시점이 같다는 의미다. 즉, 변경 이유가 같다는 뜻이다.

> 같은 시점에 변경되는 요소는 같은 곳에 두고, 다른 시점에 변경되는 요소는 다른 곳에 분리해 두도록 한다.

> 이는 대칭성의 원칙을 시간에 대해 적용한 원칙이라고도 할 수 있다. 같은 것은 똑같이 취급해야 하는데 이는 변경 시점에 대해서도 마찬가지다.

> 모듈처럼 어떤 형태의 단위로 그룹핑된 코드에서 변경 이유를 여러 개 가진 코드는 깨지기 쉬운 코드다.

> 이는 로직과 데이터에도 적용된다.

> 단일 책임의 원칙(SRP: Single Responsibility Prinsiple)이란 모듈을 변경하는 이유가 여러개 존재해서는 안 된다는 원칙이다. 그런 상태로 만들려면 변경 빈도 원칙을 적용해야 한다. 변경 이유나 빈도가 같은 코드를 한데 모으면 자연스럽게 단일 책임의 원칙을 충족하는 모듈이 완성된다.

## 3.11 아키텍처 기본 기법
> 아키텍처 기본 기법이란 소프트웨어 아키텍처를 적절하게 구축하는 데 필요한 기초 원리다. 기본 기법은 모듈의 설계 방침으로 제시되면 다음 10가지 기법이 있다.
> * 추상
> * 캡슐화
> * 정보 은닉
> * 패키지화
> * 관심의 분리
> * 충족성, 완전성, 프리미티브성(원시성, 순수성)
> * 정책과 구현의 분리
> * 인터페이스와 구현의 분리
> * 참조의 단일성
> * 분할 정복

> 어떤 문제에 대해 특정한 해결책이 다른 방법보다 뛰어나다는 사실을 프로그래머들이 인식하고 그 해결책을 여러 차례 재사용해 왔는데, 그것이 바로 기본 기법이다.

## 3.12 추상
> 추상은 사상과 일반화라는 2가지 관점에서 정리된다.
> * 사상은 복잡한 대상의 몇 가지 성질을 버리고 특정한 성질에 주목하는 것이다.
> * 일반화는 구체적인 대상으로부터 공통 성질을 추출해서 더욱 범용적인 개념으로 정식화하는 것이다.

> 사상은 부차적은 부분을 제거해 대상물의 본질을 드러낸다. 복잡도가 줄어들어 진짜 문제에 집중할 수 있다. 추상화한 개념은 쓸데없는 부분이 없고 사용하기 쉬우며 폭넓게 응용할 수 있다.

> 일반화는 여러가지 사항을 공통된 성질에 따르 그룹핑해서 같다고 간주하는 것이다.

## 3.13 캡슐화
> 관계성이 강한 데이터와 로직을 모듈이라는 껍질로 감싸는 것을 캡슐화하고 부른다.

## 3.14 정보 은닉
> 모듈의 구현을 해당 모듈을 사용하는 클라이언트로부터 은닉한다.

> 모듈에 어떤 형태로 데이터가 있으며 함수가 어떤 로직으로 기능을 실현하는지를 외부로부터 은닉하도록 한다.

> 모듈의 데이터는 외부에서 직접 접근할 수 없도록 한다.

> 모듈의 함수는 최대한 비공개로 한다.

> 모듈이 클라이언트가 알 필요 없는 내부의 상세 부분을 은닉하면 인터페이스가 작아지고 정보의 교환이 단순해지며 코드 전체의 복잡성을 낮출 수 있다.
(OCP와도 연관이 깊다.)

> 정보 은닉을 실현하려면 캡슐화를 사용한다 그룹핑함으로써 관계선이 정리되므로 정보를 은닉하기 쉬워진다.

> 많은 기술 문서에서 캡슐화를 정보 은닉이라는 의미까지 포함하는 형태로 사용한다.

> 파르나스의 규칙
> * 모듈의 사용자에게는 해당 모듈을 사용하는 데 필요한 모든 정보를 주고 그 이외의 정보는 일체 보여주지 않는 것
> * 모듈의 작성자에게는 해당 모듈을 구현하는 데 필요한 모든 정보를 주고 그 이외의 정보는 일체 보여주지 않는 것

## 3.15 패키지화
> 모듈을 의미 있는 단위로 모은 다음 그룹화한다. 이는 소프트웨어 전체를 의미 있는 단위로 분할하는 것이다. 이렇게 분할된 단위를 패키지라고 부른다.

## 3.16 관심의 분리
> 관심이란 소프트웨어의 기능이나 목적을 뜻한다. 관심을 분리한다는 것은 각각의 관심에 관련된 코드를 모아 독립된 모듈로 만들어 다른 코드로부터 분리한다는 뜻이다.

> 분리된 모듈의 기능 공개는 소수로 제한하고 다른 모듈과의 결합을 최소한에 머물게 한다.

> 관점 지향 프로그래밍(AOP: Aspect Oriented Programming)은 관심 중에서도 황단적 관심을 분리한 기술이다. 횡단적 관심이란 각 관심을 옆쪽에서 꼬챙이로 꿰는 듯한 관심을 뜻한다.

> 일반적으로 황단적 관심은 분리되지 않은 상태로 각 기능에 산재해 있는데, 이는 코드의 변경을 방해하는 커다란 요인이다.

> 예를 들어 각 기능 전체를 횡단하는 로그 기능이 여기에 해당한다. 로그 기능은 독립된 모듈로 제공되지만 로그 호출은 모든 기능에 직접 엮여 있다.

## 3.17 충족성, 완전성, 프리미티브성
> 캡슐화에 의해 관련 있는 요소들이 특정 추상 개념을 담당하는 모듈로 모여진다. 모듈이 담당하는 추상에 대한 표현은 충분하고 완전하며 프리미티브여야 한다.

> 충족성
> * 모듈이 표현하고자 하는 추상이 그것을 전하기에 충분한지를 뜻한다.
> * 컬렉션을 표현할 때 add가 제공되지 않으면 불충분하다.

> 완전성
> * 모듈이 표현하고자 하는 추상이 모든 특징을 갖추고 있는지를 뜻한다.
> * 모듈이 컬렉션을 표한하고 있을 때 요소의 개수를 구하는 size가 제공되지 않는다면 완전하다고 할 수 없다.

> 프리미티브성
> * 추상이 모두 순수한지 아닌지를 의미한다.
> * 모듈이 컬렉션을 표현하고 있을 때 아이템을 1개 추가하는 add가 제공된다면 아이템을 10개 추가하는 add10은 필요하지 않다.

## 3.18 정책과 구현의 분리
> 모듈은 정책 혹은 구현을 다룬다. 하나의 모듈에서 양쪽 모두를 다루어서는 안 된다.

> 정책 모듈
> * 해당 소프트웨어의 전제에 종속되는 비즈니스 로직이나 그 밖의 모듈에 대한 파라미터를 선택하는 부분

> 구현 모듈
> * 해당 소프트웨어의 전제에 종속되지 않는 독립된 로직 부분

> 구현 모듈은 특정 소프트웨어에 종속되지 않는 순수한 모듈이므로 다른 소프트웨어에서도 재사용할 수 있다.

> 정책 모듈은 해당 소프트웨어에 특화되어 있다. 해당 소프트웨어에 변경이 생기면 정책 모듈은 변경을 강요당한다.

> 구현과 정책이 섞여 있으면 정책 변경에 구현이 끌려들어가 재사용하기 힘들어진다.

## 3.19 인터페이스와 구현의 분리
> 모듈은 인터페이스 파트와 구현 파트 2개의 분리된 부분으로 구성한다.

> 인터페이스 파트
> * 모듈이 가진 기능을 정의하고 모듈의 사용 방법을 정하는 부분이다. 클라이언트에서 접근할 수 있는 함수의 원형으로 구성된다.

> 구현 파트
> * 모듈이 가진 기능을 실현하는 코드 부분. 모듈이 내부에서 사용하는 로직과 데이터가 포함된다. 클라이언트에서 접근할 수 없다.

> 사용자는 인터페이스만 알면 된다.

> 인터페이스를 사용하여 코드를 설계한다. 구현이 아닌 인터페이스에 맞춰 프로그래밍하라.

## 3.20 참조의 단일성
> 모듈 요소에 관한 선언과 정의는 1회로 제한한다.
> * 정의가 1회라는 말은 예를 들어 변수값을 초기화했다면 이후 값을 변경하지 않는다는 뜻이다.

> 단일 대입을 수행하자. 단일 대입이란 변수에 값을 재대입하지 않는 것이다.

> 불필요한 가변성을 제거하고 불변 변수를 늘린다. 남은 가변 변수는 해당 변수에 접근하는 로직이나 스코프를 최대한 줄인다.

> 작은 함수를 많이 만들고 각각의 역할을 한정한다. 각각의 함수는 자신들이 건네받는 파라미터로만 작동하도록 한다.

> 참조투과성
> * 호출 결과가 파라미터에만 종속된다.
> * 호출이 다른 기능의 동작에 영향을 주지 않는다.

## 3.21 분할 정복
> 소프트웨어 전체를 설계할 때는 독립해서 설계할 수 있는 부분으로 분할한 다음 착수한다.

> 모듈을 설계할 때는 책임과 책무라는 관점에서 모듈을 분할하도록 한다.

> 알고리즘을 설계할 때는 병합 정렬처럼 상향식으로 분할하고 나서 문제를 해결할 수 없는지를 검토한다.

> 대량의 데이터를 처리하는 설계를 할 때는 MapReduce처럼 계산을 작은 단위로 분할하여 분산 환경에서 병행 처리할 수 있는지를 검토한다.