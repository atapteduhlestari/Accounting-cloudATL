<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerContact extends Model
{
    protected $fillable = [
        'customer_id',
        'first_name',
        'last_name',
        'title',
        'business_phone1',
        'business_phone2',
        'mobile_phone',
        'pager',
        'email',
        'extension1',
        'extension2',
        'fax',
        'home_phone',
        'notes',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
