import { ValidationError, NotFoundError, ConflictError } from '../utils/errors.js';

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: err.message });
  }

  if (err instanceof ConflictError) {
    return res.status(409).json({ error: err.message });
  }

  return res.status(500).json({ error: 'Internal server error' });
};