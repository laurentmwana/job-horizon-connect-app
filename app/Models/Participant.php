<?php

namespace App\Models;

use App\Enums\GenderEnum;
use App\Enums\ProfessionEnum;
use App\Enums\ParticipatedStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Participant extends Model
{
    /** @use HasFactory<\Database\Factories\ParticipantFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'firstname',
        'email',
        'gender',
        'profession',
        'activity_id',
        'status'
    ];

    protected $casts = [
        'profession' => ProfessionEnum::class,
        'gender' => GenderEnum::class,
        'status' => ParticipatedStatusEnum::class
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Activity, Participant>
     */
    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }
}
