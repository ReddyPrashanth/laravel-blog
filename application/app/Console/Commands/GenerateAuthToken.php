<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class GenerateAuthToken extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'auth:token {username : Username to generate token} {password : User password to generate token}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate an api auth token for a user';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $username = $this->argument('username');
        $password = $this->argument('password');
        $device = $this->choice(
            'Please select a device where this token is used?',
            ['web', 'mobile'],
            0 
        );
        $this->info("Device selected : {$device}");
        $user = User::where('email', $username)->first();
        $this->info("Authenticating user {$username}");
        if(!$user || ! Hash::check($password, $user->password)) {
            $this->error("Failed to authenticate user {$username}");
            $this->error("Reason : Invalid username or password. Please provide a valid username or password");
            return;
        }
        $this->info("Generating token for user {$username}");
        $token = $user->createToken($device)->plainTextToken;
        $this->info("Token generated successfully");
        $this->info("Token : {$token}");
    }
}
