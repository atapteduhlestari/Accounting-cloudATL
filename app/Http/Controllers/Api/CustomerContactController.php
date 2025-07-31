<?php

namespace App\Http\Controllers\Api;

use App\Models\CustomerContact;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CustomerContactController extends Controller
{
    public function index()
    {
        return CustomerContact::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'first_name' => 'required|string|max:100',
            'last_name' => 'nullable|string|max:100',
            'title' => 'nullable|string|max:100',
            'business_phone1' => 'nullable|string|max:50',
            'business_phone2' => 'nullable|string|max:50',
            'mobile_phone' => 'nullable|string|max:50',
            'pager' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'extension1' => 'nullable|string|max:10',
            'extension2' => 'nullable|string|max:10',
            'fax' => 'nullable|string|max:50',
            'home_phone' => 'nullable|string|max:50',
            'notes' => 'nullable|string',
        ]);

        $contact = CustomerContact::create($validated);
        return response()->json($contact, 201);
    }

    public function show(CustomerContact $customerContact)
    {
        return $customerContact;
    }

    public function update(Request $request, CustomerContact $customerContact)
    {
        $customerContact->update($request->all());
        return response()->json($customerContact);
    }

    public function destroy(CustomerContact $customerContact)
    {
        $customerContact->delete();
        return response()->json(null, 204);
    }
}
