import {
  Ride,
  RideRequest,
  Location,
  RideSchema,
  RideRequestSchema,
  ValidationError
} from '../types';
import { store } from '../store';
import { generateId, validateSchema, getCurrentTimestamp } from '../utils';

export class RideService {
  static offerRide(
    driverId: string,
    vehicleId: string,
    origin: Location,
    destination: Location,
    departureTime: Date,
    availableSeats: number,
    price: number
  ): Ride {
    const timestamp = getCurrentTimestamp();
    const ride: Ride = {
      id: generateId(),
      driverId,
      vehicleId,
      origin,
      destination,
      departureTime,
      availableSeats,
      price,
      status: 'pending',
      passengers: [],
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    try {
      validateSchema(RideSchema, ride);
      store.addRide(ride);
      return ride;
    } catch (error) {
      if (error instanceof Error) {
        throw new ValidationError(`Failed to create ride: ${error.message}`);
      }
      throw error;
    }
  }

  static requestRide(
    userId: string,
    origin: Location,
    destination: Location,
    preferredTime: Date,
    passengers: number
  ): RideRequest {
    const timestamp = getCurrentTimestamp();
    const request: RideRequest = {
      id: generateId(),
      userId,
      origin,
      destination,
      preferredTime,
      passengers,
      status: 'pending',
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    try {
      validateSchema(RideRequestSchema, request);
      store.addRideRequest(request);
      return request;
    } catch (error) {
      if (error instanceof Error) {
        throw new ValidationError(`Failed to create ride request: ${error.message}`);
      }
      throw error;
    }
  }

  static bookRide(rideId: string, userId: string): boolean {
    const ride = store.getRide(rideId);
    
    if (ride.status !== 'pending') {
      throw new ValidationError('Ride is not available for booking');
    }

    if (ride.availableSeats <= 0) {
      throw new ValidationError('No seats available');
    }

    if (ride.passengers.includes(userId)) {
      throw new ValidationError('User already booked this ride');
    }

    ride.passengers.push(userId);
    ride.availableSeats--;
    ride.updatedAt = getCurrentTimestamp();
    
    if (ride.availableSeats === 0) {
      ride.status = 'active';
    }
    
    store.updateRide(ride);
    return true;
  }

  static completeRide(rideId: string): boolean {
    const ride = store.getRide(rideId);
    
    if (ride.status !== 'active') {
      throw new ValidationError('Only active rides can be completed');
    }

    ride.status = 'completed';
    ride.updatedAt = getCurrentTimestamp();
    store.updateRide(ride);
    return true;
  }

  static findAvailableRides(): Ride[] {
    return store.getAvailableRides();
  }

  static findMatchingRides(request: RideRequest): Ride[] {
    const availableRides = this.findAvailableRides();
    const timeWindow = 3600000; // 1 hour in milliseconds

    return availableRides.filter(ride => {
      const sameCity = 
        ride.origin.city === request.origin.city &&
        ride.destination.city === request.destination.city;
      
      const timeMatch = Math.abs(
        ride.departureTime.getTime() - request.preferredTime.getTime()
      ) <= timeWindow;

      const enoughSeats = ride.availableSeats >= request.passengers;

      return sameCity && timeMatch && enoughSeats;
    });
  }
}