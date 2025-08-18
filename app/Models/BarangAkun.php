<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BarangAkun extends Model
{
    use HasFactory;

    protected $table = 'barang_akun';

    protected $fillable = [
        'barang_jasa_id',
        'akun_persediaan_id',
        'akun_penjualan_id',
        'akun_return_penjualan_id',
        'akun_diskon_penjualan_id',
        'akun_hpp_id',
        'akun_return_pembelian_id',
        'akun_belum_tertagih_id',
        'akun_inventory_controller_id',
        'akun_beban_id',
    ];

    public function barangJasa()
    {
        return $this->belongsTo(MstBarangJasa::class, 'barang_jasa_id');
    }

    public function akunPersediaan()
    {
        return $this->belongsTo(ChartOfAccount::class, 'akun_persediaan_id');
    }

    public function akunPenjualan()
    {
        return $this->belongsTo(ChartOfAccount::class, 'akun_penjualan_id');
    }

    public function akunReturnPenjualan()
    {
        return $this->belongsTo(ChartOfAccount::class, 'akun_return_penjualan_id');
    }

    public function akunDiskonPenjualan()
    {
        return $this->belongsTo(ChartOfAccount::class, 'akun_diskon_penjualan_id');
    }

    public function akunHpp()
    {
        return $this->belongsTo(ChartOfAccount::class, 'akun_hpp_id');
    }

    public function akunReturnPembelian()
    {
        return $this->belongsTo(ChartOfAccount::class, 'akun_return_pembelian_id');
    }

    public function akunBelumTertagih()
    {
        return $this->belongsTo(ChartOfAccount::class, 'akun_belum_tertagih_id');
    }

    public function akunInventoryController()
    {
        return $this->belongsTo(ChartOfAccount::class, 'akun_inventory_controller_id');
    }

    public function akunBeban()
    {
        return $this->belongsTo(ChartOfAccount::class, 'akun_beban_id');
    }
}
