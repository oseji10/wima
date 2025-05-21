<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MembershipPlan extends Model
{
    protected $table = 'membership_plans';
    // protected $primaryKey = 'membershipPlanId';
    protected $fillable = ['membershipPlanId', 'membershipPlanName'];
}
