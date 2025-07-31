<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MstPemasokKontak extends Model
{
    use HasFactory;

    protected $table = 'mst_pemasok_kontak';

    protected $fillable = [
        'pemasok_id',
        'nama_depan',
        'nama_belakang',
        'jabatan',
        'bisnis1',
        'ext1',
        'bisnis2',
        'ext2',
        'seluler',
        'faksimili',
        'pager',
        'rumah',
        'email',
        'catatan'
    ];

    public function pemasok()
    {
        return $this->belongsTo(MstPemasok::class, 'pemasok_id');
    }
}
