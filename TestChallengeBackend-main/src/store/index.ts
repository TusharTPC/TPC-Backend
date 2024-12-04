import { User, Vehicle, Ride, RideRequest, NotFoundError, ConflictError } from '../types';
import { logger } from '../utils';

class Store {
  private users: Map<string, User> = new Map();
  private vehicles: Map<string, Vehicle> = new Map();
  private rides: Map<string, Ride> = new Map();
  private rideRequests: Map<string, RideRequest> = new Map();

  // User operations
  addUser(user: User): void {
    if (this.users.has(user.id)) {
      throw new ConflictError(`User with ID ${user.id} already exists`);
    }
    
    if (Array.from(this.users.values()).some(u => u.email === user.email)) {
      throw new ConflictError(`User with email ${user.email} already exists`);
    }

    this.users.set(user.id, user);
    logger.info(`User created: ${user.id}`);
  }

  getUser(id: string): User {
    const user = this.users.get(id);
    if (!user) {
      throw new NotFoundError(`User with ID ${id} not found`);
    }
    return user;
  }

  // Vehicle operations
  addVehicle(vehicle: Vehicle): void {
    if (this.vehicles.has(vehicle.id)) {
      throw new ConflictError(`Vehicle with ID ${vehicle.id} already exists`);
    }

    // Verify owner exists
    this.getUser(vehicle.ownerId);
    
    this.vehicles.set(vehicle.id, vehicle);
    logger.info(`Vehicle registered: ${vehicle.id}`);
  }

  getVehicle(id: string): Vehicle {
    const vehicle = this.vehicles.get(id);
    if (!vehicle) {
      throw new NotFoundError(`Vehicle with ID ${id} not found`);
    }
    return vehicle;
  }

  getUserVehicles(userId: string): Vehicle[] {
    // Verify user exists
    this.getUser(userId);
    
    return Array.from(this.vehicles.values()).filter(
      (vehicle) => vehicle.ownerId === userId
    );
  }

  // Ride operations
  addRide(ride: Ride): void {
    if (this.rides.has(ride.id)) {
      throw new ConflictError(`Ride with ID ${ride.id} already exists`);
    }

    // Verify driver and vehicle exist
    this.getUser(ride.driverId);
    this.getVehicle(ride.vehicleId);

    // Check for overlapping rides
    const hasOverlap = Array.from(this.rides.values()).some(
      (existingRide) =>
        existingRide.vehicleId === ride.vehicleId &&
        existingRide.status !== 'completed' &&
        existingRide.status !== 'cancelled' &&
        Math.abs(existingRide.departureTime.getTime() - ride.departureTime.getTime()) < 3600000 // 1 hour
    );

    if (hasOverlap) {
      throw new ConflictError('Vehicle is already scheduled for a ride at this time');
    }

    this.rides.set(ride.id, ride);
    logger.info(`Ride created: ${ride.id}`);
  }

  getRide(id: string): Ride {
    const ride = this.rides.get(id);
    if (!ride) {
      throw new NotFoundError(`Ride with ID ${id} not found`);
    }
    return ride;
  }

  updateRide(ride: Ride): void {
    if (!this.rides.has(ride.id)) {
      throw new NotFoundError(`Ride with ID ${ride.id} not found`);
    }
    this.rides.set(ride.id, ride);
    logger.info(`Ride updated: ${ride.id}`);
  }

  getAvailableRides(): Ride[] {
    return Array.from(this.rides.values()).filter(
      (ride) =>
        ride.status === 'pending' &&
        ride.availableSeats > 0 &&
        ride.departureTime > new Date()
    );
  }

  // Ride request operations
  addRideRequest(request: RideRequest): void {
    if (this.rideRequests.has(request.id)) {
      throw new ConflictError(`Ride request with ID ${request.id} already exists`);
    }

    // Verify user exists
    this.getUser(request.userId);

    this.rideRequests.set(request.id, request);
    logger.info(`Ride request created: ${request.id}`);
  }

  updateRideRequest(request: RideRequest): void {
    if (!this.rideRequests.has(request.id)) {
      throw new NotFoundError(`Ride request with ID ${request.id} not found`);
    }
    this.rideRequests.set(request.id, request);
    logger.info(`Ride request updated: ${request.id}`);
  }

  getRideRequest(id: string): RideRequest {
    const request = this.rideRequests.get(id);
    if (!request) {
      throw new NotFoundError(`Ride request with ID ${id} not found`);
    }
    return request;
  }
}

export const store = new Store();