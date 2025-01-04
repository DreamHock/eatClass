<?php

use App\Http\Admin\Controllers\RestaurantController as AdminRestaurantController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DefaultDayController;
use App\Http\Controllers\DefaultServiceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\RestaurantController;
// use App\Http\Controllers\RestaurantController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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


Route::middleware('auth')->group(function () {
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



Route::middleware(['auth', 'admin'])->group(function () {
  Route::group(['prefix' => 'admin'], function () {
    Route::resource('/restaurants', AdminRestaurantController::class)->names([
      'index' => 'admin.restaurants.index',
      'create' => 'admin.restaurants.create',
      'store' => 'admin.restaurants.store',
      'show' => 'admin.restaurants.show',
      'edit' => 'admin.restaurants.edit',
      'update' => 'admin.restaurants.update',
      'destroy' => 'admin.restaurants.destroy',
    ]);
    Route::resource('default-services', DefaultServiceController::class);
    Route::resource('default-days', DefaultDayController::class);
  });
});

Route::resource('/restaurants', RestaurantController::class);


Route::post('/reservations', [ReservationController::class, 'store']);
Route::get('/', [CategoryController::class, 'categories']);

Route::get('/mail', function () {
  $createdReservation = session('createdReservation');
  return view('emails.reserveInformation', ['createdReservation' => $createdReservation]);
})->name('mail');

require __DIR__ . '/auth.php';
