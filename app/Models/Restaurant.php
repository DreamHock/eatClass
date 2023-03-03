<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

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
}
