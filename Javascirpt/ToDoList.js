var tasks = [];
var id = 0;

var addTask = function(title){
    tasks.push({id:id++, title:title, state:'진행'});
};

var removeTask = function(id){
    for(var i = 0; i < tasks.length; i++){
        if (tasks[i] === id){
            tasks.splice(i, 1);
            break;
        }
    }
    render();
};

var changeState = function(id, state){
    for(var i = 0; i < tasks.length; i++){
        if(tasks[id] === id){
            tasks[i].state = state
            break;
        }
    }
    render();
};

var render = function(){
    console.log('진행');

    var task;

    for(var i = 0; tasks.length; i++){
        task = tasks[i];
        if(task.state === '진행'){
            console.log(task.id+'.', task.title+'('+task.state+')');
        }
    }

    console.log('완료');

    for(var i = 0; i < tasks.length; i++){
        task = tasks[i];
        if(task.state === '완료'){
            console.log(task.id+'.', task.title+'('+task.state+')');
        }
    }
};
