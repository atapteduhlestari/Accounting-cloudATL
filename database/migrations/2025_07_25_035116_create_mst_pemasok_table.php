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
        Schema::create('mst_pemasok', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_active')->default(true);
            $table->string('no_pemasok')->unique();
            $table->string('nama');
            $table->text('alamat')->nullable();
            $table->string('kota')->nullable();
            $table->string('provinsi')->nullable();
            $table->string('kode_pos')->nullable();
            $table->string('negara')->nullable();
            $table->string('telepon')->nullable();
            $table->string('faksimili')->nullable();
            $table->string('kontak')->nullable();
            $table->string('email')->nullable();
            $table->string('website')->nullable();

            // Relasi
            $table->unsignedBigInteger('termin_id')->nullable();
            $table->foreign('termin_id')->references('id')->on('payment_terms')->onDelete('set null');

            $table->unsignedBigInteger('currency_id')->nullable();
            $table->foreign('currency_id')->references('id')->on('currencies')->onDelete('set null');

            $table->decimal('saldo_awal', 15, 2)->default(0);
            $table->date('saldo_awal_tanggal')->nullable();
            $table->text('default_keterangan')->nullable();

            $table->unsignedBigInteger('pajak_1_id')->nullable();
            $table->foreign('pajak_1_id')->references('id')->on('mst_tax')->onDelete('set null');

            $table->unsignedBigInteger('pajak_2_id')->nullable();
            $table->foreign('pajak_2_id')->references('id')->on('mst_tax')->onDelete('set null');

            $table->string('npwp')->nullable();

            $table->unsignedBigInteger('tax_type_id')->nullable();
            $table->foreign('tax_type_id')->references('id')->on('type_taxes')->onDelete('set null');

            $table->text('pesan')->nullable();
            $table->text('catatan')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mst_pemasok');
    }
};
