<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('customer_contacts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->onDelete('cascade');

            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('title')->nullable();
            $table->string('business_phone1')->nullable();
            $table->string('business_phone2')->nullable();
            $table->string('mobile_phone')->nullable();
            $table->string('pager')->nullable();
            $table->string('email')->nullable();
            $table->string('extension1')->nullable();
            $table->string('extension2')->nullable();
            $table->string('fax')->nullable();
            $table->string('home_phone')->nullable();
            $table->text('notes')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('customer_contacts');
    }
};
