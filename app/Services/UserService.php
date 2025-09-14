<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;

class UserService
{
    /**
     * @param string $field
     * @param string $value
     * @return \App\Models\User|null
     */
    public function findBy(string $field, string $value)
    {
        return app(UserRepository::class)
            ->findBy($field, $value);
    }


    /**
     * @param string $value
     * @return \App\Models\User|null
     */
    public function findByIdentifiant(string $value)
    {
        return app(UserRepository::class)->findbyIdentifiant($value);
    }


    /**
     * @param array $data
     * @return \App\Models\User
     */
    public function register(array $data): User
    {
        return DB::transaction(function () use ($data) {
            $user = User::create([
                ...$data,
                'password' => Hash::make('12345678'),
            ]);

            if ($user instanceof User) {
                event(new Registered($user));
            }

            return $user;
        });
   
    }
}
