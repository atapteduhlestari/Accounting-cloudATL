<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TypeTax;
use Illuminate\Http\Request;

class TypeTaxController extends Controller
{
    public function index()
    {
        return TypeTax::orderBy('id', 'asc')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
        ]);

        $typeTax = TypeTax::create($validated);

        return response()->json($typeTax, 201);
    }

    public function show($id)
    {
        return TypeTax::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
        ]);

        $typeTax = TypeTax::findOrFail($id);
        $typeTax->update($validated);

        return response()->json($typeTax);
    }

    public function destroy($id)
    {
        $typeTax = TypeTax::findOrFail($id);
        $typeTax->delete();

        return response()->json(null, 204);
    }
}
