@extends('layouts.emailLayout')
@section('content')
<div class="flex flex-col items-center">
    <div class="mb-4 mt-1 text-3xl">Hello {{$createdReservation->name}}</div>
    <div class="flex justify-between mb-2 gap-2">
        <div class="flex flex-col gap-2">
            <div class="flex justify-between">
                <div>Email</div>
                <!-- <div>:</div> -->
            </div>
            <div class="flex justify-between">
                <div>Phone</div>
                <!-- <div>:</div> -->
            </div>
            <div class="flex justify-between">
                <div>Date</div>
                <!-- <div>:</div> -->
            </div>
            <div class="flex justify-between">
                <div>Number of people</div>
                <!-- <div>:</div> -->
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <div>{{$createdReservation->email}}</div>
            <div>{{$createdReservation->phone}}</div>
            <div>{{$createdReservation->date}} At {{$createdReservation->time}}</div>
            <div>{{$createdReservation->nbrPeople}}</div>
        </div>
    </div>
    <div class="flex w-full justify-center gap-4">
        <a class="py-2 px-2 rounded flex justify-center items-center bg-slate-100 hover:bg-slate-200 border border-slate-800 text-slate-800 active:ring-slate-500 w-2/6" href="">Modify</a>
        <a class="py-2 px-2 rounded flex justify-center items-center bg-red-100 hover:bg-red-200 border border-red-800 text-red-800 active:ring-red-500 w-2/6" href="">Cancel</a>
    </div>
</div>
@endsection