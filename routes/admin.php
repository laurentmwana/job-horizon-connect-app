<?php

use App\Http\Controllers\Activity\AdminActivityController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

$MIDDLEWARE_ARRAY = ['auth', 'verified', 'admin'];

Route::middleware($MIDDLEWARE_ARRAY)->group(function () {
    // ADMIN
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');
    // END ADMIN
});

Route::middleware($MIDDLEWARE_ARRAY)
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::resource('activity', AdminActivityController::class)
            ->parameter('activity', 'id');
});