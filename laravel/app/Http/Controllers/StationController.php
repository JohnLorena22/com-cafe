<?php

namespace App\Http\Controllers;

use App\Models\Station;

class StationController extends Controller
{
    public function index()
    {
        return Station::all();
    }

     public function store(Request $request)
    {
        $station = Station::create([
            'name' => $request->name,
            'tier' => $request->tier,
            'rate' => $request->rate,
        ]);

        return response()->json($station, 201);
    }
}