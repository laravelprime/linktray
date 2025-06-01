<?php

use App\Http\Controllers\LinkController;
use App\Http\Controllers\LinkListController;
use App\Http\Controllers\Public\LinkListController as PublicLinkListController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('public/welcome');
})->name('home');

Route::get('/public/link-lists/{linkList}', [PublicLinkListController::class, 'index'])
    ->name('public.link-lists.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return to_route('link-lists.index');
    })->name('dashboard');
});

Route::resource('links', LinkController::class)
    ->only('store', 'update', 'destroy')
    ->middleware('auth');

Route::resource('link-lists', LinkListController::class)
    ->only('show', 'index', 'store', 'update', 'destroy')
    ->middleware('auth');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
