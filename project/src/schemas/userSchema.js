import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number format')
});