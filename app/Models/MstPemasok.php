<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MstPemasok extends Model
{
    use HasFactory;

    protected $table = 'mst_pemasok';

    protected $fillable = [
        'is_active',
        'no_pemasok',
        'nama',
        'alamat',
        'kota',
        'provinsi',
        'kode_pos',
        'negara',
        'telepon',
        'faksimili',
        'kontak',
        'email',
        'website',
        'termin_id',
        'currency_id',
        'saldo_awal',
        'saldo_awal_tanggal',
        'default_keterangan',
        'pajak_1_id',
        'pajak_2_id',
        'npwp',
        'tax_type_id',
        'pesan',
        'catatan',
    ];

    public function kontak_pemasok()
    {
        return $this->hasMany(MstPemasokKontak::class, 'pemasok_id');
    }

    public function termin()
    {
        return $this->belongsTo(PaymentTerm::class, 'termin_id');
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class, 'currency_id');
    }

    public function pajak1()
    {
        return $this->belongsTo(Tax::class, 'pajak_1_id');
    }

    public function pajak2()
    {
        return $this->belongsTo(Tax::class, 'pajak_2_id');
    }

    public function taxType()
    {
        return $this->belongsTo(TypeTax::class, 'tax_type_id');
    }
}
