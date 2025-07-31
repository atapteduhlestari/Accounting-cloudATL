<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PemasokRequest;
use App\Models\MstPemasok;
use Illuminate\Http\JsonResponse;

class MstPemasokController extends Controller
{
    public function index(): JsonResponse
    {
        $data = MstPemasok::with(['kontak_pemasok', 'termin', 'currency', 'pajak1', 'pajak2', 'taxType'])->get();
        return response()->json($data);
    }

    public function store(PemasokRequest $request): JsonResponse
    {
        $data = $request->validated();
        $kontakList = $data['kontak_pemasok'] ?? [];

        unset($data['kontak_pemasok']);
        $pemasok = MstPemasok::create($data);

        foreach ($kontakList as $kontak) {
            $pemasok->kontak_pemasok()->create($kontak);
        }

        return response()->json(
            $pemasok->load(['kontak_pemasok', 'termin', 'currency', 'pajak1', 'pajak2', 'taxType']),
            201
        );
    }

    public function show($id): JsonResponse
    {
        $pemasok = MstPemasok::with(['kontak_pemasok', 'termin', 'currency', 'pajak1', 'pajak2', 'taxType'])
            ->findOrFail($id);

        return response()->json($pemasok);
    }

    public function update(PemasokRequest $request, $id): JsonResponse
    {
        $pemasok = MstPemasok::findOrFail($id);
        $data = $request->validated();
        $kontakList = $data['kontak_pemasok'] ?? [];

        unset($data['kontak_pemasok']);
        $pemasok->update($data);

        // Hapus semua kontak lama & masukkan ulang
        $pemasok->kontak_pemasok()->delete();
        foreach ($kontakList as $kontak) {
            $pemasok->kontak_pemasok()->create($kontak);
        }

        return response()->json(
            $pemasok->load(['kontak_pemasok', 'termin', 'currency', 'pajak1', 'pajak2', 'taxType'])
        );
    }

    public function destroy($id): JsonResponse
    {
        $pemasok = MstPemasok::findOrFail($id);
        $pemasok->kontak_pemasok()->delete();
        $pemasok->delete();

        return response()->json(null, 204);
    }
}
