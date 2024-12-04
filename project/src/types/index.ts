// Type definitions for the ride-sharing application
import { z } from 'zod';

// TODO: Implement validation schemas for:
// - Location (address, city)
// - User (name, email, phone)
// - Vehicle (make, model, year, etc.)
// - Ride (origin, destination, seats, etc.)
// - RideRequest (userId, origin, destination, etc.)

// Basic type definitions
export interface Location {
  address: string;
  city: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vehicle {
  id: string;
  ownerId: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  seats: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Ride {
  id: string;
  driverId: string;
  vehicleId: string;
  origin: Location;
  destination: Location;
  departureTime: Date;
  availableSeats: number;
  price: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  passengers: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RideRequest {
  id: string;
  userId: string;
  origin: Location;
  destination: Location;
  preferredTime: Date;
  passengers: number;
  status: 'pending' | 'matched' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

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