<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MstProject extends Model
{
    protected $table = 'mst_project';

    protected $fillable = [
        'project_no',
        'project_name',
        'header',
        'sub_project',
        'customer_name',
    ];
}
