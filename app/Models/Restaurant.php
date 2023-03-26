<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    static public $restaurant;

    function category()
    {
        return $this->belongsTo(Category::class);
    }

    function reserveCustommers()
    {
        return $this->belongsToMany(Custommer::class, 'reservations');
    }

    function services()
    {
        return $this->hasMany(Service::class);
    }

    function DefaultDays()
    {
        return $this->hasMany(DefaultDay::class);
    }
}
