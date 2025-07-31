<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerShipAddress extends Model
{
    protected $fillable = [
        'customer_id',
        'address1',
        'address2',
        'city',
        'province',
        'postal_code',
        'country',
        'is_default',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
