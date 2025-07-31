<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChartOfAccount;
use App\Models\TipeAkun;
use App\Models\Currency;
use Illuminate\Http\Request;

class ChartOfAccountController extends Controller
{
    public function index()
    {
        $accounts = ChartOfAccount::with(['tipeAkun.kategori', 'parentAccount', 'currency'])->get();
        return response()->json($accounts);
    }

    public function store(Request $request)
    {
        $tipeAkun = TipeAkun::find($request->tipe_akun_id);

        $rules = [
            'nama' => 'required|string',
            'tipe_akun_id' => 'required|exists:tipe_akun,id',
            'nomor_akun' => 'required|string|unique:chart_of_accounts,nomor_akun',
            'sub_account_of' => 'nullable|exists:chart_of_accounts,id',
            'kalender' => 'required|date',
        ];

        if ($tipeAkun->is_currency_required) {
            $rules['currency_id'] = 'required|exists:currencies,id';
        }

        if ($tipeAkun->is_opening_balance_required) {
            $rules['saldo_awal'] = 'required|numeric';
        } else {
            $rules['saldo_awal'] = 'nullable|numeric';
        }

        $data = $request->validate($rules);

        $coa = ChartOfAccount::create($data);

        return response()->json($coa, 201);
    }

    public function destroy($id)
    {
        $coa = ChartOfAccount::findOrFail($id);
        $coa->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }

    public function update(Request $request, $id)
    {
        $coa = ChartOfAccount::findOrFail($id);
        $tipeAkun = TipeAkun::find($request->tipe_akun_id);

        $rules = [
            'nama' => 'required|string',
            'tipe_akun_id' => 'required|exists:tipe_akun,id',
            'nomor_akun' => 'required|string|unique:chart_of_accounts,nomor_akun,' . $id,
            'sub_account_of' => 'nullable|exists:chart_of_accounts,id',
            'kalender' => 'required|date',
        ];

        if ($tipeAkun->is_currency_required) {
            $rules['currency_id'] = 'required|exists:currencies,id';
        }

        if ($tipeAkun->is_opening_balance_required) {
            $rules['saldo_awal'] = 'required|numeric';
        } else {
            $rules['saldo_awal'] = 'nullable|numeric';
        }

        $data = $request->validate($rules);

        $coa->update($data);

        return response()->json($coa);
    }

    public function getTipeAkunDetails($id)
    {
        $tipeAkun = TipeAkun::findOrFail($id);
        return response()->json([
            'is_currency_required' => $tipeAkun->is_currency_required,
            'is_opening_balance_required' => $tipeAkun->is_opening_balance_required
        ]);
    }
}
