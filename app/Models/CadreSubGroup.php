<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CadreSubGroup extends Model
{
    protected $table = 'cadre_subgroup';
    protected $primaryKey = 'cadreSubGroupId';
    protected $fillable = ['cadreSubGroupName', 'cadreGroupId', 'status'];
}
