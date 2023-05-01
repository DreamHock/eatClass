<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'phone', 'email', 'reservable_type', 'reservable_id', 'date', 'time', 'nbrPeople'
    ];
    public function reservable()
    {
        return $this->morphTo();
    }
}
