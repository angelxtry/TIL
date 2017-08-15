# Object Pool Design Pattern

## 의도

object pool은 상당한 성능 향상을 제공할 수 있다. 

클래스 인스턴스를 초기화하는 비용이 높고

클래스의 인스턴스화 비율이 높으며 

한 번에 사용중인 인스턴스화 수가 적을 때 가장 효과적이다.

##

object pool은 object caching을 관리하기 위해 사용한다

object pool에 접근할 수 있는 client는 object를 새로 생성하지 않고 이미 인스턴스화 되어 있는 object를 object pool에 요청하여 획득할 수 있다.

pool이 비어있는 경우 pool 자신이 새로운 인스턴스를 생성할 수 있고, 생성된 인스턴스의 수를 제한 할 수도 있다.


It is desirable to keep all Reusable objects that are not currently in use in the same object pool so that they can be managed by one coherent policy. 

To achieve this, the Reusable Pool class is designed to be a singleton class.