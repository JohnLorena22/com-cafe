<?php

namespace App\Http\Controllers;

use App\Models\Station;

class StationController extends Controller
{
    public function index()
    {
        return Station::all();
    }
}