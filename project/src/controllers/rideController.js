import { RideService } from '../services/rideService.js';

export class RideController {
  static async offerRide(req, res) {
    const ride = await RideService.offerRide(req.body);
    res.status(201).json(ride);
  }

  static async requestRide(req, res) {
    const request = await RideService.requestRide(req.body);
    res.status(201).json(request);
  }

  static async bookRide(req, res) {
    const { userId } = req.body;
    const success = await RideService.bookRide(req.params.id, userId);
    res.json({ success });
  }

  static async completeRide(req, res) {
    const success = await RideService.completeRide(req.params.id);
    res.json({ success });
  }

  static async getAvailableRides(req, res) {
    const rides = await RideService.findAvailableRides();
    res.json(rides);
  }

  static async findMatchingRides(req, res) {
    const rides = await RideService.findMatchingRides(req.params.requestId);
    res.json(rides);
  }
}