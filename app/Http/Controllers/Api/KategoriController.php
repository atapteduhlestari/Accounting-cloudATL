<?php

namespace App\Http\Controllers\Api;

use App\Models\Kategori;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\KategoriResource;

class KategoriController extends Controller
{
    public function index()
    {
        $kategoris = Kategori::orderBy('id')->get();
        return KategoriResource::collection($kategoris);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
        ]);

        $number = Kategori::count() + 1;
        $kode = $number . '-0000';


        $kategori = Kategori::create([
            'nama' => $request->nama,
            'kode' => $kode,
        ]);

        return new KategoriResource($kategori);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
        ]);

        $kategori = Kategori::findOrFail($id);
        $kategori->update([
            'nama' => $request->nama,
        ]);

        return new KategoriResource($kategori);
    }

    public function destroy($id)
    {
        $kategori = Kategori::findOrFail($id);
        $kategori->delete();

        return response()->json(['message' => 'Kategori berhasil dihapus.']);
    }
}
