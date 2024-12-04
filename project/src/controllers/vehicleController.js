import { VehicleService } from '../services/vehicleService.js';

export class VehicleController {
  static async registerVehicle(req, res) {
    const vehicle = await VehicleService.registerVehicle(req.body);
    res.status(201).json(vehicle);
  }

  static async getUserVehicles(req, res) {
    const vehicles = await VehicleService.getUserVehicles(req.params.userId);
    res.json(vehicles);
  }
}