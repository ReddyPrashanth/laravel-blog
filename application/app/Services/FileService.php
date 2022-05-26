<?php

namespace App\Services;

use App\Http\Requests\StoreFileRequest;
use App\Jobs\ProcessFiles;
use App\Models\File;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class FileService {

    protected $path;

    protected $bucket_path;

    public function __construct()
    {
        $this->path = config("filesystems.files_path");
        $this->bucket_path = config("filesystems.bucket_path");
    }

    private function fileMetadata($file)
    {
        $file->store($this->path);
        $name = $file->hashName();
        $ext = $file->getClientOriginalExtension();
        return [
            "name" => $name,
            "ext" => $ext,
        ];
    }

    public function uploadPostsFile($post_id, $file)
    {
        $data = [
            "post_id" => $post_id, 
            "content_id" => null,
            "files" => [$this->fileMetadata($file)]
        ];
        ProcessFiles::dispatch($data);
    }

    public function uploadFile(StoreFileRequest $request)
    {
        $files = [];
        $data = $request->only(["post_id", "content_id"]);
        foreach($request->file("files") as $file)
        {
            $files[] = $this->fileMetadata($file);
        }
        $data["files"] = $files;
        ProcessFiles::dispatch($data);
        return [
            "message" => "Accepted. Will process shortly."
        ];
    }

    public function uploadFilesToS3(array $data)
    {
        foreach($data["files"] as $file)
        {
            $name = $file["name"];
            $path = storage_path("app/{$this->path}/").$name;
            $success = Storage::disk("s3")->put($name, file_get_contents($path));
            if($success){
                $model = new File();
                $model->name = $name;
                $model->ext = $file["ext"];
                $model->path = "{$this->bucket_path}/{$name}";
                if(isset($data["post_id"])) $model->post_id = $data["post_id"];
                else $model->content_id = $data["content_id"];
                try{
                    $model->save();
                }
                catch(QueryException $e)
                {
                    Log::error($e->getMessage());
                    Log::info("Failed to save file {$name} to database. Deleting file {$name} from s3 storage.");
                    Storage::disk("s3")->delete($name);
                }
                Storage::delete("{$this->path}/$name");
            }
        }
    }

    public function download($name)
    {
        $headers = [
            "Content-Type" => "application/octet-stream",
            "Content-Disposition" => "attachment; filename={$name}",
            "Content-Description" => "File Transfer"
        ];
        $exists = $file = Storage::disk("s3")->exists($name);
        if(!$exists) throw new NotFoundHttpException();
        $file = Storage::disk("s3")->get($name);
        return [
            "headers" => $headers,
            "file" => $file
        ];
    }
}