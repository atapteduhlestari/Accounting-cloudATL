<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MstTipeAktivaTetap;
use App\Models\MstTipeAktivaTetapPajak;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class MstTipeAktivaTetapController extends Controller
{
    public function index(Request $request)
    {
        $query = MstTipeAktivaTetap::with(['tipePajak:id,nama'])->orderBy('id','desc');

        // optional: simple search by nama
        if ($s = $request->get('search')) {
            $query->where('nama', 'like', "%{$s}%");
        }

        return response()->json($query->paginate($request->get('per_page', 10)));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => ['required','string','max:255'],
            'tipe_pajak_id' => ['required','integer', Rule::exists('mst_tipe_aktiva_tetap_pajak','id')],
        ]);

        $pajak = MstTipeAktivaTetapPajak::with('metode')->findOrFail($validated['tipe_pajak_id']);

        $data = array_merge($validated, [
            'metode_penyusutan_pajak' => optional($pajak->metode)->nama, // snapshot nama metode
            'estimasi_umur_pajak'     => $pajak->estimasi_umur_pajak,
            'tarif_penyusutan_pajak'  => $pajak->tarif_penyusutan_pajak,
        ]);

        $row = MstTipeAktivaTetap::create($data);

        return response()->json($row->load('tipePajak:id,nama'), 201);
    }

    public function show($id)
    {
        $row = MstTipeAktivaTetap::with(['tipePajak:id,nama'])->findOrFail($id);
        return response()->json($row);
    }

    public function update(Request $request, $id)
    {
        $row = MstTipeAktivaTetap::findOrFail($id);

        $validated = $request->validate([
            'nama' => ['sometimes','required','string','max:255'],
            'tipe_pajak_id' => ['sometimes','required','integer', Rule::exists('mst_tipe_aktiva_tetap_pajak','id')],
        ]);

        // Jika tipe pajak diganti, refresh snapshot readonly
        if (isset($validated['tipe_pajak_id'])) {
            $pajak = MstTipeAktivaTetapPajak::with('metode')->findOrFail($validated['tipe_pajak_id']);
            $validated['metode_penyusutan_pajak'] = optional($pajak->metode)->nama;
            $validated['estimasi_umur_pajak']     = $pajak->estimasi_umur_pajak;
            $validated['tarif_penyusutan_pajak']  = $pajak->tarif_penyusutan_pajak;
        }

        $row->update($validated);

        return response()->json($row->load('tipePajak:id,nama'));
    }

    public function destroy($id)
    {
        $row = MstTipeAktivaTetap::findOrFail($id);
        $row->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
