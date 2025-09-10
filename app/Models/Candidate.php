<?php

namespace App\Models;

use App\Enums\GenderEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Candidate extends Model
{
    /** @use HasFactory<\Database\Factories\CandidateFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'firstname',
        'phone',
        'gender',
        'user_id',
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
}
