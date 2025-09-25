<?php

namespace App\Repositories;

use App\Enums\UserRoleEnum;
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
     * @param int $perPage
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function findPaginatedAndFiltered(int $perPage = 10)
    {
        $builder = $this->getBaseQuery();
        return $builder->orderByDesc('updated_at')
            ->paginate($perPage);
    }

    /**
     * @param string $id
     * @param bool $withRelation
     * @return User
     */
    public function findById(string $id, bool $withRelation = false)
    {
        $builder = $this->getBaseQuery();
        return $withRelation
            ? $builder->with(['candidate'])->findOrFail($id)
            : $builder->findOrFail($id);
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

    /**
     * @return \Illuminate\Database\Eloquent\Builder<User>
     */
    private function getBaseQuery()
    {
        return User::query()
            ->where('role', '!=', UserRoleEnum::ADMIN->value);
    }
}
