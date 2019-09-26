const Task = function() {
    let task = {
        id: null,
        name: '',
        due_at: null,
    };

    task.due = function() {
        let date = task.due_at.split(/[- :]/);
        return new Date(date[0], date[1] - 1, date[2]).toLocaleDateString('en-US');
    };

    task.update = function(data) {
        task = Object.assign(task, data);
    };

    return task;
};

const TaskComponent = function (task) {

    const state = {
        id: null,
        task: new Task(),
    };

    state.update = function(task) {
        state.task.update(task);
    };

    function init(task) {
        state.id = task.id;
        state.update(task);

        return state;
    }

    return init(task);
};

const TaskList = function () {
    const tasks = {};

    this.add = function (task) {
        console.log(task);
        tasks[task.id] = task;
        console.log(tasks);
    };

    this.remove = function (id) {
        delete tasks[id];
    };

    this.pull = function (id) {
        return tasks[id].task;
    };

    this.update = function (task) {
        tasks[task.id] = Object.assign(tasks[task.id], task);
    };
};