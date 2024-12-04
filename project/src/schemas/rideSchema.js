import { z } from 'zod';

const LocationSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required')
});

export const RideSchema = z.object({
  driverId: z.string().uuid(),
  vehicleId: z.string().uuid(),
  origin: LocationSchema,
  destination: LocationSchema,
  departureTime: z.string().transform(str => new Date(str)),
  availableSeats: z.number().min(1),
  price: z.number().min(0)
});

export const RideRequestSchema = z.object({
  userId: z.string().uuid(),
  origin: LocationSchema,
  destination: LocationSchema,
  preferredTime: z.string().transform(str => new Date(str)),
  passengers: z.number().min(1)
});