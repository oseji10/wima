<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class STAFF extends Model
{
    protected $table = 'staff';
    protected $primaryKey = 'staffId';
    protected $fillable = [
    'fileNumber',
    'surname',
    'firstName',
    'lastName',
    'otherNames',
    'dateOfBirth',
    'gender',
    'stateOfOrigin',
    'lgaOfOrigin',
    'dateOfFirstAppointment',
    'dateOfPresentAppointment',
    'dateOfConfirmation',
    'cadre',
    'accountNumber',
    'bankId',
    'PFANumber',
    'PFA',
    'NHFNumber',
    'HISNumber',
    "HIS",
    'dba',
    'userId',
    'status'];


    public function his()
    {
        return $this->belongsTo(HIP::class, 'HISId');
    }

    public function bank()
    {
        return $this->belongsTo(Bank::class, 'bankId');
    }

    public function pfa()
    {
        return $this->belongsTo(PFA::class, 'PFAId');
    }

    public function transfers()
    {
        return $this->hasMany(Transfers::class, 'staffId');
    }

    public function dba()
    {
        return $this->belongsTo(DBAs::class, 'dba');
    }
}
