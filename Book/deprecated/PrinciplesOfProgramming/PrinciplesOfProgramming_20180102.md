# 6가지원칙이 아키텍처 기본기법 10가지에서 어떻게 상세화되는가

우선 6가지 원칙이 무엇인지 살펴보겠습니다.

## 6가지 원칙
1. 결과의 국소화
2. 반복의 최소화
3. 로직과 데이터의 일체화
4. 대칭성
5. 선언형의 표현
6. 변경 빈도

* 1.결과의 국소화
    * 변경이 미치는 영향이 국소에 머무르도록 코드를 구성
    * 모듈화
    * 관계성이 높은 코드는 모으고, 관계성이 낮은 코드는 서로 종속되지 않도록 코드를 작성
    * 관계성이 높은 코드는 집약해서 모듈화
* 2.반복의 최소화
    * 중복을 최대한 제거
    * 논리적인 중복도 포함
* 3.로직과 데이터의 일체화
    * 코드를 수정할 때 로직과 해당 로직이 조작하는 데이터는 대개 같은 시점에 변경됨
    * 로직과 해당 로직이 조작하는 데이터를 서로 가까이에 배치
    * 가까이란 같은 함수, 같은 모듈
* 4.대칭성
    * SLAP와 유사
    * 프로그래밍에서 대칭성이란 도형x, 개념적o
    * 그룹 안에서의 수준 맞추기
    * 같은 종류의 것, 즉 동질의 것은 같은 수준으로 표현
    * 대칭성의 추구는 중복을 제거하기 위한 준비 작업
        * 추가 메서드가 있다면 대응하는 삭제 메서드를 작성
        * 특정 그룹에 있는 함수는 같은 파라미터를 갖도록
        * 특정 모듈 안의 데이터는 전부 생존 기간이 같도록
        * 특정 함수 안에서 호출하는 함수의 추상도는 같은 수준
* 5.선언형의 표현
    * 명령형보다는 선언형으로 표현
    * 명령형 프로그래밍은 문제의 해법, 즉 자료구조와 알고리즘을 기술
    * 선언형 프로그래밍은 문제의 정의, 즉 해결해야 한 문제의 성질이나 이때 충족해야 할 제약을 기술
    * 선언형 코드는 순서나 조건 분기가 없다.
    * 대표적인 기법에는 어노테이션(annotation)이나 DSL이 있다.
    * django의 loginrequired 같은 것.
* 6.변경 빈도
    * 코드를 수정하는 시점이 같다는 의미. 즉, 변경 이유가 같다는 뜻
    * 같은 시점에 변경되는 요소는 같은 곳에, 다른 시점에 변경되는 요소는 다른 곳에
    * 대칭성의 원칙을 시간에 대해 적용한 원칙
    * 모듈처럼 어떤 형태의 단위로 그룹핑된 코드에서 변경 이유를 여러 개 가진 코드는 깨지기 쉬운 코드다.
    * 이는 로직과 데이터에도 적용된다.
    * 단일 책임의 원칙(SRP: Single Responsibility Prinsiple)
        * 모듈을 변경하는 이유가 여러개 존재해서는 안 된다.
        * 그런 상태로 만들려면 변경 빈도 원칙을 적용해야 한다.
        * 변경 이유나 빈도가 같은 코드를 한데 모으면 자연스럽게 단일 책임의 원칙을 충족하는 모듈이 완성된다.

## 아키텍쳐 기본 기법
1. 추상
추상이라고 하면 가장 먼저 떠올릴 수 있는 것이 클래스입니다.

클래스를 잘 사용하면 반복을 최소화하고 로직과 데이터를 일체화 시킬 수 있습니다.

클래스의 데이터와 메소드를 private, public을 구분하여 지정하는 것은 결과의 국소화를 위해서입니다.

그리고 클래스를 구성할 때 연관성이 깊은 데이터들을 잘 모아서 구성한다면 변경 빈도를 맞출 수 있습니다.

