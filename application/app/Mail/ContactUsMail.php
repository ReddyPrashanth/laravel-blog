<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactUsMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Contact us payload
     * 
     * @var array
     */
    public $payload;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(array $payload)
    {
        $this->payload = $payload;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
                ->from(
                    $this->payload['email'], 
                    $this->payload['name']
                )
                ->markdown('emails.contactus');
    }
}
