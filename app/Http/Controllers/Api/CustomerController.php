<?php

namespace App\Http\Controllers\Api;

use App\Models\Customer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\CustomerRequest;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::with('currency')->paginate(20);
        return response()->json($customers);
    }

    public function show($id)
    {
        $customer = Customer::with([
            'contacts',
            'shipAddresses',
            'paymentTerm',
            'currency',
            'tax1',
            'tax2',
            'customerType'
        ])->findOrFail($id);

        $data = $customer->toArray();

        // Inject relasi-relasi agar tersedia di frontend
        $data['customerType'] = $customer->customerType;
        $data['paymentTerm'] = $customer->paymentTerm;
        $data['currency'] = $customer->currency;
        $data['tax1'] = $customer->tax1;
        $data['tax2'] = $customer->tax2;
        $data['contacts'] = $customer->contacts;
        $data['shipAddresses'] = $customer->shipAddresses;

        return response()->json($data);
    }



    public function store(CustomerRequest $request)
    {
        $validated = $request->validated();

        $customer = Customer::create($validated);

        if ($request->has('customer_contacts')) {
            foreach ($request->customer_contacts as $contact) {
                $customer->contacts()->create($contact);
            }
        }

        if ($request->has('ship_to_addresses')) {
            foreach ($request->ship_to_addresses as $address) {
                $customer->shipAddresses()->create($address);
            }
        }

        return response()->json($customer->load(['contacts', 'shipAddresses']), 201);
    }



    public function update(CustomerRequest $request, $id)
    {
        $customer = Customer::findOrFail($id);
        $customer->update($request->validated());

        // Handle kontak
        if ($request->has('customer_contacts')) {
            $customer->contacts()->delete();
            foreach ($request->customer_contacts as $contact) {
                $customer->contacts()->create($contact);
            }
        }

        // Handle alamat pengiriman
        if ($request->has('ship_to_addresses')) {
            $customer->shipAddresses()->delete();
            foreach ($request->ship_to_addresses as $shipto) {
                $customer->shipAddresses()->create($shipto);
            }
        }

        $customer->load(['contacts', 'shipAddresses', 'paymentTerm', 'currency', 'tax1', 'tax2', 'customerType']);

        return response()->json($customer);
    }

    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->forceDelete(); 
        return response()->json(null, 204);
    }
}
