<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MSPs extends Model
{
    protected $table = 'msps';
    // protected $primaryKey = 'Id';
    protected $fillable = ['mspId', 'mspName', 'position', 'membership', 'services', 'state', 'lga', 'community'];
   
    public function state()
    {
        return $this->belongsTo(State::class, 'state', 'stateId');
    }
    public function lga()
    {
        return $this->belongsTo(Lga::class, 'lga', 'lgaId');
    }
    public function position()
    {
        return $this->belongsTo(Position::class, 'position', 'positionId');
    }
    public function membership_plan()
    {
        return $this->belongsTo(MembershipPlan::class, 'membership', 'membershipPlanId');
    }

   
}
