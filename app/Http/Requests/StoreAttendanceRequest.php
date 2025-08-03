<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAttendanceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->role === 'teacher';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'attendances' => 'required|array',
            'attendances.*.student_id' => 'required|exists:students,id',
            'attendances.*.subject_id' => 'required|exists:subjects,id',
            'attendances.*.date' => 'required|date',
            'attendances.*.status' => 'required|in:present,absent,permission,sick',
            'attendances.*.notes' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'attendances.required' => 'Attendance data is required.',
            'attendances.*.student_id.required' => 'Student is required.',
            'attendances.*.student_id.exists' => 'Selected student does not exist.',
            'attendances.*.subject_id.required' => 'Subject is required.',
            'attendances.*.subject_id.exists' => 'Selected subject does not exist.',
            'attendances.*.date.required' => 'Date is required.',
            'attendances.*.status.required' => 'Attendance status is required.',
            'attendances.*.status.in' => 'Invalid attendance status.',
        ];
    }
}