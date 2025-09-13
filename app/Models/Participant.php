<?php

namespace App\Models;

use App\Enums\GenderEnum;
use App\Enums\ProfessionEnum;
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
    ];

    protected $casts = [
        'profession' => ProfessionEnum::class,
        'gender' => GenderEnum::class,
    ];
}
