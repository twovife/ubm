<?php

use App\Http\Controllers\BranchController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DepositController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\InstalmentController;
use App\Http\Controllers\MantriAppController;
use App\Http\Controllers\OptionalDepositController;
use App\Http\Controllers\PinjamanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
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
        'isMantri' => auth()->user() ? auth()->user()->hasPermissionTo('area') : false,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/dashboard', function () {
    if (auth()->user()->hasPermissionTo('area')) {
        return redirect()->route('mantriapps.index');
    }
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route::get('/testdump', [PinjamanController::class, 'testdump']);




Route::middleware('auth')->group(function () {

    Route::prefix('simpanan')->name('simpanan.')->group(function () {
        Route::get('/', [DepositController::class, 'index'])->name('index');
        Route::get('/create', [DepositController::class, 'create'])->name('create');
        Route::post('/', [DepositController::class, 'store'])->name('store');
        Route::get('/transaksi/{deposit}', [DepositController::class, 'transaksi'])->name('transaksi');
        Route::put('/transaksi/{deposit}', [DepositController::class, 'addtransaksi'])->name('addtransaksi');

        Route::get('/global', [DepositController::class, 'global'])->name('global');
        Route::get('/detailPerBulan', [DepositController::class, 'detailPerBulan'])->name('detailPerBulan');
        Route::get('/globalPerBulan', [DepositController::class, 'globalPerBulan'])->name('globalPerBulan');
        Route::get('/sumallsk', [DepositController::class, 'sumallsk'])->name('sumallsk');
        Route::get('/sumallsw', [DepositController::class, 'sumallsw'])->name('sumallsw');
        Route::get('/swperbulan', [DepositController::class, 'sw_perbulan'])->name('sw_perbulan');
        Route::get('/swglobal', [DepositController::class, 'sw_global'])->name('sw_global');
    });


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


    Route::prefix('employee')->name('employee.')->middleware(['auth', 'verified', 'permission:unit|pusat'])->group(function () {
        Route::get('/', [EmployeeController::class, 'index'])->name('index');
        Route::get('/exemployee', [EmployeeController::class, 'exemployee'])->name('exemployee');
        Route::get('/create', [EmployeeController::class, 'create'])->name('create');
        Route::get('/action/{employee}', [EmployeeController::class, 'action'])->name('action');
        Route::post('/', [EmployeeController::class, 'store'])->name('store');
        Route::put('/{employee}/update', [EmployeeController::class, 'update'])->name('update');
        Route::put('/{employee}/mutasi', [EmployeeController::class, 'mutasi'])->name('mutasi');
        Route::put('/{employee}/resign', [EmployeeController::class, 'resign'])->name('resign');
        Route::put('/{employee}/handover', [EmployeeController::class, 'handover'])->name('handover');
        Route::put('/{employee}/reactive', [EmployeeController::class, 'reactive'])->name('reactive');
        Route::delete('/{employee}', [EmployeeController::class, 'destroy'])->name('destroy');
    });

    Route::controller(MantriAppController::class)->prefix('mantriapps')->name('mantriapps.')->middleware('can:area')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::prefix('pinjaman')->name('pinjaman.')->group(function () {
            Route::get('/request-drop', 'requestDrop')->name('requestDrop');
            Route::post('/', 'store')->name('store');
            Route::post('/new-customer-drop', 'newCustomerDropStore')->name('newCustomerDropStore');
            Route::post('/old-customer-drop', 'oldCustomerDropStore')->name('oldCustomerDropStore');
        });
        Route::prefix('drop')->name('drop.')->group((function () {
            Route::get('/drop', 'mantriDrop')->name('mantriDrop');
            Route::get('/calondrop', 'calonDrop')->name('calonDrop');
            Route::put('/drop/{loanRequest}', 'storeMantriDrop')->name('storeMantriDrop');
            Route::get('/{loan}', 'detaildrop')->name('detaildrop');
        }));
        Route::prefix('angsur')->name('angsur.')->group((function () {
            Route::get('/storting', 'storting')->name('storting');
            // Route::get('/{nik}', 'angsur')->name('angsur');
            Route::get('/update/{loan}', 'updateAngsur')->name('updateangsur');
        }));
    });


    // routing untuk aplikasi unit
    Route::prefix('unit')->middleware(['auth', 'verified'])->name('unit.')->group(function () {
        Route::controller(CustomerController::class)->prefix('/customer')->name('customer.')->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/',  'store')->name('store');
            Route::get('/historykknasabah/{no_kk}',  'historyNasabahByKK')->name('historyNasabahByKK');
            Route::get('/edit/{customer}',  'edit')->name('edit');
            Route::put('/edit/{customer}',  'update')->name('update');
        });
        Route::prefix('pinjaman')->name('pinjaman.')->group(function () {
            Route::get('/', [PinjamanController::class, 'pinjaman'])->name('index');
            Route::get('/create', [PinjamanController::class, 'create'])->name('create');
            Route::post('/', [PinjamanController::class, 'store'])->name('store');
            Route::put('/notes/{loan}', [PinjamanController::class, 'editNotes'])->name('editNotes');

            Route::prefix('request')->name('request.')->group(function () {
                Route::get('/', [PinjamanController::class, 'requestPinjaman'])->name('requestPinjaman');
                Route::get('/buku-transaksi', [PinjamanController::class, 'bukutransaksi'])->name('bukutransaksi');
                Route::post('/{loanRequest}', [PinjamanController::class, 'actions'])->name('actions');
                Route::get('/edit/{loanRequest}', [PinjamanController::class, 'edit'])->name('edit');
                Route::put('/update/{loanRequest}', [PinjamanController::class, 'update'])->name('update');
                Route::delete('/{loanRequest}', [PinjamanController::class, 'destroy'])->name('destroy');
            });
            Route::prefix('angsuran')->name('angsuran.')->group(function () {
                Route::get('/', [InstalmentController::class, 'index'])->name('index');
                Route::get('/mb', [InstalmentController::class, 'indexMb'])->name('indexmb');
                Route::get('/ml', [InstalmentController::class, 'indexMl'])->name('indexml');
                Route::put('/{loan}', [InstalmentController::class, 'bayar'])->name('bayar');
            });
        });
    });
});



require __DIR__ . '/auth.php';
