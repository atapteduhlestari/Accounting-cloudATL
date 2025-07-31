<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PemasokRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            // Data utama pemasok
            'is_active' => 'boolean',
            'no_pemasok' => 'required|string|max:50|unique:mst_pemasok,no_pemasok,' . ($this->id ?? 0),
            'nama' => 'required|string|max:255',
            'alamat' => 'nullable|string',
            'kota' => 'nullable|string|max:100',
            'provinsi' => 'nullable|string|max:100',
            'kode_pos' => 'nullable|string|max:20',
            'negara' => 'nullable|string|max:100',
            'telepon' => 'nullable|string|max:50',
            'faksimili' => 'nullable|string|max:50',
            'kontak' => 'nullable|string|max:100',
            'email' => 'nullable|email|max:255',
            'website' => ['nullable', 'regex:/^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/'],
            'termin_id' => 'nullable|exists:payment_terms,id',
            'currency_id' => 'nullable|exists:currencies,id',
            'saldo_awal' => 'nullable|numeric',
            'saldo_awal_tanggal' => 'nullable|date',
            'default_keterangan' => 'nullable|string',
            'pajak_1_id' => 'nullable|exists:mst_tax,id',
            'pajak_2_id' => 'nullable|exists:mst_tax,id',
            'npwp' => 'nullable|string|max:50',
            'tax_type_id' => 'nullable|exists:type_taxes,id',
            'pesan' => 'nullable|string',
            'catatan' => 'nullable|string',

            // Kontak pemasok (array)
            'kontak_pemasok' => 'nullable|array',
            'kontak_pemasok.*.id' => 'nullable|exists:mst_pemasok_kontak,id',
            'kontak_pemasok.*.nama_depan' => 'required|string|max:255',
            'kontak_pemasok.*.nama_belakang' => 'nullable|string|max:255',
            'kontak_pemasok.*.jabatan' => 'nullable|string|max:255',
            'kontak_pemasok.*.bisnis1' => 'nullable|string|max:255',
            'kontak_pemasok.*.ext1' => 'nullable|string|max:255',
            'kontak_pemasok.*.bisnis2' => 'nullable|string|max:255',
            'kontak_pemasok.*.ext2' => 'nullable|string|max:255',
            'kontak_pemasok.*.seluler' => 'nullable|string|max:255',
            'kontak_pemasok.*.faksimili' => 'nullable|string|max:255',
            'kontak_pemasok.*.pager' => 'nullable|string|max:255',
            'kontak_pemasok.*.rumah' => 'nullable|string|max:255',
            'kontak_pemasok.*.email' => 'nullable|email|max:255',
            'kontak_pemasok.*.catatan' => 'nullable|string',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
