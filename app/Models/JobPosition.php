<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperJobPosition
 */
class JobPosition extends Model
{
    /** @use HasFactory<\Database\Factories\JobPositionFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'description',
    ];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany<Offer, JobPosition, \Illuminate\Database\Eloquent\Relations\Pivot>
     */
    public function offers()
    {
        return $this->belongsToMany(Offer::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<Skill, JobPosition>
     */
    public function skills()
    {
        return $this->hasMany(Skill::class);
    }
}
