import { ValidationError } from '../utils/errors.js';

export const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    next(new ValidationError(error.errors.map(err => err.message).join(', ')));
  }
};