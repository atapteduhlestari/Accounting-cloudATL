<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    protected $fillable = 
    [
    'name', 
    'exchange_rate', 
    'country', 
    'symbol'
    ];

    protected $casts = [
        'exchange_rate' => 'decimal:4',
    ];

    public function chartOfAccounts()
    {
        return $this->hasMany(ChartOfAccount::class);
    }
}
