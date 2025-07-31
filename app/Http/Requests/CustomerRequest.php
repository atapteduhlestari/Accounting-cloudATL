<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class CustomerRequest extends FormRequest
{
    public function authorize()
    {
        return true; 
    }

    public function rules()
    {
        return [
            'customer_number' => [
                'required',
                'string',
                'max:50',
                Rule::unique('customers', 'customer_number')->ignore($this->customer),
            ],
            'is_active' => 'boolean',
            'name' => 'required|string|max:255',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'province' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
            'phone' => 'nullable|string|max:50',
            'fax' => 'nullable|string|max:50',
            'contact_person' => 'nullable|string|max:100',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|string|max:255',

            'payment_term_id' => 'nullable|exists:payment_terms,id',
            'currency_id' => 'nullable|exists:currencies,id',
            'tax1_id' => 'nullable|exists:mst_tax,id',
            'tax2_id' => 'nullable|exists:mst_tax,id',
            'customer_type_id' => 'nullable|exists:customer_types,id',

            'credit_limit' => 'nullable|numeric',
            'max_invoice_amount' => 'required|numeric',
            'opening_balance' => 'nullable|numeric',
            'balance_date' => 'nullable|date',
            'default_sales_discount' => 'nullable|numeric|min:0|max:100',

            'payment_message' => 'nullable|string',
            'tax_number' => 'nullable|string|max:50',
            'tax_code' => 'nullable|string|max:50',
            'tax_address1' => 'nullable|string|max:255',
            'tax_address2' => 'nullable|string|max:255',

            'price_level' => 'nullable|integer|min:1|max:10',
            'notes' => 'nullable|string',

            'contacts' => 'nullable|array',
            'contacts.*.first_name' => 'required|string|max:100',
            'contacts.*.last_name' => 'nullable|string|max:100',
            'contacts.*.title' => 'nullable|string|max:100',
            'contacts.*.business_phone1' => 'nullable|string|max:50',
            'contacts.*.business_phone2' => 'nullable|string|max:50',
            'contacts.*.mobile_phone' => 'nullable|string|max:50',
            'contacts.*.pager' => 'nullable|string|max:50',
            'contacts.*.email' => 'nullable|email|max:255',
            'contacts.*.extension1' => 'nullable|string|max:10',
            'contacts.*.extension2' => 'nullable|string|max:10',
            'contacts.*.fax' => 'nullable|string|max:50',
            'contacts.*.home_phone' => 'nullable|string|max:50',
            'contacts.*.notes' => 'nullable|string',

            'ship_to_addresses' => 'nullable|array',
            'ship_to_addresses.*.address1' => 'required|string|max:255',
            'ship_to_addresses.*.address2' => 'nullable|string|max:255',
            'ship_to_addresses.*.city' => 'nullable|string|max:100',
            'ship_to_addresses.*.province' => 'nullable|string|max:100',
            'ship_to_addresses.*.postal_code' => 'nullable|string|max:20',
            'ship_to_addresses.*.country' => 'nullable|string|max:100',
        ];
    }
}
