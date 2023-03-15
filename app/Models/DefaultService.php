<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DefaultService extends Model
{
    use HasFactory;
    protected $fillable = [
        'service',
        'restaurant_id',
        'weekDayName',
    ];

    function restaurant() {
        return $this->belongsTo(Restaurant::class);
    }
}
