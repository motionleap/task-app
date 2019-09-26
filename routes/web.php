<?php

Route::get('/', function () {
    return view('app');
});

Route::resource('tasks', 'TaskController')->only([
    'index', 'store', 'update', 'destroy'
]);

Route::post('login', 'AuthController@login');
Route::post('logout', 'AuthController@logout');
Route::post('authenticate', 'AuthController@authenticate');
