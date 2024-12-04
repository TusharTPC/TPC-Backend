import { z } from 'zod';

export const VehicleSchema = z.object({
  ownerId: z.string().uuid(),
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  color: z.string().min(1, 'Color is required'),
  licensePlate: z.string().min(1, 'License plate is required'),
  seats: z.number().min(1).max(10)
});