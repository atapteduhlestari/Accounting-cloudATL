<?php

namespace App\Helpers;

use App\Models\ChartOfAccount;
use App\Models\TipeAkun;

class AccountHelper
{
    public static function generateAccountNumber($tipeAkunId, $parentId = null)
    {
        $tipeAkun = TipeAkun::find($tipeAkunId);
        if (!$tipeAkun) {
            throw new \Exception('Tipe akun tidak ditemukan.');
        }

        $kodeTipe = $tipeAkun->kode;
        $kodeKategori = $tipeAkun->kategori ? $tipeAkun->kategori->kode : '0';

        // === SUB ACCOUNT ===
        if ($parentId) {
            $parent = ChartOfAccount::find($parentId);
            if (!$parent) {
                throw new \Exception('Parent account not found.');
            }

            // Ambil prefix dari parent (misal: 1-1-)
            $parts = explode('-', $parent->account_no);
            if (count($parts) < 3) {
                throw new \Exception('Invalid parent account number format.');
            }

            $prefix = $parts[0] . '-' . $parts[1] . '-';

            // Ambil sub-akun terakhir dari parent
            $lastSub = ChartOfAccount::where('parent_id', $parentId)
                ->orderBy('account_no', 'desc')
                ->first();

            if (!$lastSub) {
                return $prefix . '1000'; // Sub account pertama
            }

            $lastParts = explode('-', $lastSub->account_no);
            $lastNumber = (int)end($lastParts);
            $newNumber = str_pad($lastNumber + 100, 4, '0', STR_PAD_LEFT);

            return $prefix . $newNumber;
        }

        // === MAIN ACCOUNT ===
        $lastMain = ChartOfAccount::where('account_type', $tipeAkunId)
            ->whereNull('parent_id')
            ->orderBy('account_no', 'desc')
            ->first();

        $orderNumber = 1;
        if ($lastMain) {
            $parts = explode('-', $lastMain->account_no);
            $orderNumber = ((int)$parts[1]) + 1;
        }

        $middle = str_pad($orderNumber, 1, '0', STR_PAD_LEFT);

        return $kodeKategori . '-' . $middle . '-0000';
    }
}
