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
        Schema::create('mst_department', function (Blueprint $table) {
            $table->id();
            $table->string('department_no', 50)->unique();
            $table->string('department_name', 150);
            $table->text('descriptions')->nullable();
            $table->string('header', 150)->nullable();
            $table->string('sub_department', 150)->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mst_department');
    }
};
