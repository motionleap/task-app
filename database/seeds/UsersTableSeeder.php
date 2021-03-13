<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user_id = DB::table('users')->insertGetId([
            'name' => 'Demo',
            'email' => 'demo@gmail.com',
            'password' => bcrypt('password'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        App\User::find($user_id)->tasks()->saveMany(factory(App\Task::class, 10)->make());

        factory(App\User::class, 5)->create()->each(function ($user) {
            $user->tasks()->saveMany(factory(App\Task::class, 5)->make());
        });
    }
}
