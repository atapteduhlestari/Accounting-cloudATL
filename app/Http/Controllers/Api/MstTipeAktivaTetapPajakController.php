<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MstTipeAktivaTetapPajak;
use Illuminate\Http\Request;

class MstTipeAktivaTetapPajakController extends Controller
{
    public function index()
    {
        return MstTipeAktivaTetapPajak::with('metode')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nama' => 'required|string|max:255',
            'metode_id' => 'required|exists:mst_metode_penyusutan_pajak,id',
            'estimasi_umur_pajak' => 'nullable|integer|min:0',
            'tarif_penyusutan_pajak' => 'nullable|numeric|min:0',
        ]);

        return MstTipeAktivaTetapPajak::create($data);
    }

    public function show($id)
    {
        return MstTipeAktivaTetapPajak::with('metode')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'nama' => 'required|string|max:255',
            'metode_id' => 'required|exists:mst_metode_penyusutan_pajak,id',
            'estimasi_umur_pajak' => 'nullable|integer|min:0',
            'tarif_penyusutan_pajak' => 'nullable|numeric|min:0',
        ]);

        $aktiva = MstTipeAktivaTetapPajak::findOrFail($id);
        $aktiva->update($data);

        return $aktiva;
    }

    public function destroy($id)
    {
        $aktiva = MstTipeAktivaTetapPajak::findOrFail($id);
        $aktiva->delete();

        return response()->noContent();
    }
}
