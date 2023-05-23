<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEmployeeRequest extends FormRequest
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
            'nama_karyawan' => ["required", 'string'],
            'nik' => ["required", 'string', 'unique:employees'],
            'alamat' => ["required", 'string'],
            'branch_id' => ["required", 'integer'],
            'hire_date' => ["required", 'date'],
            'jabatan' => ["required", 'string'],
            'area' => ["nullable", 'integer'],
        ];
    }
    public function messages()
    {
        return [
            '*.unique' => ['NIK Sudah terdaftar silahkan hubungi Pusat untuk konfirmasi']
        ];
    }
}
