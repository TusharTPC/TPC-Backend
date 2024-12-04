import { Vehicle, VehicleSchema, ValidationError } from '../types';
import { store } from '../store';
import { generateId, validateSchema, getCurrentTimestamp } from '../utils';

export class VehicleService {
  static registerVehicle(vehicleData: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>): Vehicle {
    const timestamp = getCurrentTimestamp();
    const vehicle: Vehicle = {
      id: generateId(),
      ...vehicleData,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    try {
      validateSchema(VehicleSchema, vehicle);
      store.addVehicle(vehicle);
      return vehicle;
    } catch (error) {
      if (error instanceof Error) {
        throw new ValidationError(`Failed to register vehicle: ${error.message}`);
      }
      throw error;
    }
  }

  static getUserVehicles(userId: string): Vehicle[] {
    return store.getUserVehicles(userId);
  }
}