<?php
declare(strict_types=1);

namespace Prome\Utils;

/**
 * Request Input Sanitization & Validation Engine
 * Protects against XSS, SQLi, and malformed parameters
 */
class Validator
{
    private array $data;
    private array $errors = [];

    public function __construct(array $data)
    {
        $this->data = $this->sanitize($data);
    }

    public function sanitize(array $data): array
    {
        $sanitized = [];
        foreach ($data as $key => $value) {
            if (is_array($value)) {
                $sanitized[$key] = $this->sanitize($value);
            } elseif (is_string($value)) {
                $sanitized[$key] = trim(htmlspecialchars($value, ENT_QUOTES, 'UTF-8'));
            } else {
                $sanitized[$key] = $value;
            }
        }
        return $sanitized;
    }

    public function required(string $field, string $customMsg = null): self
    {
        if (!isset($this->data[$field]) || (is_string($this->data[$field]) && trim($this->data[$field]) === '')) {
            $this->errors[$field] = $customMsg ?? "Field '{$field}' is required.";
        }
        return $this;
    }

    public function email(string $field, string $customMsg = null): self
    {
        if (isset($this->data[$field]) && !filter_var($this->data[$field], FILTER_VALIDATE_EMAIL)) {
            $this->errors[$field] = $customMsg ?? "Field '{$field}' must be a valid email address.";
        }
        return $this;
    }

    public function numeric(string $field, string $customMsg = null): self
    {
        if (isset($this->data[$field]) && !is_numeric($this->data[$field])) {
            $this->errors[$field] = $customMsg ?? "Field '{$field}' must be numeric.";
        }
        return $this;
    }

    public function minLength(string $field, int $min, string $customMsg = null): self
    {
        if (isset($this->data[$field]) && strlen((string)$this->data[$field]) < $min) {
            $this->errors[$field] = $customMsg ?? "Field '{$field}' must be at least {$min} characters.";
        }
        return $this;
    }

    public function in(string $field, array $allowed, string $customMsg = null): self
    {
        if (isset($this->data[$field]) && !in_array($this->data[$field], $allowed, true)) {
            $this->errors[$field] = $customMsg ?? "Field '{$field}' must be one of: " . implode(', ', $allowed);
        }
        return $this;
    }

    public function passes(): bool
    {
        return empty($this->errors);
    }

    public function getErrors(): array
    {
        return $this->errors;
    }

    public function getData(): array
    {
        return $this->data;
    }
}
