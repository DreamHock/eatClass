<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DefaultService extends Model
{
    use HasFactory;
    protected $fillable = [
        'service',
        'default_day_id',
        'from',
        'to',
        'interval',
        'active'
    ];

    function defaultDay()
    {
        return $this->belongsTo(DefaultDay::class);
    }

    public function reservation()
    {
        return $this->morphMany(Reservation::class, 'reservable');
    }
}
