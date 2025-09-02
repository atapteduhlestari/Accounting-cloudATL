<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\TaxController;
use App\Http\Controllers\Api\TypeTaxController;
use App\Http\Controllers\Api\CurrencyController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\TipeAkunController;
use App\Http\Controllers\Api\MstPemasokController;
use App\Http\Controllers\Api\PaymentTermController;
use App\Http\Controllers\Api\CustomerTypeController;
use App\Http\Controllers\Api\ChartOfAccountController;
use App\Http\Controllers\Api\CustomerContactController;
use App\Http\Controllers\Api\MstPemasokKontakController;
use App\Http\Controllers\Api\CustomerShipAddressController;
use App\Http\Controllers\Api\BarangJasaController;
use App\Http\Controllers\Api\KategoriBarangController;
use App\Http\Controllers\Api\MstProjectController;
use App\Http\Controllers\Api\MstDepartmentController;
use App\Http\Controllers\Api\MetodePenyusutanPajakController;
use App\Http\Controllers\Api\MstTipeAktivaTetapPajakController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('chart-of-accounts', App\Http\Controllers\Api\ChartOfAccountController::class);
    Route::apiResource('customers', CustomerController::class);
    Route::apiResource('customer-contacts', CustomerContactController::class);
    Route::apiResource('customer-ship-addresses', CustomerShipAddressController::class);
    Route::apiResource('pemasok', MstPemasokController::class);
    Route::apiResource('pemasok-kontak', MstPemasokKontakController::class);
    Route::apiResource('barang-jasa', BarangJasaController::class);
    Route::apiResource('projects', MstProjectController::class);
    Route::apiResource('mst-department', MstDepartmentController::class);
    Route::apiResource('metode-penyusutan-pajak', MetodePenyusutanPajakController::class);
    Route::apiResource('tipe-aktiva-tetap-pajak', MstTipeAktivaTetapPajakController::class);
    Route::get('/payment_terms', [PaymentTermController::class, 'index']);
    Route::get('/currencies', [CurrencyController::class, 'index']);
    Route::get('/mst_tax', [TaxController::class, 'index']);
    Route::get('/customer_types', [CustomerTypeController::class, 'index']);
    Route::get('/type_taxes', [TypeTaxController::class, 'index']);
    Route::get('chart-of-accounts-barang', [BarangJasaController::class, 'chartOfAccounts']);
    Route::get('kategori-barang', [KategoriBarangController::class, 'index']);
    Route::get('mst_metode_penyusutan_pajak', [MetodePenyusutanPajakController::class, 'index']);
    Route::get('tipe-akun/{id}', [App\Http\Controllers\Api\ChartOfAccountController::class, 'getTipeAkunDetails']);
});

    

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('currencies', App\Http\Controllers\Api\CurrencyController::class);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('kategoris', App\Http\Controllers\Api\KategoriController::class);
    // Route::get('/chart-of-accounts/account-types', [ChartOfAccountController::class, 'getAccountTypes']);
    Route::apiResource('customer-types', CustomerTypeController::class);
    Route::apiResource('payment-terms', PaymentTermController::class);
    Route::apiResource('tipe-akun', TipeAkunController::class);
    Route::apiResource('taxes', TaxController::class);
    Route::get('coa', [TaxController::class, 'coaList']);
    Route::apiResource('type-tax', TypeTaxController::class);
});

