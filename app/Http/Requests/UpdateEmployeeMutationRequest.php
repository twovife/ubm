<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmployeeMutationRequest extends FormRequest
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
            'branch_id' => ['required', 'integer'],
            'jabatan' => ['required', 'string'],
            'area' => ["nullable", 'integer'],
            'history_date' => ['required', 'date'],
            'keterangan' => ['required', 'string'],
        ];
    }
}
