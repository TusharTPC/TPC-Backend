import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

export const generateId = (): string => {
  return uuidv4();
};

export const validateSchema = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors.map(err => err.message).join(', '));
    }
    throw error;
  }
};

export const logger = {
  info: (message: string, data?: unknown) => {
    console.log(`[INFO] ${message}`, data || '');
  },
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] ${message}`, error || '');
  },
  warn: (message: string, data?: unknown) => {
    console.warn(`[WARN] ${message}`, data || '');
  },
};

export const getCurrentTimestamp = (): Date => {
  return new Date();
};