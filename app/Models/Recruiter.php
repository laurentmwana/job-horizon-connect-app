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
    ];

    protected $casts = [
        'gender' => GenderEnum::class,
    ];
}
