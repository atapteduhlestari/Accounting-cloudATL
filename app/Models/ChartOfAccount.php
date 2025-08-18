<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChartOfAccount extends Model
{
    use HasFactory;
    
    protected $table = 'chart_of_accounts';

    protected $fillable = [
        'nama',
        'tipe_akun_id',
        'nomor_akun',
        'sub_account_of',
        'saldo_awal',
        'currency_id',
        'kalender',
    ];

    public function tipeAkun()
    {
        return $this->belongsTo(TipeAkun::class);
    }

    public function parentAccount()
    {
        return $this->belongsTo(ChartOfAccount::class, 'sub_account_of');
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }
}
