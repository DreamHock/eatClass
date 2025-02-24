<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;



class ExternalApiController extends Controller
{

    public function fetchMap(Request $request)
    {
        dd($request->all());
        // $microserviceUrl = "https://localhost:443";
        // $response = Http::post($microserviceUrl, []);

        // $htmlContent = $response->body();

        // // Store this in a temp file or a cache system (optional)
        // $tempPath = "/tmp/map_" . uniqid() . ".html";
        // file_put_contents($tempPath, $htmlContent);

        // return response($tempPath);
    }
}
