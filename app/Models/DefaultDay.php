<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DefaultDay extends Model
{
    use HasFactory;
    protected $fillable = [
        'dayName',
        'restaurant_id',
    ];

    function defaultServices() {
        return $this->hasMany(DefaultService::class);
    }

    function restaurant() {
        return $this->belongsTo(Restaurant::class);
    }
}
