<?php

namespace App\Http\Controllers\Api;

use App\Models\MstBarangJasa;
use App\Models\BarangAkun;
use App\Models\ChartOfAccount;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;

class BarangJasaController extends Controller
{
    public function index()
    {
        return MstBarangJasa::with(['kategori', 'pemasokUtama', 'akun'])->get();
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $barang = MstBarangJasa::create($data);

        if ($request->has('akun') && is_array($request->input('akun'))) {
            $akun = $request->input('akun');
            $akun['barang_jasa_id'] = $barang->id;
            BarangAkun::create($akun);
        }

        return response()->json(
            $barang->load([
                'akun.akunPersediaan',
                'akun.akunPenjualan',
                'akun.akunReturnPenjualan',
                'akun.akunDiskonPenjualan',
                'akun.akunHpp',
                'akun.akunReturnPembelian',
                'akun.akunBelumTertagih',
                'akun.akunInventoryController',
                'akun.akunBeban',
            ]),
            201
        );
    }

    public function show($id)
    {
        return MstBarangJasa::with([
            'kategori',
            'pemasokUtama',
            'akun.akunPersediaan',
            'akun.akunPenjualan',
            'akun.akunReturnPenjualan',
            'akun.akunDiskonPenjualan',
            'akun.akunHpp',
            'akun.akunReturnPembelian',
            'akun.akunBelumTertagih',
            'akun.akunInventoryController',
            'akun.akunBeban',
        ])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        try {
            $barang = MstBarangJasa::findOrFail($id);
            $barang->update($request->all());

            if ($request->has('akun') && is_array($request->input('akun'))) {
                $akunData = $request->input('akun');
                $akun = BarangAkun::firstOrNew(['barang_jasa_id' => $barang->id]);
                $akun->fill($akunData);
                $akun->save();
            }

            Log::info('Barang diperbarui', ['barang_id' => $barang->id]);

            return response()->json(
                $barang->load([
                    'akun.akunPersediaan',
                    'akun.akunPenjualan',
                    'akun.akunReturnPenjualan',
                    'akun.akunDiskonPenjualan',
                    'akun.akunHpp',
                    'akun.akunReturnPembelian',
                    'akun.akunBelumTertagih',
                    'akun.akunInventoryController',
                    'akun.akunBeban',
                ])
            );

        } catch (\Throwable $e) {
            Log::error('Gagal update barang', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'barang_id' => $id
            ]);
            return response()->json(['error' => 'Terjadi kesalahan saat menyimpan data'], 500);
        }
    }

    public function destroy($id)
    {
        $barang = MstBarangJasa::findOrFail($id);
        $barang->delete();
        return response()->json(['message' => 'Deleted']);
    }

    public function chartOfAccounts(Request $request)
    {
        $tipe = $request->query('tipe'); 

        $query = ChartOfAccount::with('tipeAkun')
            ->select('id', 'nama', 'nomor_akun', 'tipe_akun_id');

        if ($tipe) {
            // Ubah string jadi array
            $tipeList = is_array($tipe) ? $tipe : explode(',', $tipe);

            $query->whereHas('tipeAkun', function ($q) use ($tipeList) {
                $q->whereIn('nama', $tipeList);
            });
        }

        return $query->orderBy('nomor_akun')->get();
    }


    
}
