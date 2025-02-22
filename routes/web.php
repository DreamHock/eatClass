<?php

use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\RestaurantController as AdminRestaurantController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DefaultDayController;
use App\Http\Controllers\DefaultServiceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\RestaurantController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::middleware('auth')->group(function () {});



Route::middleware(['auth', 'admin'])->group(function () {
  Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('admin.profile.destroy');
    Route::resource('/restaurants', AdminRestaurantController::class);
    Route::resource('categories', AdminCategoryController::class);
  });
  Route::resource('default-services', DefaultServiceController::class);
  Route::resource('default-days', DefaultDayController::class);
});

Route::resource('/restaurants', RestaurantController::class);


Route::post('/reservations', [ReservationController::class, 'store']);
Route::get('/', [CategoryController::class, 'categories']);

Route::get('/mail', function () {
  $createdReservation = session('createdReservation');
  return view('emails.reserveInformation', ['createdReservation' => $createdReservation]);
})->name('mail');

require __DIR__ . '/auth.php';
