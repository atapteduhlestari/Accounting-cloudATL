<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mst_tax', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->decimal('nilai', 5, 2); // persen
            $table->string('kode');
            $table->text('keterangan')->nullable();
            $table->unsignedBigInteger('akun_pajak_penjualan');
            $table->unsignedBigInteger('akun_pajak_pembelian');
            $table->timestamps();

            $table->foreign('akun_pajak_penjualan')->references('id')->on('chart_of_accounts');
            $table->foreign('akun_pajak_pembelian')->references('id')->on('chart_of_accounts');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mst_tax');
    }
};
