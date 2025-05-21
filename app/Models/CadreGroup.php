<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CadreGroup extends Model
{
    protected $table = 'cadre_group';
    protected $primaryKey = 'cadreGroupId';
    protected $fillable = ['cadreGroupName', 'status'];
}
