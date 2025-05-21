<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lga extends Model
{
    protected $table = 'lga';
    protected $primaryKey = 'lgaId';
    protected $fillable = [
        'lgaId',
        'lgaName',
        'stateId',
    ];
    public function state()
    {
        return $this->belongsTo(State::class, 'stateId', 'stateId');
    }
    
}
