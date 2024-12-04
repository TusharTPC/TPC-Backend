import express from 'express';
import asyncHandler from 'express-async-handler';
import { VehicleController } from '../controllers/vehicleController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { VehicleSchema } from '../schemas/vehicleSchema.js';

export const vehicleRouter = express.Router();

vehicleRouter.post('/',
  validateRequest(VehicleSchema),
  asyncHandler(VehicleController.registerVehicle)
);

vehicleRouter.get('/user/:userId',
  asyncHandler(VehicleController.getUserVehicles)
);