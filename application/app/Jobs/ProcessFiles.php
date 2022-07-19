<?php

namespace App\Jobs;

use App\Services\FileService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessFiles implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * List of files
     * 
     * @var array
     */
    protected $data;
    
    /**
     * Create a new job instance.
     * @param array $files
     * @return void
     */
    public function __construct(array $data)
    {
        $this->data = $data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(FileService $service)
    {
        $service->uploadFilesToS3($this->data);
    }
}
