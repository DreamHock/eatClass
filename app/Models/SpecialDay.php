<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpecialDay extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'dayName',
        'restaurant_id',
        'specialDate',
    ];

    function services() {
        return $this->hasMany(Service::class);
    }

    function restaurant() {
        return $this->belongsTo(Restaurant::class);
    }
}