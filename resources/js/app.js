(function () {
    'use strict';

    var root = this;

    var tasks = [];
    var taskList = document.getElementById('task-list');
    var taskFilters = document.getElementById('task-filters').getElementsByTagName('input');
    var sortByDueDate = false;

    function renderTasks(tasks) {

        sortTasks();

        taskList.innerHTML = '';

        tasks.forEach(function (task, index) {

            var date = tasks[index].due_at.split(/[- :]/);
            var due_date = new Date(date[0], date[1] - 1, date[2]).toLocaleDateString('en-US');

            var due_message = 'Due: ' + due_date;
            tasks[index].past_due = false;
            if (new Date().setHours(0, 0, 0, 0) > Date.parse(due_date)) {
                due_message = 'Past Due: ' + due_date;
                tasks[index].past_due = true;
            }

            if (tasks[index].deleted_at) {
                tasks[index].deleted = true;
            }

            var taskItem = document.createElement('li');
            taskItem.className = 'task-item list-group-item d-flex justify-content-between';
            taskItem.innerHTML = `
                <div class="form-check">
                    <input class="complete-task form-check-input" type="checkbox" value="${tasks[index].id}" id="check${tasks[index].id}">
                    <label class="form-check-label ml-3 mr-3" for="check${tasks[index].id}">${tasks[index].name}</label>
                </div>
                <div class="text-nowrap">
                    <button type="button" class="delete-task action d-inline" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <button type="button" class="restore-task action">
                        <svg class="restore-icon" viewBox="-3 2 15 15"><path fill-rule="evenodd" d="M5 3L0 9h3v4h4V9h3L5 3z"></path></svg>
                    </button>
                    <button type="button" class="edit-task action d-inline mr-3" aria-label="Edit">
                        <svg class="edit-icon" viewBox="0 2 15 15"><path fill-rule="evenodd" d="M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 0 1 1.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z"></path></svg>
                    </button>
                    <span class="deleted-task small mr-2 text-danger">DELETED</span>
                    <span class="task-due badge badge-pill mr-3 d-inline">${due_message}</span>
                </div>`;

            if (task.hide) {
                taskItem.classList.add('hidden');
            } else {
                taskItem.classList.remove('hidden');
            }

            taskItem.getElementsByClassName('edit-task')[0].addEventListener('click', function () {
                editTask(taskItem, index);
            });

            taskItem.getElementsByClassName('delete-task')[0].addEventListener('click', function () {
                deleteTask(tasks[index].id, index);
            });

            taskItem.getElementsByClassName('restore-task')[0].addEventListener('click', function () {
                restoreTask(tasks[index].id, index);
            });

            taskItem.getElementsByClassName('complete-task')[0].addEventListener('click', function () {
                updateTask(tasks[index].id, index, {completed: this.checked});
            });

            setStatus(taskItem, index);
            taskList.appendChild(taskItem);
        });

        resultsMessage();
    }

    function setStatus(taskItem, index) {
        if (tasks[index].deleted) {
            taskItem.classList.add('task-deleted');
        } else {
            taskItem.classList.remove('task-deleted');
        }
        if (tasks[index].completed) {
            taskItem.classList.add('task-completed');
            taskItem.classList.remove('task-active');
            taskItem.getElementsByClassName('form-check-input')[0].checked = true;
        } else {
            taskItem.classList.remove('task-completed');
            taskItem.classList.add('task-active');
            taskItem.getElementsByClassName('form-check-input')[0].checked = false;
        }
        if (tasks[index].past_due) {
            taskItem.classList.add('task-past-due');
        } else {
            taskItem.classList.remove('task-past-due');
        }
    }

    function editTask(taskItem, index) {
        taskItem.classList.remove('d-flex');
        taskItem.innerHTML = `
            <form class="update-task-form">
                <div class="form-row">
                    <div class="col-8">
                        <input type="text" class="form-control task-description" placeholder="Task Description" value="${tasks[index].name}">
                    </div>
                    <div class="col-4">
                        <div class="input-group">
                            <input type="date" class="form-control task-due-date" placeholder="Date Due">
                            <div class="input-group-append">
                                <button class="btn btn-success update-task-button" type="submit">Update Task</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>`;

        var date = new Date(tasks[index].due_at);
        taskItem.getElementsByClassName('task-due-date')[0].value = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');

        taskItem.getElementsByClassName('update-task-form')[0].addEventListener('submit', function (e) {
            e.preventDefault();
            var task = makeTask(taskItem);

            if (task === false) {
                return false;
            }

            updateTask(tasks[index].id, index, task);
        });
    }

    function getTasks() {
        request('GET', 'tasks', [], function (response) {
            tasks = response.tasks;
            renderTasks(tasks);
        });
    }

    function makeTask(scope) {
        var name = scope.getElementsByClassName('task-description')[0].value;
        var date = scope.getElementsByClassName('task-due-date')[0].value;
        if (name === '') {
            return false;
        }

        return {
            name: name,
            due_at: date,
        };
    }

    function addTask(scope) {
        var task = makeTask(scope);

        if (task === false) {
            return false;
        }

        request('POST', 'tasks', task, function (response) {
            tasks.push(response);
            renderTasks(tasks);
            resetTaskForm();
        });
    }

    function updateTask(id, index, task) {
        request('PUT', 'tasks/' + id, task, function (response) {
            tasks[index] = response;
            renderTasks(tasks);
        });
    }

    function deleteTask(id, index) {
        request('DELETE', 'tasks/' + id, [], function (response) {
            tasks[index].deleted = true;
            renderTasks(tasks);
        });
    }

    function restoreTask(id, index) {
        request('PUT', 'tasks/' + id, {deleted_at: null}, function (response) {
            tasks[index] = response;
            renderTasks(tasks);
        });
    }

    function sortTasks() {
        if (sortByDueDate === true) {
            tasks.sort(function (a, b) {
                return new Date(a.due_at) - new Date(b.due_at);
            });
        } else {
            tasks.sort(function (a, b) {
                return a.id - b.id;
            });
        }
    }

    function applyFilters() {
        Array.from(taskFilters).forEach(function (el) {
            if (el.checked) {
                taskList.classList.remove(el.value);
            } else {
                taskList.classList.add(el.value);
            }
        });
        resultsMessage();
    }

    function resultsMessage() {
        var el = document.getElementById('no-results-message');
        if (taskList.offsetHeight === 0) {
            el.classList.remove('d-none');
        } else {
            el.classList.add('d-none');
        }
    }

    function searchFilter(query) {
        tasks.forEach(function (task) {
            task.hide = (!task.name.toLowerCase().includes(query.toLowerCase()));
        });

        renderTasks(tasks);
    }

    function isAuthenticated(callback) {
        request('POST', 'authenticate', [], function (response) {
            document.getElementById('app').classList.remove('loading');
            if (response.authenticated === true) {
                document.getElementsByClassName('auth-name')[0].innerHTML = response.name;
                document.getElementById('app').classList.add('authenticated');
                callback();
            }
        });
    }

    function authenticate() {
        var login = {
            email: document.getElementById('auth-email').value,
            password: document.getElementById('auth-password').value,
        };

        request('POST', 'login', login, function (response) {
            if (response.authenticated === true) {
                document.getElementsByClassName('auth-error')[0].classList.remove('d-none');
                document.getElementsByClassName('auth-name')[0].innerHTML = response.name;
                document.getElementById('app').classList.add('authenticated');
                getTasks();
            } else {
                document.getElementsByClassName('auth-error')[0].innerHTML = 'Authentication Failed';
                document.getElementsByClassName('auth-error')[0].classList.remove('d-none');
            }
        });
    }

    function authenticationGuard() {
        document.getElementById('app').classList.remove('authenticated');
    }

    function logout() {
        request('POST', 'logout', [], function () {
            authenticationGuard();
        });
    }

    function request(verb, path, data, callback) {
        var xhr = new XMLHttpRequest();
        var csrfToken = document.querySelector('meta[name=csrf_token]').getAttribute('content');
        xhr.open(verb, path, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('X-CSRF-TOKEN', csrfToken);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    callback(JSON.parse(xhr.responseText));
                } else if (xhr.status === 401) {
                    authenticationGuard();
                } else {
                    alert('Error, please try again.');
                }
            }
        };
        xhr.send(JSON.stringify(data));
    }

    function resetTaskForm() {
        var date = new Date();
        document.getElementsByClassName('task-due-date')[0].value = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
        document.getElementsByClassName('task-description')[0].value = '';
    }

    function init() {

        resetTaskForm();

        document.getElementById('auth-form').addEventListener('submit', function (e) {
            e.preventDefault();
            authenticate();
        });

        document.getElementById('auth-logout').addEventListener('click', function () {
            logout();
        });

        document.getElementById('search-query').addEventListener('keyup', function (e) {
            e.preventDefault();
            var query = document.getElementById('search-query').value;
            searchFilter(query);
        });

        Array.from(taskFilters).forEach(function (el) {
            el.addEventListener('click', function () {
                applyFilters();
            });
        });

        document.getElementById('create-task-form').addEventListener('submit', function (e) {
            e.preventDefault();
            addTask(this);
        });

        document.getElementById('task-sort').addEventListener('change', function () {
            sortByDueDate = this.checked;
            renderTasks(tasks);
        });

        applyFilters();

        isAuthenticated(function () {
            getTasks();
        });
    }

    init();
})();