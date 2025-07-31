<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Kategori;

class TipeAkun extends Model
{
    use HasFactory;

    protected $table = 'tipe_akun';

    protected $fillable = [
        'nama', 
        'kategori_id', 
        'kode',
        'is_currency_required',
        'is_opening_balance_required'
    ];

    public function kategori()
    {
        return $this->belongsTo(Kategori::class, 'kategori_id');
    }

    protected $casts = [
        'is_currency_required' => 'boolean',
        'is_opening_balance_required' => 'boolean',
    ];
    public function chartOfAccounts()
    {
        return $this->hasMany(ChartOfAccount::class);
    }
}
