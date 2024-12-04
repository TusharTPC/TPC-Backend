import { z } from 'zod';

// Validation schemas
export const LocationSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
});

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number format'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const VehicleSchema = z.object({
  id: z.string().uuid(),
  ownerId: z.string().uuid(),
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  color: z.string().min(1, 'Color is required'),
  licensePlate: z.string().min(1, 'License plate is required'),
  seats: z.number().min(1).max(10),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const RideSchema = z.object({
  id: z.string().uuid(),
  driverId: z.string().uuid(),
  vehicleId: z.string().uuid(),
  origin: LocationSchema,
  destination: LocationSchema,
  departureTime: z.date(),
  availableSeats: z.number().min(1),
  price: z.number().min(0),
  status: z.enum(['pending', 'active', 'completed', 'cancelled']),
  passengers: z.array(z.string().uuid()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const RideRequestSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  origin: LocationSchema,
  destination: LocationSchema,
  preferredTime: z.date(),
  passengers: z.number().min(1),
  status: z.enum(['pending', 'matched', 'cancelled']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Type definitions
export type Location = z.infer<typeof LocationSchema>;
export type User = z.infer<typeof UserSchema>;
export type Vehicle = z.infer<typeof VehicleSchema>;
export type Ride = z.infer<typeof RideSchema>;
export type RideRequest = z.infer<typeof RideRequestSchema>;

// Custom error types
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}