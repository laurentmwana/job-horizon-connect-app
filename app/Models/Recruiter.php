<?php

namespace App\Models;

use App\Enums\GenderEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Recruiter extends Model
{
    /** @use HasFactory<\Database\Factories\RecruiterFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'firstname',
        'phone',
        'gender',
        'user_id'
    ];

    protected $casts = [
        'gender' => GenderEnum::class,
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<User, Recruiter>
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<Offer, Recruiter>
     */
    public function offers()
    {
        return $this->hasMany(Offer::class);
    }
}
