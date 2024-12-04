// Define interfaces for validation
export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: string[];
}

export interface Validator<T> {
  validate(data: unknown): ValidationResult<T>;
}

// Generic schema interface that can be implemented by different validation libraries
export interface SchemaValidator {
  createValidator<T>(schema: unknown): Validator<T>;
}