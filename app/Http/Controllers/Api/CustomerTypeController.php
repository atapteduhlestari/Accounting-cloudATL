<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CustomerType;

class CustomerTypeController extends Controller
{
    public function index()
    {
        return response()->json(CustomerType::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $type = CustomerType::create($validated);
        return response()->json($type, 201);
    }

    public function show($id)
    {
        return response()->json(CustomerType::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $type = CustomerType::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $type->update($validated);
        return response()->json($type);
    }

    public function destroy($id)
    {
        $type = CustomerType::findOrFail($id);
        $type->delete();

        return response()->json(null, 204);
    }
}
