<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmployeeRequest extends FormRequest
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
        $employeeId = $this->route('employee')->id;

        return [
            'nik' => 'required|string|unique:employees,nik,' . $employeeId,
        ];
    }
    public function messages()
    {
        return [
            '*.unique' => "Nik Sudah Terdaftar"
        ];
    }
}
