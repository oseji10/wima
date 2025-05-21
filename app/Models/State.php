<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    protected $table = 'state';
    protected $primaryKey = 'stateId';
    protected $fillable = [
        'stateId',
        'stateName',
    ];
    public function lgas()
    {
        return $this->hasMany(Lga::class, 'state');
    }
}
