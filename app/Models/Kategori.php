<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TipeAkun;

class Kategori extends Model
{
    use HasFactory;
    protected $table = 'kategoris';
    protected $fillable = ['nama', 'kode'];

    public function tipeAkuns()
    {
        return $this->hasMany(TipeAkun::class, 'kategori_id');
    }
}
