<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MstPemasokKontak;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MstPemasokKontakController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(MstPemasokKontak::with('pemasok')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'pemasok_id' => 'required|exists:mst_pemasok,id',
            'nama_depan' => 'required|string|max:100',
            'nama_belakang' => 'nullable|string|max:100',
            'jabatan' => 'nullable|string|max:100',
            'bisnis1' => 'nullable|string|max:50',
            'ext1' => 'nullable|string|max:10',
            'bisnis2' => 'nullable|string|max:50',
            'ext2' => 'nullable|string|max:10',
            'seluler' => 'nullable|string|max:50',
            'faksimili' => 'nullable|string|max:50',
            'pager' => 'nullable|string|max:50',
            'rumah' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'catatan' => 'nullable|string',
        ]);

        $kontak = MstPemasokKontak::create($data);
        return response()->json($kontak, 201);
    }

    public function show($id): JsonResponse
    {
        $kontak = MstPemasokKontak::with('pemasok')->findOrFail($id);
        return response()->json($kontak);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $kontak = MstPemasokKontak::findOrFail($id);

        $data = $request->validate([
            'nama_depan' => 'required|string|max:100',
            'nama_belakang' => 'nullable|string|max:100',
            'jabatan' => 'nullable|string|max:100',
            'bisnis1' => 'nullable|string|max:50',
            'ext1' => 'nullable|string|max:10',
            'bisnis2' => 'nullable|string|max:50',
            'ext2' => 'nullable|string|max:10',
            'seluler' => 'nullable|string|max:50',
            'faksimili' => 'nullable|string|max:50',
            'pager' => 'nullable|string|max:50',
            'rumah' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'catatan' => 'nullable|string',
        ]);

        $kontak->update($data);
        return response()->json($kontak);
    }

    public function destroy($id): JsonResponse
    {
        MstPemasokKontak::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
