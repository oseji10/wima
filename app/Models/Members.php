<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Members extends Model
{
    protected $table = 'members';
    // protected $primaryKey = 'Id';
    protected $fillable = ['userId', 'name', 'phone', 'age', 'gender', 'state', 'lga', 'community', 'limited', 'religion', 'disability', 'physicalChallenge', 'operator', 'district', 'mspType', 'qualification', 'languages', 'idType', 'idNumber', 'availability', 'preExistingHealthMatter', 'nursingMother', 'birthCertificate'];
   
    public function state()
    {
        return $this->belongsTo(State::class, 'state', 'stateId');
    }
    public function lga()
    {
        return $this->belongsTo(Lga::class, 'lga', 'lgaId');
    }
    // public function position()
    // {
    //     return $this->belongsTo(Position::class, 'position', 'positionId');
    // }
    // public function membership_plan()
    // {
    //     return $this->belongsTo(MembershipPlan::class, 'membership', 'membershipPlanId');
    // }

   
}
