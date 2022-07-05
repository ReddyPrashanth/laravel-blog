<?php

namespace Tests\Unit;

use App\Mail\ContactUsMail;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class MailableTest extends TestCase
{
    private $email;

    private $name;

    private $message;

    public function setUp(): void
    {
        parent::setUp();
        $this->email = Config::get('mail.mailers.smtp.username');
        $this->name = 'Prashanth Sreepathi';
        $this->message = 'I have came across your site';
    }
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_contact_us_mailable_content()
    {
        $payload = [
            'email' => $this->email,
            'name' => $this->name,
            'message' => $this->message
        ];
        $mailable = new ContactUsMail($payload);
        $mailable->assertSeeInHtml($this->name);
        $mailable->assertSeeInHtml($this->message);
    }

    public function test_contact_us_email_sent()
    {
        Mail::fake();
        Mail::assertNothingSent();
        $payload = [
            'email' => $this->email,
            'name' => $this->name,
            'message' => $this->message
        ];
        $response = $this
            ->post(route('contact.us'), $payload);
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJson([
            'data' => [
                'message' => 'Message sent successfully. Will get back to you shortly.'
            ]
        ]);
        Mail::assertSent(ContactUsMail::class);
    }
}
