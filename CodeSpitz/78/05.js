const err = v => {
  throw v;
}

const TRUE = {}, FALSE = {};

const Task = class{
  constructor(title, isCompleted=false){
    this.title = title;
    // title은 immutable이다.
    this.isCompleted = false;
    // boolean은 상태가 2개 이상으로 증가했을 때 문제가 될 수 있다.
    // 그래서 enum을 사용한다.
    // mutable한 변수는 외부에서 값을 받을지 말지를 결정해야 한다.
    // setter 메서드가 없다면 immutable일 가능성이 높다.
    // 변수가 값을 가질것이냐 객체를 가질 것이냐를 결정해야한다.
    // 값일 경우 값을 검사해야 하고 객체일 경우 해당 객체를 검증해야 한다.
    // 값은 다양한 값이 들어올 가능성이 있지만 객체는 타입이나 특정 객체를 한정할 수 있다.
  }
  setTitle(title){
    this.title = title; // mutable
    // return new Task(title, this.isCompleted); // immutable
  };
  // boolean 변수의 값을 바꿀 때는 set 같은 메서드명을 사용하면 안된다.
  // 어울리는 메서드명은 toggle이다.
  toggle(){
    this.isCompleted = !this.isCompleted; // immutable
    // return new Task(this.title, !this.isCompleted)  // mutable
  };
  // isEqual(task){
  //   return task.title == this.title && task.isCompleted;
  // }
  // 객체지향은 값으로 데이터를 식별하지 않는다. 참조로 식별한다.
  getInfo(){
    return {title: this.title, isCompleted: this.isCompleted};
  };
  // getInfo는 왜 값을 리턴할까?
  // 순간의 snapshot을 제공해야 하기때문에 무조건 값을 제공해야 한다.
  // 외부에 값을 전달할 때는 값을 제공하는 것이 더 낫다.
};
const Folder = class{
  constructor(title){
    this.title = title;
    this.tasks = new Set();
  };
  // addTask(title, isCompleted){
  //   this.tasks.add(new Task(title));
  // };
  addTask(task){
    if(!(task instanceof Task)) err('invalid task');
    // javascript는 런타임에 에러를 체크해야 한다.
    // 강타입 언어라면 인자를 바로 검사할 수 있다.
    this.tasks.add(task);
  };
  // 문자열을 전달하는 것이 나은가, task 객체를 전달하는 것이 좋은가.
  // 문자열을 전달하면 task 자체를 은닉할 수 있다.
  // 하지만 task 객체의 속성이 많다면 title과 같이 모든 속성을 전달해야 한다.
  // 이렇게 되면 coupling 속성이 지나치가 높아질 수 있다.
  // 가장 중요한 역할의 관점에서 보면 문자열 title을 전달하는 것은 완전히 잘못된 코드다.
  // 생성자를 보면 Folder의 역할을 알 수 있다.
  // Folder는 단순히 Folder의 title을 받고 task들을 저장하는 것이다.
  // Task를 생성하는 것은 Folder의 역할이 아니다.
  // Validation도 간단해진다.
  removeTask(task){
    if(!(task instanceof Task)) err('invalid task');
    this.tasks.delete(task);
  };
  getTasks(){
    return [...this.tasks.values()];
  };
};
const App = class{
  constructor(){
    this.folders = new Set();
  }
  addFolder(folder){
    if (!(folder instanceof Folder)) err('invalid folder');
    this.folders.add(folder)
  }
  removeTask(folder){
    if(!(folder instanceof Folder)) err('invalid task');
    this.folders.delete(folder);
  };
  getFolders(){
    return [...this.folders.values()];
  };
};

const Renderer = class{
  constructor(app){
    this.app = app;
  };
  render(){
    this._render();
  };
  _render(){
    err('must be overrided');
  };
};
const el = (tag) => document.createElement(tag);
const DomRenderer = class extends Renderer{
  constructor(parent, app){
    super(app);
    this.el = parent.appendChild(el('section'));
    this.el.innerHTML=`
      <nav>
        <input type="text">
        <ul></ul>
      </nav>
      <section>
        <header>
          <h2></h2>
          <input type="text">
        </header>
        <ul></ul>
      </section>
    `;
    const ul = this.el.querySelectorAll('ul')
    this.folder = ul[0];
    this.task = ul[1];
    this.currentFolder = null;
    const ul = this.el.querySelectorAll('input')
    input[0].addEventListener("keyup", e=>{
      if(e.keyCode !== 13) return;
      const v = e.target.value.trim();
      if(!v) return;
      const folder = new Folder(v);
      this.app.addFolder(folder);
      e.target.value = '';
    });
   input[1].addEventListener("keyup", e=>{
      if(e.keyCode !== 13 || !this.currentFolder) return;
      const v = e.target.value.trim();
      if(!v) return;
      const task = new Task(v);
      this.currentFolder.addTask(task);
      e.target.value = '';
    });
  }
};

(()=>{
let isOkay = true;
const task = new Task('test1');
const folder = new Folder('folder1');
isOkay = folder.getTasks.length == 0;
console.log('test1', isOkay);
folder.addTask(task);
isOkay = folder.getTasks().length == 1 && folder.getTasks()[0].getInfo().title == 'test1';
console.log('test2', isOkay);
task.toggle();
isOkay = task.getInfo().title == 'test1' && task.getInfo().isCompleted == true;
console.log('test3', isOkay);
});
// let부터 쓰여진 코드가 이 app의 주체다.
// 객체지향 프로그램에서 주인은 주체다. 객체가 주인이 아니다.
// 객체는 잘 숨겨지고 포장되어야 한다. 주체는 객체의 상세구현은 관심없다. 단지 사용하기만 하면 된다.
// 라이브러리나 프레임워크를 이해하는 가장 빠른 방법은 그것을 사용하는 코드를 만들어보는 것이다.
// 이것이 테스트가 필요한 이유도 된다.
