<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();

            // Tab Alamat
            $table->string('customer_number')->unique();
            $table->boolean('is_active')->default(true);
            $table->string('name');
            $table->text('address')->nullable();
            $table->string('city')->nullable();
            $table->string('province')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('country')->nullable();
            $table->string('phone')->nullable();
            $table->string('fax')->nullable();
            $table->string('contact_person')->nullable();
            $table->string('email')->nullable();
            $table->string('website')->nullable();

            // Tab Termin
            $table->foreignId('payment_term_id')->nullable()->constrained('payment_terms');
            $table->decimal('credit_limit', 15, 2)->nullable();
            $table->decimal('max_invoice_amount', 15, 2)->default(-1);
            $table->foreignId('currency_id')->nullable()->constrained('currencies');
            $table->decimal('opening_balance', 15, 2)->default(0);
            $table->date('balance_date')->nullable();
            $table->text('payment_message')->nullable();

            // Tab Penjualan
            $table->foreignId('tax1_id')->nullable()->constrained('mst_tax');
            $table->foreignId('tax2_id')->nullable()->constrained('mst_tax');
            $table->string('tax_number')->nullable();
            $table->string('tax_code')->nullable();
            $table->text('tax_address1')->nullable();
            $table->text('tax_address2')->nullable();
            $table->foreignId('customer_type_id')->nullable()->constrained('customer_types');
            $table->tinyInteger('price_level')->default(1);
            $table->decimal('default_sales_discount', 5, 2)->nullable();

            // Tab Catatan
            $table->text('notes')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('customers');
    }
};
