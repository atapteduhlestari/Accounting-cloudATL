<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MstTipeAktivaTetap extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'mst_tipe_aktiva_tetap';

    protected $fillable = [
        'nama',
        'tipe_pajak_id',
        'metode_penyusutan_pajak',
        'estimasi_umur_pajak',
        'tarif_penyusutan_pajak',
    ];

    public function tipePajak()
    {
        return $this->belongsTo(MstTipeAktivaTetapPajak::class, 'tipe_pajak_id');
    }

    
}
