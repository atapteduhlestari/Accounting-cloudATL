<?php

namespace App\Http\Controllers\Api;

use App\Models\CustomerShipAddress;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CustomerShipAddressController extends Controller
{
    public function index()
    {
        return CustomerShipAddress::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'address1' => 'required|string|max:255',
            'address2' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'province' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
            'is_default' => 'nullable|boolean',
        ]);

        $shipAddress = CustomerShipAddress::create($validated);
        return response()->json($shipAddress, 201);
    }

    public function show(CustomerShipAddress $customerShipAddress)
    {
        return $customerShipAddress;
    }

    public function update(Request $request, CustomerShipAddress $customerShipAddress)
    {
        $customerShipAddress->update($request->all());
        return response()->json($customerShipAddress);
    }

    public function destroy(CustomerShipAddress $customerShipAddress)
    {
        $customerShipAddress->delete();
        return response()->json(null, 204);
    }
}
