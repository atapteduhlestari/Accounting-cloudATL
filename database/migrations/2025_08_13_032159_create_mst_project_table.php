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
        Schema::create('mst_project', function (Blueprint $table) {
            $table->id();
            $table->string('project_no', 50)->unique();
            $table->string('project_name', 255);
            $table->string('header', 255)->nullable();
            $table->string('sub_project', 255)->nullable();
            $table->string('customer_name', 255);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mst_project');
    }
};
