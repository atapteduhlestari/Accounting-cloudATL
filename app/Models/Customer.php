<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'customer_number',
        'is_active',
        'name',
        'address',
        'city',
        'province',
        'postal_code',
        'country',
        'phone',
        'fax',
        'contact_person',
        'email',
        'website',
        'payment_term_id',
        'credit_limit',
        'max_invoice_amount',
        'currency_id',
        'opening_balance',
        'balance_date',
        'payment_message',
        'tax1_id',
        'tax2_id',
        'tax_number',
        'tax_code',
        'tax_address1',
        'tax_address2',
        'customer_type_id',
        'price_level',
        'default_sales_discount',
        'notes'
    ];

    public function contacts()
    {
        return $this->hasMany(CustomerContact::class);
    }

    public function shipAddresses()
    {
        return $this->hasMany(CustomerShipAddress::class);
    }

    public function paymentTerm()
    {
        return $this->belongsTo(PaymentTerm::class);
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class, 'currency_id', 'id');
    }


    public function tax1()
    {
        return $this->belongsTo(Tax::class, 'tax1_id');
    }

    public function tax2()
    {
        return $this->belongsTo(Tax::class, 'tax2_id');
    }

    public function customerType()
    {
        return $this->belongsTo(CustomerType::class, 'customer_type_id');
    }
}
