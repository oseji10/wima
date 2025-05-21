<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DBAs extends Model
{
    protected $table = 'dba';
    protected $primaryKey = 'dbaId';
    protected $fillable = ['dbaName', 'dbaType', 'status'];
}
