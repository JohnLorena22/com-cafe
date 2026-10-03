<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStationRequest;
use App\Models\Station;
use Illuminate\Http\Request;

class StationController extends Controller
{
    public function index()
    {
        return Station::all();
    }

     public function store(StoreStationRequest $request)
    {
        $station = Station::create($request->validated());

        return response()->json($station, 201);
    }

    public function update(Request $request, Station $station)
   {
    $station->update([
        'name' => $request->name,
        'tier' => $request->tier,
        'rate' => $request->rate,
    ]);

    return response()->json($station);
    }

    public function destroy(Station $station)
    {
    $station->delete();

    return response()->json([
        'message' => 'Station deleted successfully'
    ]);
    }
}