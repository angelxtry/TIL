# 복잡한-백오피스에서-Form의-상태-다루기

## React Context로 Form의 상태관리를 하려했던 이유

### 장점

- Props drilling을 줄일 수 있다.
- submit 시점에 하나의 Store가 필요하다.

### 단점

- useContext를 사용하는 component는 하나의 상태가 변했을 때 나머지가 모두 rerendering 된다.
- useContext는 메모이제이션을 활용하기도 어렵다.
- 결국 formState가 커지면 커질수록, useContext를 많이 쓰면 쓸수록, 불필요한 rerendering이 발생한다.


예제코드를 작성해보자.

파트너센터에서 useDispath를 여러 파일에서 각각 사용하지 말고 hook을 만들어 사용하면 어떨까?

### Controlled & UnControlled Component

(예제코드 추가)

input의 value를 ref로 지정한 후 submit 시점에 formState와 합쳐서 전송한다.

하나의 input이 다른 UI에 영향을 주는 컴포넌트는 이런 방식을 사용할 수 없다.

## React Hook From

### 컨셉

기본적으로 browser 기본 상태인 uncontrolled component를 hoot에 저장해두고 state를 직접 관리하지 않는다.(ref를 활용)

모든 Form의 요소들이 input만이 있는 것이 아니기에 controlled하게 관리할 수 있는 방안도 제공한다.

기본적으로 state로 관리하는 것이 아니기에 불필요한 rerender를 최소화할 수 있다.(하나의 store에서 state를 모두 관리한다.)

uncontrolled component 예제

controlled component 예제

### 주의할 점

