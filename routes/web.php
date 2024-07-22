<?php

use App\Http\Controllers\AssetMasterController;
use App\Http\Controllers\BopTransactionController;
use App\Http\Controllers\ControlPanelController;
use App\Http\Controllers\DepositController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UnitPaymentController;
use App\Http\Controllers\UnitSavingController;
use App\Models\AssetMaster;
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



// Route::prefix('aset')->name('aset.')->group(function () {
//     Route::controller(InventoryController::class)->group(function () {
//         Route::get('/', 'index')->name('index');
//         Route::get('/taxalert', 'taxalert')->name('taxalert');
//         Route::get('/create', 'create')->name('create');
//         Route::post('/', 'store')->name('store');
//         Route::put('/put/{inventory}', 'update')->name('update');
//         Route::get('/show/{inventory}', 'show')->name('show');
//         Route::put('/edit/{inventory}', 'edit')->name('edit');
//         Route::put('/mutating/{inventory}', 'mutating')->name('mutating');
//     });
// })->middleware('auth');


Route::middleware('auth')->group(function () {


    Route::controller(AssetMasterController::class)->group(function () {
        Route::prefix('asset')->name('asset.')->group(function () {
            Route::prefix('kendaraan')->name('kendaraan.')->group(function () {
                Route::get('/', 'index_kendaraan')->name('index');
                Route::post('/store', 'store_kendaraan')->name('store');
                Route::put('/updatekendaraan/{assetMaster}', 'update_kendaraan')->name('update');
                Route::get('/her', 'her_kendaraan')->name('her');
                Route::put('/her/{assetMaster}', 'herpayment_kendaraan')->name('herpayment');
            });
        });
    });

    Route::controller(UnitPaymentController::class)->group(function () {
        Route::prefix('goroumrah')->name('goroumrah.')->group(function () {
            Route::get('/', 'goro_index')->name('goro_index');
            Route::post('/goro_create', 'goro_create')->name('goro_create');
            Route::get('/requestWilayahTransaction', 'requestWilayahTransaction')->name('requestWilayahTransaction');
            Route::get('/requestUnitTransaction', 'requestUnitTransaction')->name('requestUnitTransaction');
            Route::get('/transaksi', 'goro_transaksi')->name('goro_transaksi');
            Route::get('/pinjaman', 'goro_pinjaman')->name('goro_pinjaman');
            Route::get('/requestPinjamanUnit', 'requestPinjamanUnit')->name('requestPinjamanUnit');
            Route::get('/do', 'goro_do')->name('goro_do');
            Route::get('/requestDoUnit', 'requestDoUnit')->name('requestDoUnit');
        });
    });

    Route::controller(ControlPanelController::class)->prefix('controlpanel')->name('controlpanel.')->group(function () {
        Route::get('/syncronize_sksw_with_employee', 'syncronize_sksw_with_employee')->name('syncronize_sksw_with_employee');
        Route::get('/daftar_unit', 'daftar_unit')->name('daftar_unit');
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
        Route::post('/create_mutasi', [UnitSavingController::class, 'store_mutation'])->name('store_mutasi');
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
        Route::get('/transaksi', [UnitSavingController::class, 'pinjaman_modal_transaksi'])->name('pinjaman_modal_transaksi');
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


    Route::controller(EmployeeController::class)->prefix('emp')->name('emp.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::get('/{employee}', 'show')->name('show');
        Route::put('/{employee}/update',  'update')->name('update');
        Route::put('/{employee}', 'perpindahan_karyawan')->name('perpindahan_karyawan');
        Route::put('/{employee}/resign', 'resign_karyawan')->name('resign_karyawan');
        Route::put('/{employee}/kembalimasuk', 'kembali_karyawan')->name('kembali_karyawan');
        Route::put('/{employee}/pengembalianjaminan', 'pengembalianjaminan')->name('pengembalianjaminan');
    });
});



require __DIR__ . '/auth.php';
