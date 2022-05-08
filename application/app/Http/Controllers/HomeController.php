<?php

namespace App\Http\Controllers;

class HomeController extends Controller
{
    public function ping()
    {
        $response = array(
            'message' => 'Welcome to blog API 2022. Thanks for visiting our site.',
            'status' => 'OK'
        );
        return response()->json($response);
    }    
}
