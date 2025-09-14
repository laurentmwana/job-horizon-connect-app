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


// PAGE
Route::get('/about', [\App\Http\Controllers\PageController::class, 'about'])
    ->name('page.about');
// END PAGE
