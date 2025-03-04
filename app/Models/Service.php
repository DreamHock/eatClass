<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'restaurant_id',
        'special_day_id',
        'service',
        'from',
        'to',
        'interval',
        'date',
    ];

    function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function reservation(): MorphMany
    {
        return $this->morphMany(Reservation::class, 'reservable');
    }

    public function specialDay()
    {
        return $this->belongsTo(SpecialDay::class);
    }
}
