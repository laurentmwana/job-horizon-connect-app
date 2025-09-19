<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperSkill
 */
class Skill extends Model
{
    /** @use HasFactory<\Database\Factories\SkillFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'description',
        'job_position_id'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<JobPosition, Skill>
     */
    public function jobPosition()
    {
        return $this->belongsTo(JobPosition::class);
    }
}
