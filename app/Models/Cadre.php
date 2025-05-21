<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cadre extends Model
{
    protected $table = 'cadre';
    protected $primaryKey = 'cadreId';
    protected $fillable = ['cadreName', 'step', 'maximumStep', 'cadreGroupId', 'cadreSubGroupId', 'maximumGradeLevel'];

    public function cadre_group() // Snake_case if this is what Tinker used
    {
        return $this->belongsTo(CadreGroup::class, 'cadreGroupId');
    }

    public function cadre_subgroup()
    {
        return $this->belongsTo(CadreSubGroup::class, 'cadreSubGroupId');
    }

}
