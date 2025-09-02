<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MetodePenyusutanPajak extends Model
{
    use HasFactory;

    protected $table = 'mst_metode_penyusutan_pajak';

    protected $fillable = [
        'nama',
    ];
}
