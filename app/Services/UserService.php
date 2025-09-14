<?php

namespace App\Services;

use App\Repositories\UserRepository;

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
}
