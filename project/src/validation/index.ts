import { SchemaValidator } from './interfaces';
import { ZodValidator } from './validators/zod-validator';
import { BasicValidator } from './validators/basic-validator';

// Factory to create the appropriate validator
export function createValidator(type: 'zod' | 'basic'): SchemaValidator {
  switch (type) {
    case 'zod':
      return new ZodValidator();
    case 'basic':
      return new BasicValidator();
    default:
      throw new Error(`Unsupported validator type: ${type}`);
  }
}

// Export interfaces and types
export * from './interfaces';