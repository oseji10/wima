<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transfers extends Model
{
    protected $table = 'transfers';
    protected $primaryKey = 'transferId';
    protected $fillable = ['staffId', 'transferFrom', 'transferTo', 'initiatedBy', 'approvedBy', 'comment', 'status'];
    public function staff()
    {
        return $this->belongsTo(Staff::class, 'staffId');
    }

    public function fromDba()
    {
        return $this->belongsTo(DBAs::class,  'transferFrom', 'dbaId');
    }

    public function toDba()
    {
        return $this->belongsTo(DBAs::class, 'transferTo', 'dbaId');
    }
}
