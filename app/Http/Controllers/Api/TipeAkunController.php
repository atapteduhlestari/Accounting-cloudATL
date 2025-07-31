<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use App\Models\TipeAkun;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TipeAkunController extends Controller
{
    public function index()
    {
        try {
            $data = TipeAkun::with('kategori')->get();

            $result = $data->map(function ($item) {
                return [
                    'id' => $item->id,
                    'nama' => $item->nama,
                    'kode' => $item->kode,
                    'kategori_id' => $item->kategori_id,
                    'kategori_nama' => optional($item->kategori)->nama ?? '-',
                ];
            });

            return response()->json($result);
        } catch (\Exception $e) {
            Log::error('🔥 Error in TipeAkunController@index: ' . $e->getMessage());
            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'nama' => 'required|string|max:255',
                'kategori_id' => 'required|exists:kategoris,id',
                'is_currency_required' => 'sometimes|boolean',
                'is_opening_balance_required' => 'sometimes|boolean',
            ]);

            $kategori = Kategori::find($validated['kategori_id']);

            if (!$kategori || !$kategori->kode) {
                throw new \Exception('Kategori tidak ditemukan atau tidak memiliki kode.');
            }

            $prefix = explode('-', $kategori->kode)[0] ?? 'XXX';
            $jumlah = TipeAkun::where('kategori_id', $kategori->id)->count() + 1;
            $kode = "{$prefix}-{$jumlah}-0000";

            $tipe = TipeAkun::create([
                'nama' => $validated['nama'],
                'kategori_id' => $validated['kategori_id'],
                'kode' => $kode,
                'is_currency_required' => $request->get('is_currency_required', false),
                'is_opening_balance_required' => $request->get('is_opening_balance_required', false),
            ]);

            return response()->json($tipe, 201);
        } catch (\Exception $e) {
            Log::error('🔥 Gagal menyimpan Tipe Akun: ' . $e->getMessage());
            return response()->json([
                'message' => 'Terjadi kesalahan saat menyimpan data',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'nama' => 'required|string',
                'kategori_id' => 'required|exists:kategoris,id',
                'is_currency_required' => 'sometimes|boolean',
                'is_opening_balance_required' => 'sometimes|boolean',
            ]);

            $tipe = TipeAkun::findOrFail($id);
            $tipe->update([
                'nama' => $request->nama,
                'kategori_id' => $request->kategori_id,
                'is_currency_required' => $request->get('is_currency_required', false),
                'is_opening_balance_required' => $request->get('is_opening_balance_required', false),
            ]);

            return response()->json($tipe);
        } catch (\Exception $e) {
            Log::error('Error in TipeAkunController@update: ' . $e->getMessage());
            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $tipe = TipeAkun::findOrFail($id);
            $tipe->delete();

            return response()->json(['message' => 'Deleted']);
        } catch (\Exception $e) {
            Log::error('Error in TipeAkunController@destroy: ' . $e->getMessage());
            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }
}
