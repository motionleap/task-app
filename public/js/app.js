/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
      taskItem.innerHTML = "\n                <div class=\"form-check\">\n                    <input class=\"complete-task form-check-input\" type=\"checkbox\" value=\"".concat(tasks[index].id, "\" id=\"check").concat(tasks[index].id, "\">\n                    <label class=\"form-check-label ml-3 mr-3\" for=\"check").concat(tasks[index].id, "\">").concat(tasks[index].name, "</label>\n                </div>\n                <div class=\"text-nowrap\">\n                    <button type=\"button\" class=\"delete-task action d-inline\" aria-label=\"Close\">\n                        <span aria-hidden=\"true\">&times;</span>\n                    </button>\n                    <button type=\"button\" class=\"restore-task action\">\n                        <svg class=\"restore-icon\" viewBox=\"-3 2 15 15\"><path fill-rule=\"evenodd\" d=\"M5 3L0 9h3v4h4V9h3L5 3z\"></path></svg>\n                    </button>\n                    <button type=\"button\" class=\"edit-task action d-inline mr-3\" aria-label=\"Edit\">\n                        <svg class=\"edit-icon\" viewBox=\"0 2 15 15\"><path fill-rule=\"evenodd\" d=\"M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 0 1 1.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z\"></path></svg>\n                    </button>\n                    <span class=\"deleted-task small mr-2 text-danger\">DELETED</span>\n                    <span class=\"task-due badge badge-pill mr-3 d-inline\">").concat(due_message, "</span>\n                </div>");

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
        updateTask(tasks[index].id, index, {
          completed: this.checked
        });
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
    taskItem.innerHTML = "\n            <form class=\"update-task-form\">\n                <div class=\"form-row\">\n                    <div class=\"col-8\">\n                        <input type=\"text\" class=\"form-control task-description\" placeholder=\"Task Description\" value=\"".concat(tasks[index].name, "\">\n                    </div>\n                    <div class=\"col-4\">\n                        <div class=\"input-group\">\n                            <input type=\"date\" class=\"form-control task-due-date\" placeholder=\"Date Due\">\n                            <div class=\"input-group-append\">\n                                <button class=\"btn btn-success update-task-button\" type=\"submit\">Update Task</button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </form>");
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
      due_at: date
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
    request('PUT', 'tasks/' + id, {
      deleted_at: null
    }, function (response) {
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
      task.hide = !task.name.toLowerCase().includes(query.toLowerCase());
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
      password: document.getElementById('auth-password').value
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

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/sass/app.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Applications/MAMP/htdocs/development/task-app/resources/js/app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! /Applications/MAMP/htdocs/development/task-app/resources/sass/app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });