<?php

use App\Http\Controllers\BranchController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MantriAppController;
use App\Http\Controllers\PinjamanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\Employee;
use Illuminate\Foundation\Application;
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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('administrator')->name('administrator.')->group(function () {
        Route::prefix('branches')->name('branches.')->group(function () {
            Route::get('/', [BranchController::class, 'index'])->name('index');
            Route::post('/', [BranchController::class, 'store'])->name('store');
        });
        Route::prefix('user')->name('user.')->group(function () {
            Route::get('/', [UserController::class, 'index'])->name('index');
        });
    });


    Route::prefix('employee')->name('employee.')->group(function () {
        Route::get('/', [EmployeeController::class, 'index'])->name('index');
        Route::get('/exemployee', [EmployeeController::class, 'exemployee'])->name('exemployee');
        Route::get('create', [EmployeeController::class, 'create'])->name('create');
        Route::post('/', [EmployeeController::class, 'store'])->name('store');
        Route::put('/{employee}/update', [EmployeeController::class, 'update'])->name('update');
        Route::put('/{employee}/mutasi', [EmployeeController::class, 'mutasi'])->name('mutasi');
        Route::put('/{employee}/resign', [EmployeeController::class, 'resign'])->name('resign');
        Route::put('/{employee}/handover', [EmployeeController::class, 'handover'])->name('handover');
        Route::put('/{employee}/reactive', [EmployeeController::class, 'reactive'])->name('reactive');
    });

    Route::prefix('mantriapps')->name('mantriapps.')->group(function () {
        Route::get('/', [MantriAppController::class, 'index'])->name('index');
        Route::prefix('pinjaman')->name('pinjaman.')->group(function () {
            Route::get('/ceknik', [MantriAppController::class, 'ceknik'])->name('ceknik');
            Route::get('/request-drop', [MantriAppController::class, 'requestDrop'])->name('requestDrop');
            Route::post('/new-customer-drop', [MantriAppController::class, 'newCustomerDropStore'])->name('newCustomerDropStore');
            Route::post('/old-customer-drop', [MantriAppController::class, 'oldCustomerDropStore'])->name('oldCustomerDropStore');
        });
    });

    Route::prefix('cabang-utama')->name('cabangutama.')->group(function () {
        Route::prefix('/customer')->name('customer.')->group(function () {
            Route::get('/', [CustomerController::class, 'index'])->name('index');
        });
    });

    Route::prefix('unit')->name('unit.')->group(function () {
        Route::prefix('/customer')->name('customer.')->group(function () {
            Route::get('/', [CustomerController::class, 'index'])->name('index');
            Route::post('/', [CustomerController::class, 'store'])->name('store');
        });
        Route::prefix('request-loan')->name('requestloan.')->group(function () {
            Route::get('/', [PinjamanController::class, 'requestLoan'])->name('index');
        });
    });
});



require __DIR__ . '/auth.php';
