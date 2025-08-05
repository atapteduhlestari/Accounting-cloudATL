<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('mst_barang_jasa', function (Blueprint $table) {
            $table->id();
            $table->enum('tipe_item', ['Persedian', 'Non Persedian', 'Servis']);
            $table->boolean('non_aktif')->default(false);
            $table->string('no_item')->unique();
            $table->text('keterangan')->nullable();

            // Informasi Persediaan
            $table->decimal('saldo_awal_kuantitas', 15, 2)->default(0);
            $table->decimal('saldo_awal_harga_per_unit', 15, 2)->default(0);
            $table->decimal('saldo_awal_harga_pokok', 15, 2)->default(0);

            $table->decimal('saldo_saat_ini_kuantitas', 15, 2)->default(0);
            $table->decimal('saldo_saat_ini_harga_per_unit', 15, 2)->default(0);
            $table->decimal('saldo_saat_ini_harga_pokok', 15, 2)->default(0);

            $table->foreignId('kategori_id')->nullable()->constrained('kategori_barang')->nullOnDelete();
            $table->date('per_tanggal')->nullable();
            $table->string('unit')->nullable();

            // Informasi Penjualan
            $table->decimal('harga_jual', 15, 2)->default(0);
            $table->decimal('diskon_penjualan', 5, 2)->default(0); // dalam persen
            $table->string('kode_pajak_penjualan')->nullable();

            // Informasi Pembelian
            $table->string('default_unit')->nullable();
            $table->decimal('diskon_pembelian', 5, 2)->default(0); // dalam persen
            $table->string('kode_pajak_pembelian')->nullable();
            $table->foreignId('pemasok_utama_id')->nullable()->constrained('mst_pemasok')->nullOnDelete();
            $table->decimal('min_jumlah_reorder', 15, 2)->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mst_barang_jasa');
    }
};
