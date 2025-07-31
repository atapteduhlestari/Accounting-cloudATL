<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PaymentTerm;

class PaymentTermController extends Controller
{
    public function index()
    {
        return PaymentTerm::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'pay_within_days' => 'required|integer',
            'discount_percent' => 'required|numeric|min:0|max:100',
            'due_days' => 'required|integer',
            'note' => 'nullable|string',
        ]);

        $paymentTerm = PaymentTerm::create($validated);

        return response()->json($paymentTerm, 201);
    }

    public function show($id)
    {
        return PaymentTerm::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $paymentTerm = PaymentTerm::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'pay_within_days' => 'required|integer',
            'discount_percent' => 'required|numeric|min:0|max:100',
            'due_days' => 'required|integer',
            'note' => 'nullable|string',
        ]);

        $paymentTerm->update($validated);

        return response()->json($paymentTerm);
    }

    public function destroy($id)
    {
        $paymentTerm = PaymentTerm::findOrFail($id);
        $paymentTerm->delete();

        return response()->json(null, 204);
    }
}
