<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tax extends Model
{
    protected $table = 'mst_tax';

    protected $fillable = [
        'nama',
        'nilai',
        'kode',
        'keterangan',
        'akun_pajak_penjualan',
        'akun_pajak_pembelian',
    ];

    public function akunPenjualan()
    {
        return $this->belongsTo(ChartOfAccount::class, 'akun_pajak_penjualan');
    }

    public function akunPembelian()
    {
        return $this->belongsTo(ChartOfAccount::class, 'akun_pajak_pembelian');
    }
}