즉, 해당 클래스를 변경해야 할 이유를 특정 영역으로 제한하는 것이 가능해집니다.


2. 캡슐화
관련성이 높은 데이터와 로직을 하나의 모듈에 모으는 것을 캡슐화하고 합니다. 캡슐화라는 표현 자체에 3.로직과 데이터의 일체화라는 의미가 포함되어 있습니다.

캡슐화가 잘 되어있으면 특정 데이터나 로직의 변화가 최소한의 모듈의 변화에 한정될 수 있습니다. 변화가 한정되어 있다는 얘기는 결국 6.변경 빈도를 맞출 수 있다는 의미가 됩니다


3. 정보 은닉
정보 은닉은 모듈이 어떻게 구현되었는지 그 모듈의 사용자가 알 수 없게, 혹은 알 필요가 없게 만드는 것입니다.

정보 은닉을 성공적으로 구현한다면 1.결과의 국소화와 6.변경 


4. 패키지화
모듈을 의미있는 단위로 모은 다음 그룹화

소프트웨어 전체를 의미 있는 단위로 분할 한 것

대규모 소프트웨어가 되면 대량ㅇ으로 작성된 모듈이 오히려 복잡성을 낳는다.

ex) datetime


5. 관심의 분리
관심이란 소프트웨어의 기능이나 목적을 의미한다.

가장 대표적인 패턴이 MVC 패턴


6. 충족성, 완전성, 프리미티브성(원시성, 순수성)
충족성: 표현하고자 하는 추상이 그것을 전하기에 충분한가

완전성: 표현하고자 하는 추상이 모든 특징을 갖추고 있는가

프리미티브성: 추상이 모두 순수한가.


7. 정책과 구현의 분리


8. 인터페이스와 구현의 분리
모둘이 내부에 어떻게 구현되었는지는 알 필요 없이 사용자는 인터페이스만 알면 된다는 것을 의미합니다.

앞에 설명했던 파르나스의 규칙과 같은 의미입니다.

이렇게 프로그래밍이 작성되었다면 1.결과의 국소화가 자연스럽게 반영됩니다. 인터페이스를 최대한 보존한 상태에서 구현 로직을 변경할 수 있다면 해당 모듈 변경의 영향은 최소화될 수 있습니다.


9. 참조의 단일성
모듈의 요소에 관한 선언과 정의는 1회로 제한한다.는 말의 의미는 변수값을 초기화했다면 이후 값을 변경하지 않는다는 의미라고 책에 설명되어 있습니다. 요즘 유행하는 함수형 프로그래밍에서 많이 나오는 이야기이긴 하지만 자바나 C# 같은 객체 지향 프로그래밍에서도 불변변수나 불변객체를 많이 강조했다고 들었습니다.

값을 변경하지 않는다는 의미는 결국 해당 변수에 접근하는 로직이나 스코프를 최대한 줄인다는 의미가 됩니다. 이는 곧 결과의 국소화와 연관됩니다.


10. 분할 정복
커다란 문제를 잘게 나누어 분할 정복하려고 할 때 1.결과의 국소화, 2.반복의 최소화, 3.로직과 데이터의 일체화, 6.변경 빈도를 고려하면 나누는 기준을 좀 더 명확하게 할 수 있다.


1. 추상
2. 캡슐화
3. 정보 은닉
4. 패키지화
5. 관심의 분리
6. 충족성, 완전성, 프리미티브성(원시성, 순수성)
7. 정책과 구현의 분리
8. 인터페이스와 구현의 분리
9. 참조의 단일성
10. 분할 정복

----
## 캡슐화
* 간단한 디지털 카메라를 구현한다.(추상화)
```java
public class DigitalCamera {
    public Image takeSnapshot() { }
    public void flashLightOn() { }
    public void flaslLightOff() { }
}
```

* 위 코드를 스마트폰 앱 프로그램에서 사용
```java
public class SmartphoneApp {
    private static DigitalCamera camera = new DigitalCamera();

    public static void main(String[] args) {
        Image image = camera.takeSnapshot();
        ...
    }
}
```

