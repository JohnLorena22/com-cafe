<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreStationRequest extends FormRequest
{
      public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'tier' => 'required|string|max:255',
            'rate' => 'required|numeric|min:0',
        ];
    }
}
