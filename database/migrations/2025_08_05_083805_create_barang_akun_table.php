<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('barang_akun', function (Blueprint $table) {
            $table->id();
            $table->foreignId('barang_jasa_id')->constrained('mst_barang_jasa')->onDelete('cascade');
            $table->foreignId('akun_persediaan_id')->nullable()->constrained('chart_of_accounts')->nullOnDelete();
            $table->foreignId('akun_penjualan_id')->nullable()->constrained('chart_of_accounts')->nullOnDelete();
            $table->foreignId('akun_return_penjualan_id')->nullable()->constrained('chart_of_accounts')->nullOnDelete();
            $table->foreignId('akun_diskon_penjualan_id')->nullable()->constrained('chart_of_accounts')->nullOnDelete();
            $table->foreignId('akun_hpp_id')->nullable()->constrained('chart_of_accounts')->nullOnDelete();
            $table->foreignId('akun_return_pembelian_id')->nullable()->constrained('chart_of_accounts')->nullOnDelete();
            $table->foreignId('akun_belum_tertagih_id')->nullable()->constrained('chart_of_accounts')->nullOnDelete();
            $table->foreignId('akun_inventory_controller_id')->nullable()->constrained('chart_of_accounts')->nullOnDelete();
            $table->foreignId('akun_beban_id')->nullable()->constrained('chart_of_accounts')->nullOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('barang_akun');
    }
};
