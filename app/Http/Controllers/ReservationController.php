<?php

namespace App\Http\Controllers;

use App\Mail\ReservationInformation;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Reservation::create($request->validate([
        //     'name' => ['required', 'string'],
        //     'phone' => ['required', 'regex:/^0[67][0-9]{8}$/'],
        //     'email' => ['required', 'email'],
        //     'reservable_id' => 
        // ]));
        $createdReservation = Reservation::create($request->all());
        // Mail::send(new ReservationInformation($createdReservation));
        // Session::remove('createdReservation');
        // Session::put('createdReservation', $createdReservation);
        // return Inertia::location('/mail');
    }

    /**
     * Display the specified resource.
     */
    public function show(Reservation $reservation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reservation $reservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reservation $reservation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        //
    }
}
