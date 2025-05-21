<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HIP extends Model
{
    protected $table = 'his';
    protected $primaryKey = 'HISId';
    protected $fillable = ['hisName', 'status'];
}
