<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mst_tipe_aktiva_tetap_pajak', function (Blueprint $table) {
            $table->id();
            $table->string('nama'); // Tipe aktiva tetap pajak
            $table->unsignedBigInteger('metode_id'); // relasi ke mst_metode_penyusutan_pajak
            $table->integer('estimasi_umur_pajak')->default(0); // tahun
            $table->decimal('tarif_penyusutan_pajak', 5, 2)->default(0); // %
            $table->timestamps();

            $table->foreign('metode_id')->references('id')->on('mst_metode_penyusutan_pajak')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mst_tipe_aktiva_tetap_pajak');
    }
};
