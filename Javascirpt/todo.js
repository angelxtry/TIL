var task = [];
var STATE_P = '진행';
var STATE_C = '완료';

var addTask = (function() {
    var id = 0;
    return function(title){
                tasks.push({
                    title: title,
                    id: id++,
                    state: STATE_P
                });
                render();
            };
})();

// lexical만으로 코드를 짠다. 함수를 구현한다.

// small foot step

var removeTask = function(id){
    isRemoved = false;

    for(var i = 0; i < tasks.length; i++){
        if(tasks[i].id === id){
            tasks.splice(i, 1);
            isRemoved = True;
            break;
        }
    }

    if(!isRemoved){
        warning('removeTask: invalid id')
    }

    render();
};
// splice() index에 있는 것을 갯수만큼 삭제

// 회귀테스트가 중요하다. 이것을 위해서 unitTest를 쓰자.

// isRemoved 때문에 console에 바인딩되버렸다. 이런 상황을 native bindng 되었다고 한다.

var changeState = function(id, status){
    var ID = false, STATE;
    for(var i = 0; i < tasks.length; i++){
        if(tasks[i].id === id){
            ID = id;
            break;
        }
    }
    if(ID === fase){
        warning('changeState: invalid id - ' + id);
        return;
    }

    if(state !== STATE_P && state !== STATE_C){
        warning('changeState: invalid state - ' + state);
        return;
    } else {
        STATE = state;
    }

    for(var i = 0; i <tasks.length; i++){
        if(tasks[i].id === ID){
            tasks[i].state = STATE 
            break;
        }
    } 
};
// shild pattern 이라고 부른다.
// shild를 ||로 구현할 수도 있지만 로직을 최대한 간단하게 구현하려면 &&가 낫다.
// validation되기 전 값을 blacklist
// validation 이후의 값을 whitelist
// 로직에는 whitelist만 사용한다.

var warning = console.log();

var render = function(){

    var task;

    console.log('진행');
    for(var i = 0; i < tasks.length; i++){
        task = tasks[i]
        if(task.state == '진행'){
            console.log(task.id + '|' + task.title + '|' + task.state)
        }
    }

    console.log('완료');
    for(var i = 0; i < tasks.length; i++){
        task = tasks[i]
        if(task.state == '완료'){
            console.log(task.id + '|' + task.title + '|' + task.state)
        }
    }

    console.log('추가: addTask(할일 내용)')
    console.log('삭제: addTask(id)')
    console.log('상태변경: addTask(id 상태)')

}