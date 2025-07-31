<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tax;
use App\Models\ChartOfAccount;
use Illuminate\Http\Request;

class TaxController extends Controller
{
    public function index()
    {
        $data = Tax::with(['akunPenjualan', 'akunPembelian'])->get();
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string',
            'nilai' => 'required|numeric',
            'kode' => 'required|string',
            'keterangan' => 'nullable|string',
            'akun_pajak_penjualan' => 'required|exists:chart_of_accounts,id',
            'akun_pajak_pembelian' => 'required|exists:chart_of_accounts,id',
        ]);

        $tax = Tax::create($request->all());

        return response()->json($tax, 201);
    }

    public function show($id)
    {
        $tax = Tax::with(['akunPenjualan', 'akunPembelian'])->findOrFail($id);
        return response()->json($tax);
    }

    public function update(Request $request, $id)
    {
        $tax = Tax::findOrFail($id);

        $request->validate([
            'nama' => 'required|string',
            'nilai' => 'required|numeric',
            'kode' => 'required|string',
            'keterangan' => 'nullable|string',
            'akun_pajak_penjualan' => 'required|exists:chart_of_accounts,id',
            'akun_pajak_pembelian' => 'required|exists:chart_of_accounts,id',
        ]);

        $tax->update($request->all());

        return response()->json($tax);
    }

    public function destroy($id)
    {
        $tax = Tax::findOrFail($id);
        $tax->delete();

        return response()->json(null, 204);
    }

    public function coaList()
    {
        return ChartOfAccount::select('id', 'nama', 'nomor_akun')->get();
    }
}