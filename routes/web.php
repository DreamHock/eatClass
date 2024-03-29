<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DefaultDayController;
use App\Http\Controllers\DefaultServiceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\RestaurantController;
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

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



Route::middleware(['auth', 'admin'])->group(function () {
  Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', ['user' => Auth::user()]);
  })->name('dashboard');
  Route::resource('defaultServices', DefaultServiceController::class);
  Route::resource('defaultDays', DefaultDayController::class);
});

Route::post('/reservations', [ReservationController::class, 'store']);
Route::get('/', [CategoryController::class, 'categories']);
Route::resource('restaurants', RestaurantController::class);

Route::get('/mail', function () {
  $createdReservation = session('createdReservation');
  return view('emails.reserveInformation', ['createdReservation' => $createdReservation]);
})->name('mail');

require __DIR__ . '/auth.php';
