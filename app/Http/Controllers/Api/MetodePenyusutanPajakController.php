<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MetodePenyusutanPajak;
use Illuminate\Http\Request;

class MetodePenyusutanPajakController extends Controller
{
    public function index()
    {
        return response()->json(
            MetodePenyusutanPajak::select('id', 'nama')->get()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|unique:mst_metode_penyusutan_pajak,nama',
        ]);

        $data = MetodePenyusutanPajak::create($request->only('nama'));
        return response()->json($data, 201);
    }

    public function show($id)
    {
        return response()->json(MetodePenyusutanPajak::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $data = MetodePenyusutanPajak::findOrFail($id);
        $request->validate([
            'nama' => 'required|string|unique:mst_metode_penyusutan_pajak,nama,' . $id,
        ]);
        $data->update($request->only('nama'));

        return response()->json($data);
    }

    public function destroy($id)
    {
        $data = MetodePenyusutanPajak::findOrFail($id);
        $data->delete();

        return response()->json(null, 204);
    }
}
