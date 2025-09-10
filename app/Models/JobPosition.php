<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobPosition extends Model
{
    /** @use HasFactory<\Database\Factories\JobPositionFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'description',
    ];
}
