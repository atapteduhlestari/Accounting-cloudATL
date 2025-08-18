<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MstBarangJasa extends Model
{
    use HasFactory;
    protected $table = 'mst_barang_jasa';

    protected $fillable = [
        'tipe_item', 'non_aktif', 'no_item', 'keterangan',
        'saldo_awal_kuantitas', 'saldo_awal_harga_per_unit', 'saldo_awal_harga_pokok',
        'saldo_saat_ini_kuantitas', 'saldo_saat_ini_harga_per_unit', 'saldo_saat_ini_harga_pokok',
        'kategori_id', 'per_tanggal', 'unit',
        'harga_jual', 'diskon_penjualan', 'kode_pajak_penjualan',
        'default_unit', 'diskon_pembelian', 'kode_pajak_pembelian',
        'pemasok_utama_id', 'min_jumlah_reorder',
    ];

    public function kategori()
    {
        return $this->belongsTo(KategoriBarang::class, 'kategori_id');
    }

    public function pemasokUtama()
    {
        return $this->belongsTo(MstPemasok::class, 'pemasok_utama_id');
    }

    public function akun()
    {
        return $this->hasOne(BarangAkun::class, 'barang_jasa_id');
    }
}
