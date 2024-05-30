<?php

use App\Http\Controllers\BonPrivateController;
use App\Http\Controllers\BopTransactionController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DepositController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InstalmentController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\MantriAppController;
use App\Http\Controllers\OperationalBookController;
use App\Http\Controllers\OptionalDepositController;
use App\Http\Controllers\PinjamanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UnitSavingController;
use App\Http\Controllers\UserController;
use App\Models\BopTransaction;
use App\Models\Deposit;
use App\Models\Inventory;
use App\Models\OneMilDeposit;
use App\Models\UnitSaving;
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


Route::get('/testdump', [HomeController::class, 'testdump']);



Route::prefix('aset')->name('aset.')->group(function () {
    Route::controller(InventoryController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/taxalert', 'taxalert')->name('taxalert');
        Route::get('/create', 'create')->name('create');
        Route::post('/', 'store')->name('store');
        Route::put('/put/{inventory}', 'update')->name('update');
        Route::get('/show/{inventory}', 'show')->name('show');
        Route::put('/edit/{inventory}', 'edit')->name('edit');
        Route::put('/mutating/{inventory}', 'mutating')->name('mutating');
    });
})->middleware('auth');


Route::middleware('auth')->group(function () {




    Route::prefix('controlpanel')->name('controlpanel.')->group(function () {
        Route::controller(BranchController::class)->prefix('unit')->name('unit.')->group(function () {
            Route::get('/', 'index')->name('index');
        });
    });

    Route::controller(DepositController::class)->prefix('sksw')->name('sksw.')->group(function () {
        Route::get('/',  'dashboard')->name('dashboard');
        Route::get('/sksw_non_active',  'sksw_non_active')->name('dashboard_nonaktif');
        Route::post('/',  'store')->name('store');
        Route::get('/transaksi/{deposit}',  'transaksi')->name('transaksi'); //detail transaksi
        Route::put('/transaksi/{deposit}',  'addtransaksi')->name('addtransaksi'); //adding transaksi
        Route::get('/global',  'sksw_global')->name('global');
        Route::get('/wilayah',  'sksw_wilayah')->name('wilayah');
        Route::get('/unit',  'sksw_unit')->name('unit');
    });

    Route::prefix('unitsaving')->name('unitsaving.')->group(function () {

        Route::get('/dashboard', [UnitSavingController::class, 'dashboard'])->name('dashboard');
        Route::get('/', [UnitSavingController::class, 'index'])->name('index');
        Route::get('/create/{branch}', [UnitSavingController::class, 'create'])->name('create');
        Route::get('/savingdetails/{unitSavingAccount}', [UnitSavingController::class, 'savingdetails'])->name('savingdetails');
        Route::post('/savingdetails/{unitSavingAccount}', [UnitSavingController::class, 'savingdetailspost'])->name('savingdetailspost');
        Route::post('/store', [UnitSavingController::class, 'store'])->name('store');

        Route::get('/create_mutasi', [UnitSavingController::class, 'create_mutation'])->name('create_mutasi');
        Route::post('/', [UnitSavingController::class, 'store_mutation'])->name('store_mutasi');
    });
    Route::prefix('bonpanjer')->name('bonpanjer.')->group(function () {
        Route::get('/', [UnitSavingController::class, 'bon_panjer'])->name('bon_panjer');
        Route::get('/lunas', [UnitSavingController::class, 'bon_panjer_lunas'])->name('bon_panjer_lunas');
        Route::get('/create', [UnitSavingController::class, 'bon_panjer_create'])->name('bon_panjer_create');
        Route::post('/', [UnitSavingController::class, 'bon_panjer_store'])->name('bon_panjer_store');
        Route::get('/bon_panjer_show/{unitSavingAccount}', [UnitSavingController::class, 'bon_panjer_show'])->name('bon_panjer_show');
        Route::post('/bon_panjer_post/{unitSavingAccount}', [UnitSavingController::class, 'bon_panjer_post'])->name('bon_panjer_post');
        // Route::get('/create/{branch}', [UnitSavingController::class, 'create'])->name('create');
        // Route::post('/store', [UnitSavingController::class, 'store'])->name('store');
    });
    Route::prefix('pinjamanmodal')->name('pinjamanmodal.')->group(function () {
        Route::get('/', [UnitSavingController::class, 'pinjaman_modal'])->name('pinjaman_modal');
        Route::get('/create', [UnitSavingController::class, 'pinjaman_modal_create'])->name('pinjaman_modal_create');
        Route::post('/', [UnitSavingController::class, 'pinjaman_modal_store'])->name('pinjaman_modal_store');
        Route::get('/pinjaman_modal_show/{unitSavingAccount}', [UnitSavingController::class, 'pinjaman_modal_show'])->name('pinjaman_modal_show');
        Route::post('/pinjaman_modal_post/{unitSavingAccount}', [UnitSavingController::class, 'pinjaman_modal_post'])->name('pinjaman_modal_post');
        Route::put('/pinjaman_modal_mutasi/{unitSavingAccount}', [UnitSavingController::class, 'pinjaman_modal_mutasi'])->name('pinjaman_modal_mutasi');
        // Route::get('/create/{branch}', [UnitSavingController::class, 'create'])->name('create');
        // Route::post('/store', [UnitSavingController::class, 'store'])->name('store');
    });

    Route::controller(BopTransactionController::class)->group(function () {
        Route::prefix('bonpriv')->name('bonpriv.')->group(function () {
            Route::get('/', 'index_bonpriv')->name('index');
            Route::get('/lunas', 'index_bonpriv_lunas')->name('indexlunas');
            Route::get('/create', 'create_bonpriv')->name('create');
            Route::post('/', 'store_bonpriv')->name('store');
            Route::get('/{bopAccountTransaction}', 'show_bonpriv')->name('show');
            Route::post('/{bopAccountTransaction}', 'update_bonpriv')->name('update');
        });
        Route::prefix('bop')->name('bop.')->group(function () {
            Route::get('/', 'index_bop')->name('index');
            Route::get('/create/{branch}', 'create_bop')->name('create');
            Route::post('/', 'store_bop')->name('store');
            Route::get('/{bopAccountTransaction}', 'show_bop')->name('show');
            Route::post('/{bopAccountTransaction}', 'update_bop')->name('update');
        });
        Route::prefix('mutation')->name('mutation.')->group(function () {
            Route::get('/', 'index_mutation')->name('index');
            Route::get('/create', 'create_mutation')->name('create');
            Route::post('/', 'store_mutation')->name('store');
        });
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

    Route::controller(EmployeeController::class)->prefix('emp')->name('emp.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/{employee}', 'show')->name('show');
        Route::put('/{employee}', 'perpindahan_karyawan')->name('perpindahan_karyawan');
        Route::put('/{employee}/resign', 'resign_karyawan')->name('resign_karyawan');
        Route::put('/{employee}/kembalimasuk', 'kembali_karyawan')->name('kembali_karyawan');
        Route::put('/{employee}/pengembalianjaminan', 'pengembalianjaminan')->name('pengembalianjaminan');
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
});



require __DIR__ . '/auth.php';
