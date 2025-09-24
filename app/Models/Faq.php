<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    /** @use HasFactory<\Database\Factories\FaqFactory> */
    use HasFactory, HasUuids;

    protected $fillable = ['question', 'answer', 'is_star'];

    protected $casts = [
        'is_star' => 'boolean'
    ];
}