* 디지털 카메라 클래스가 확장됨
* SmartphoneApp은 초기 메서드 3개만 사용하고 있지만
* DigitalCamera 클래스는 하나밖에 없기 때문에 어쩔 수 없이 사용
* DigitalCamera 클래스에 변경이 있을 경우 항상 SmartphoneApp 클래스를 신경써야 함
```java
public class DigitalCamera {
    public Image takeSnapshot() { }
    public void flashLightOn() { }
    public void flaslLightOff() { }
    public Image takePanoramaSnapshot() { }
    public Video record() { }
    public void setTimer(int seconds) { }
    public void zoomIn() { }
    public void zoomOut() { }
}
```

* 결합도를 낮추기 위해 인터페이스 정의
```java
public interface SimpleDigitalCamera {
    Image takeSnapshot();
    void flashLightOn();
    void flashLightOff();
}

public class DigitalCamera implements SimpleDigitalCamera {
    public Image takeSnapshot() { }
    public void flashLightOn() {}
    public void flashLightOff() {}
}

public class SDK {
    public static SimpleDigitalCamera getCamera() {
        return new DigitalCamera();
    }
}

public class SmartphoneApp {
    private static SimpleDigitalCamera camera = SDK.getCamera();
    public static void main(String[] args) {
        Image image = camera.takeSnapshot();
    }
}
```

----
## 관심사의 분리
* 최초 구현
```java
public class UserService {
    public User loadUser(String userId) { ... }
    public boolean doesUserExist(String userId) { ... }
    public User changeUserInfo(UserInfo userInfo) { ... }
}
```

* 알람 서비스, 차단된 사용자 조회 등 기능 추가
* 과도한 기능이 구현되어 있음
* 클래스 내부에 서로 관심이 없는 기능들이 섞여있음
* 관심사를 적절하게 분리하지 못한 예
```java
public class UserService {
    public User loadUser(String userId) { }
    public boolean doesUserExist(String userId) { }
    public User changeUserInfo(UserInfo userInfo) { }
    public List<NotificationType> getNotificationTypes(User user) { }
    public void registerForNotifications(User user, NotificationType type) { }
    public void unregisterForNotifications(User user, NotificationType type) { }
    public List<User> searchUsers(UserInfo userInfo) { }
    public void blockUser(User user) { }
    public List<User> getAllBlockedUsers() { }
}
```

* UserService를 3개의 클래스로 분리
* UserService는 알람 서비스나 차단과 관련된 로직을 알지 못함
```java
public class UserNotificationService {
    public List<NotificationType> getNotificationTypes(User user) { }
    public void register(User user, NotificationType type) { }
    public void unregister(User user, NotificationType type) { }
}

public class UserBlockService {
    public void blockUser(User user) { }
    public List<User> getAllBlockedUsers() { }
}

public class UserService {
    public User loadUser(String userId) { }
    public boolean doesUserExist(String userId) { }
    public User changeUserInfo(UserInfo userInfo) { }
    public List<User> searchUsers(UserInfo userInfo) { }
}
```

----

## 정책과 구현
```java
public interface CloudServerFactory {
    CloudServer launchComputeServer();

    CloudServer launchDatabaseServer();

    CloudStorage createCloudStorage(long sizeGb);
}

public class AWSCloudServerFactory implements CloudServerFactory {
    public CloudServer launchComputeServer() {
        return new AWSComputeServer();
    }

    public CloudServer launchDatabaseServer() {
        return new AWSDatabaseServer();
    }

    public CloudStorage createCloudStorage(long sizeGb) {
        return new AWSCloudStorage(sizeGb);
    }
}

public class AzureCloudServerFactory implements CloudServerFactory {
    public CloudServer launchComputeServer() {
        return new AzureComputeServer();
    }

    public CloudServer launchDatabaseServer() {
        return new AzureDatabaseServer();
    }

    public CloudStorage createCloudStorage(long sizeGb) {
        return new AzureCloudStorage(sizeGb);
    }
}
```
