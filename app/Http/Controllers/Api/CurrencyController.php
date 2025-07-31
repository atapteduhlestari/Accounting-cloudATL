<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Currency;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
    public function index()
    {
        return Currency::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'exchange_rate' => 'required|numeric',
            'country' => 'required|string',
            'symbol' => 'required|string',
        ]);

        return Currency::create($data);
    }

    public function update(Request $request, Currency $currency)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'exchange_rate' => 'required|numeric',
            'country' => 'required|string',
            'symbol' => 'required|string',
        ]);

        $currency->update($data);
        return $currency;
    }

    public function destroy(Currency $currency)
    {
        $currency->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
