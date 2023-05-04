<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBranchRequest extends FormRequest
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
            'wilayah' => 'required|integer',
            'unit' => 'required|string',
        ];
    }
    public function messages()
    {
        return [
            '*.required' => 'Kolom wajib diisi',
            '*.integer' => 'Diisi dengan angka saja, Untuk pusat isi 0',
            '*.string' => 'Koloh hanya berisi string',
        ];
    }
}
