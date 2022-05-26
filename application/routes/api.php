<?php

use App\Http\Controllers\ContentController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::apiResource('posts', PostController::class);

Route::middleware('auth:sanctum')->group(function() {
    Route::apiResource('posts.contents', ContentController::class)->shallow();
    Route::apiResource('files', FileController::class)->only([
        "store"
    ]);
});
Route::get("files/{name}", [FileController::class, 'download'])->name("files.show");
