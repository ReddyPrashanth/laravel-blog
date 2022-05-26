<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContentRequest extends FormRequest
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
            "data" => "required|array",
            "data.*.sub_title" => "required|string|max:255",
            "data.*.annotation" => "nullable|string|max:255",
            "data.*.body" => "required|array",
            "data.*.body.*.content" => "required|string",
            "data.*.body.*.list_items" => "nullable|array"
        ];
    }
}
