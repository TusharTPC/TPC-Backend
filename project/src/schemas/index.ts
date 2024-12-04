import { z } from 'zod';
import * as baseSchemas from './base-schemas';
import { createValidator } from '../validation';

// Create validators based on configuration
const validatorType = process.env.VALIDATOR_TYPE as 'zod' | 'basic' || 'zod';
const validator = createValidator(validatorType);

// TODO: Create schema validators
// Example:
// export const userValidator = validator.createValidator(
//   validatorType === 'zod' 
//     ? zodUserSchema 
//     : baseSchemas.userSchemaRules
// );