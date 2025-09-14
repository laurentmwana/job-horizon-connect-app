<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    /**
     * @param string $field
     * @param string $value
     */
    public function findBy(string $field, string $value)
    {
        return User::where($field, $value)->first();
    }

    /**
     * @param string $value
     * @return User|null
     */
    public function findByidentifiant(string $value)
    {
        return User::where(function ($query) use ($value) {
            $query->where('name', $value)->orWhere('email', $value);
        })->first();
    }
}
