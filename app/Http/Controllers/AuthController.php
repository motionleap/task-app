<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Login request.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        if (Auth::attempt($request->only('email', 'password'))) {

            return response()->json(['authenticated' => true, 'name' => Auth::user()->name]);
        }
        return response()->json(['authenticated' => false]);
    }

    /**
     * Logout request.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        Auth::guard()->logout();
        return response()->json(['authenticated' => false]);
    }

    /**
     * Authenticate current user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function authenticate()
    {
        if (Auth::check()) {
            return response()->json(['authenticated' => true, 'name' => Auth::user()->name]);
        }
        return response()->json(['authenticated' => false]);
    }
}
