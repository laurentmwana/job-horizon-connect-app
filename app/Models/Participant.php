<?php

namespace App\Models;

use App\Enums\GenderEnum;
use App\Enums\ProfessionEnum;
use App\Enums\ParticipatedStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @mixin IdeHelperParticipant
 */
class Participant extends Model
{
    /** @use HasFactory<\Database\Factories\ParticipantFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'activity_id',
        'candidate_id',
        'status',
        'participant_at',
    ];

    protected $casts = [
        'status' => ParticipatedStatusEnum::class,
        'participant_at' => 'datetime',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Activity, Participant>
     */
    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Candidate, Participant>
     */
    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }
}
