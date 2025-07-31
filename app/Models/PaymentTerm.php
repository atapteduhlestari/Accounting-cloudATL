<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentTerm extends Model
{
    protected $fillable = [
        'name',
        'pay_within_days',
        'discount_percent',
        'due_days',
        'note'
    ];
}
