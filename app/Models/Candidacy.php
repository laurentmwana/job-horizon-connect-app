<?php

namespace App\Models;

use App\Enums\CandidacyStatusEnum;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidacy extends Model
{
    /** @use HasFactory<\Database\Factories\CandidacyFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'offer_id',
        'candidate_id',
        'status',
        'cv_path',
    ];

    protected $casts = [
        'status' => CandidacyStatusEnum::class,
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Candidate, Candidacy>
     */
    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Offer, Candidacy>
     */
    public function offer()
    {
        return $this->belongsTo(Offer::class);
    }
}
