<?php

namespace App\Services;

use App\Dto\UserDto;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

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
            $user = User::create($data);

            if ($user instanceof User) {
                event(new Registered($user));
            }

            return $user;
        });

    }

    /**
     * @param array $data
     * @return void
     */
    public function forgotPassword(array $data): void
    {
        DB::transaction(function () use ($data) {
            Password::sendResetLink($data);
        });
    }

    /**
     * @param int $perPage
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function findPaginatedAndFiltered(int $perPage = 15)
    {
        return app(UserRepository::class)
            ->findPaginatedAndFiltered($perPage);
    }

    /**
     * @param string $id
     * @param bool $withRelation
     * @return \App\Models\User
     */
    public function findById(string $id, bool $withRelation = true)
    {
        return app(UserRepository::class)
            ->findById($id, $withRelation);
    }

    /**
     * @param \App\Dto\UserDto $dto
     * @return \App\Models\User
     */
    public function create(UserDto $dto): User
    {
        return DB::transaction(function () use ($dto) {
            $user = User::create([
                'name'       => $dto->name,
                'email' => $dto->email,
                'password' => '123456789'
            ]);

            return $user;
        });
    }

    /**
     * @param \App\Models\User $user
     * @param string $newPassword
     * @return \App\Models\User
     */
    public function password(User $user, string $newPassword): User
    {
        return DB::transaction(function () use ($user, $newPassword) {
            $user->update([
                'password'   => Hash::make($newPassword),
            ]);

            return $user;
        });
    }

    /**
     * @param \App\Models\User $user
     * @param \App\Dto\UserDto $dto
     * @return \App\Models\Skill
     */
    public function update(User $user, UserDto $dto): User
    {
        return DB::transaction(function () use ($user, $dto) {
            $newData = [
                'name'       => $dto->name,
                'email' => $dto->email,
            ];

            $user->fill($newData);

            if ($user->isDirty('email')) {
                $user->email_verified_at = null;
            }

            $user->save();

            return $user;
        });
    }

    /**
     * @param \App\Models\User $user
     * @return bool
     */
    public function delete(User $user): bool
    {
        return DB::transaction(fn() => $user->delete());
    }
}
