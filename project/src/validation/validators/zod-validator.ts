import { z } from 'zod';
import { SchemaValidator, Validator, ValidationResult } from '../interfaces';

export class ZodValidator implements SchemaValidator {
  createValidator<T>(schema: z.ZodSchema<T>): Validator<T> {
    return {
      validate(data: unknown): ValidationResult<T> {
        try {
          const parsed = schema.parse(data);
          return { success: true, data: parsed };
        } catch (error) {
          if (error instanceof z.ZodError) {
            return {
              success: false,
              errors: error.errors.map(err => err.message),
            };
          }
          return {
            success: false,
            errors: ['Unknown validation error'],
          };
        }
      },
    };
  }
}