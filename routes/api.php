<?php

use App\Http\Controllers\Api\ApiDataController;
use App\Http\Controllers\Api\BaseApiController;
use Illuminate\Support\Facades\Route;

Route::prefix('enum')->group(function () {
    Route::get('genders', [BaseApiController::class, 'gender']);
    Route::get('activity-types', [BaseApiController::class, 'activityTypes']);
});

Route::prefix('data')->group(function () {
    Route::get('job-positions', [ApiDataController::class, 'jobPositions']);
});

