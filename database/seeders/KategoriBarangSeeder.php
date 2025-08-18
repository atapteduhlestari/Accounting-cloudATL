<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\KategoriBarang;

class KategoriBarangSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            ['nama' => 'Aksesoris'],
        ];

        foreach ($data as $item) {
            KategoriBarang::create($item);
        }
    }
}
