<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Task;
use Faker\Generator as Faker;

$factory->define(Task::class, function (Faker $faker) {
    return [
        'user_id' => '',
        'name' => $faker->text(25),
        'completed' => $faker->boolean(25),
        'due_at' => $faker->dateTimeBetween('-5 days', '1 month'),
        'deleted_at' => $faker->randomElement([$faker->dateTimeBetween('-1 month', 'now'), null]),
        'created_at' => $faker->dateTimeBetween('-2 months', '-1 month'),
        'updated_at' => $faker->dateTime(),
    ];
});
