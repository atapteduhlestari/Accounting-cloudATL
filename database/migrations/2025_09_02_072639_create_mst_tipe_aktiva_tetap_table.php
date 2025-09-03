<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('mst_tipe_aktiva_tetap', function (Blueprint $table) {
            $table->id();
            $table->string('nama'); // Nama Tipe Aktiva Tetap
            $table->unsignedBigInteger('tipe_pajak_id'); // FK ke mst_tipe_aktiva_tetap_pajak
            // Snapshot kolom-kolom pajak (readonly di form, tetap disimpan di tabel ini)
            $table->string('metode_penyusutan_pajak')->nullable();
            $table->unsignedInteger('estimasi_umur_pajak')->nullable(); // in years/periods sesuai definisi kamu
            $table->decimal('tarif_penyusutan_pajak', 8, 2)->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('tipe_pajak_id')
                ->references('id')
                ->on('mst_tipe_aktiva_tetap_pajak')
                ->cascadeOnUpdate()
                ->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mst_tipe_aktiva_tetap');
    }
};
