<?php
class ValidationMiddleware {

    private static $rules = [
        'user' => [
            'email' => ['required', 'email'],
            'password' => ['required', 'min:8'],
            'role' => ['required', 'in:admin,user']
        ],
        'category' => [
            'categoryName' => ['required', 'string', 'max:255']
        ],
        'claimRequest' => [
            'userID' => ['required', 'integer'],
            'foundID' => ['required', 'integer'],
            'status' => ['in:Pending,Approved,Rejected']
        ],
        'foundItem' => [
            'itemName' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'categoryID' => ['required', 'integer'],
            'userID' => ['required', 'integer']
        ],
        'lostItem' => [
            'itemName' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'categoryID' => ['required', 'integer'],
            'userID' => ['required', 'integer']
        ]
    ];

    public static function validate($entityType, $data) {
        if (!isset(self::$rules[$entityType])) {
            return true;
        }

        $errors = [];
        foreach (self::$rules[$entityType] as $field => $validations) {
            foreach ($validations as $validation) {
                $error = self::applyValidation($field, $validation, $data);
                if ($error) {
                    $errors[$field][] = $error;
                }
            }
        }

        if (!empty($errors)) {
            Flight::json(['errors' => $errors], 400);
            exit;
        }
    }

    private static function applyValidation($field, $validation, $data) {
        $value = $data[$field] ?? null;

        if (strpos($validation, 'required') !== false && empty($value)) {
            return "The $field field is required.";
        }

        if ($validation === 'email' && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
            return "The $field must be a valid email address.";
        }

        if (strpos($validation, 'min:') === 0 && strlen($value) < (int)substr($validation, 4)) {
            $min = substr($validation, 4);
            return "The $field must be at least $min characters.";
        }

        if (strpos($validation, 'max:') === 0 && strlen($value) > (int)substr($validation, 4)) {
            $max = substr($validation, 4);
            return "The $field may not be greater than $max characters.";
        }

        if ($validation === 'integer' && !is_numeric($value)) {
            return "The $field must be an integer.";
        }

        if (strpos($validation, 'in:') === 0) {
            $allowed = explode(',', substr($validation, 3));
            if (!in_array($value, $allowed)) {
                return "The $field must be one of: " . implode(', ', $allowed);
            }
        }

        return null;
    }
}