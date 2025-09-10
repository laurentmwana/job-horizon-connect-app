<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    /** @use HasFactory<\Database\Factories\OfferFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'image',
        'name',
        'bio',
        'description',
        'start_at',
        'end_at',
        'recruiter_id'
    ];

    protected $casts = [
        'start_at' => 'date',
        'end_at' => 'date',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Recruiter, Offer>
     */
    public function recruiter()
    {
        return $this->belongsTo(Recruiter::class);
    }
}
