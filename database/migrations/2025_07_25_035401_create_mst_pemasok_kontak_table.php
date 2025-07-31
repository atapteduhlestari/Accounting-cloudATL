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
        Schema::create('mst_pemasok_kontak', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('pemasok_id');
            $table->foreign('pemasok_id')->references('id')->on('mst_pemasok')->onDelete('cascade');

            $table->string('nama_depan');
            $table->string('nama_belakang')->nullable();
            $table->string('jabatan')->nullable();
            $table->string('bisnis1')->nullable();
            $table->string('ext1')->nullable();
            $table->string('bisnis2')->nullable();
            $table->string('ext2')->nullable();
            $table->string('seluler')->nullable();
            $table->string('faksimili')->nullable();
            $table->string('pager')->nullable();
            $table->string('rumah')->nullable();
            $table->string('email')->nullable();
            $table->text('catatan')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mst_pemasok_kontak');
    }
};
