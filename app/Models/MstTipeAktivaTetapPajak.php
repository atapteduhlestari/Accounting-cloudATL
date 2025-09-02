<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MstTipeAktivaTetapPajak extends Model
{
    use HasFactory;

    protected $table = 'mst_tipe_aktiva_tetap_pajak';

    protected $fillable = [
        'nama',
        'metode_id',
        'estimasi_umur_pajak',
        'tarif_penyusutan_pajak',
    ];

    public function metode()
    {
        return $this->belongsTo(MetodePenyusutanPajak::class, 'metode_id');
    }
}
