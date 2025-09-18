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
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<Candidacy, Candidate>
     */
    public function candidacies()
    {
        return $this->hasMany(Candidacy::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<User, Candidate>
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<Participant, Candidate>
     */
    public function participants()
    {
        return $this->hasMany(Participant::class);
    }
}
