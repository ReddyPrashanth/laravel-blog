<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactEmailRequest;
use App\Mail\ContactUsMail;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    /**
     * Sends contact email
     *
     * @return \Illuminate\Http\Response
     */
    public function contactus(ContactEmailRequest $request)
    {
        $payload = $request->safe()->toArray();
        $to = config('mail.from.address');
        Mail::to($to)->send(new ContactUsMail($payload));
        return new JsonResource([
            'message' => 'Message sent successfully. Will get back to you shortly.'
        ]);
    }
}