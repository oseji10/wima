<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PFA extends Model
{
    protected $table = 'pfa';
    protected $primaryKey = 'PFAId';
    protected $fillable = ['pfaName', 'status'];
}
