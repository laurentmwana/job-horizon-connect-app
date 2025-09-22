<?php

namespace App\Models;

use App\Enums\ActivityTypeEnum;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperActivity
 */
class Activity extends Model
{
    /** @use HasFactory<\Database\Factories\ActivityFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'image',
        'title',
        'description',
        'content',
        'start_at',
        'end_at',
        'type',
    ];

    protected $casts = [
        'start_at' => 'datetime',
        'end_at' => 'datetime',
        'type' =>  ActivityTypeEnum::class,
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<Participant, Activity>
     */
    public function participants()
    {
        return $this->hasMany(Participant::class);
    }
}
