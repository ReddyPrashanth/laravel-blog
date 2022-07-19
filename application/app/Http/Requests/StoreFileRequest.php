<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "files" => "required",
            "files.*" => "mimes:jpg,jpeg,png",
            "post_id" => "required_without:content_id|numeric",
            "content_id" => "required_without:post_id|numeric"
        ];
    }
}
