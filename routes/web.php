<?php

use Illuminate\Support\Facades\Route;

Route::get('/', \App\Http\Controllers\WelcomeController::class)->name('home');

// OFFER
Route::get('/offers', [\App\Http\Controllers\Offer\OfferController::class, 'index'])
    ->name('offer.index');
Route::get('/offer/{id}', [\App\Http\Controllers\Offer\OfferController::class, 'show'])
    ->name('offer.show');
// END OFFER

// ACTIVITY
Route::get('/activities', [\App\Http\Controllers\Activity\ActivityController::class, 'index'])
    ->name('activity.index');
Route::get('/activity/{id}', [\App\Http\Controllers\Activity\ActivityController::class, 'show'])
    ->name('activity.show');
// END ACTIVITY


// CONTACT
Route::get('/contact', [\App\Http\Controllers\ContactController::class, 'index'])
    ->name('contact.index');
Route::post('/contact/send-message', [\App\Http\Controllers\ContactController::class, 'sendMessage'])
    ->name('contact.send');
// END CONTACT

// PROFILE
Route::get('/profile', [\App\Http\Controllers\User\ProfileController::class, 'index'])
    ->name('profile.index');
Route::put('/profile/edit', [\App\Http\Controllers\User\ProfileController::class, 'edit'])
    ->name('profile.edit');
Route::put('/profile/password', [\App\Http\Controllers\User\ProfileController::class, 'password'])
    ->name('profile.password');
Route::delete('/profile/destroy', [\App\Http\Controllers\User\ProfileController::class, 'destroy'])
    ->name('profile.destroy');
// END PROFILE


// PAGE
Route::get('/about', [\App\Http\Controllers\PageController::class, 'about'])
    ->name('page.about');
// END PAGE



require 'auth.php';
require 'admin.php';
