<?php

namespace App\Models;

use App\Enums\UserRoleEnum;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $with = ['candidate'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => UserRoleEnum::class,
        ];
    }

    /**
     * @return bool
     */
    public function isAdmin()
    {
        return $this->role === UserRoleEnum::ADMIN;
    }

    /**
     * @return bool
     */
    public function isAnonymous()
    {
        return $this->role === UserRoleEnum::ANONYMOUS;
    }

    /**
     * @return bool
     */
    public function isCandidate()
    {
        return  $this->candidate !== null;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne<Candidate, User>
     */
    public function candidate()
    {
        return $this->hasOne(Candidate::class);
    }

}
