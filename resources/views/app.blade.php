<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf_token" content="{{ csrf_token() }}"/>

    <title>Task App</title>

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

</head>
<body>
<span class="octicon octicon-pencil"></span>
<div id="app" class="loading">

    <!-- #authentication -->
    <div class="container" id="authentication">
        <div class="row justify-content-center align-items-center">
            <div class="col-4">

                <div class="auth-error d-none p-3 mb-2 bg-danger text-white"></div>

                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Task App Login</h5>
                        <p class="card-text">
                            <strong>Email:</strong> demo@gmail.com<br>
                            <strong>Password:</strong> password<br>
                        </p>
                        <form id="auth-form">
                            <div class="form-group">
                                <input id="auth-email" name="email" type="text" class="form-control"
                                       placeholder="Email">
                            </div>
                            <div class="form-group">
                                <input id="auth-password" name="password" type="password" class="form-control"
                                       placeholder="Password">
                            </div>
                            <button type="submit" id="auth-submit" class="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div><!-- /#authentication -->


    <!-- #tasks -->
    <div class="container" id="tasks">

        <nav class="navbar navbar-dark bg-dark justify-content-between mb-2">
            <span class="navbar-brand mb-0 h1">My Tasks</span>
            <div>
                <span class="badge badge-pill badge-primary auth-name mr-2"></span>
                <button type="button" class="btn btn-dark" id="auth-logout">Logout</button>
            </div>
        </nav>

        <div class="form-row">

            <div class="col-7">
                <input id="search-query" type="text" class="form-control" placeholder="Search">
            </div>
            <div class="col mt-2 text-right" id="task-filters">
                <div class="form-check form-check-inline mr-3">
                    <input id="active-filter" type="checkbox" name="options" autocomplete="off"
                           value="active-filter" checked>
                    <label class="form-check-label ml-2" for="active-filter">Active</label>
                </div>
                <div class="form-check form-check-inline mr-3">
                    <input id="completed-filter" type="checkbox" name="options" autocomplete="off"
                           value="completed-filter" checked>
                    <label class="form-check-label ml-2" for="completed-filter">Completed</label>
                </div>
                <div class="form-check form-check-inline mr-3">
                    <input id="deleted-filter" type="checkbox" name="options" autocomplete="off"
                           value="deleted-filter">
                    <label class="form-check-label ml-2" for="deleted-filter">Deleted</label>
                </div>
            </div>
            <div class="col-auto text-right">
                <div class="custom-control custom-switch mt-2 mr-3">
                    <input type="checkbox" class="custom-control-input" id="task-sort" value="due_date">
                    <label class="custom-control-label" for="task-sort">Due First</label>
                </div>
            </div>

        </div>

        <div class="row mt-2 mb-2">
            <div class="col">

                <ul class="list-group d-none" id="no-results-message">
                    <li class="list-group-item text-center">No results to display.</li>
                </ul>
                <ul class="list-group" id="task-list">

                </ul>

            </div>
        </div>

        <form id="create-task-form">
            <div class="form-row">
                <div class="col-8">
                    <input type="text" class="form-control task-description" placeholder="Task Description">
                </div>
                <div class="col-4">
                    <div class="input-group">
                        <input type="date" class="form-control task-due-date" placeholder="Date Due">
                        <div class="input-group-append">
                            <button id="create-task-button" class="btn btn-success" type="submit">Create Task</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

    </div><!-- /#tasks -->

</div>


<script src="{{ asset('js/app.js')}}"></script>


</body>
</html>
