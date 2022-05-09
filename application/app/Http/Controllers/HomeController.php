<?php

namespace App\Http\Controllers;

class HomeController extends Controller
{
    public function ping()
    {
        $response = array(
            'message' => 'Welcome to blog API 2022. Visit us again.',
            'status' => 'OK'
        );
        return response()->json($response);
    }    
}
