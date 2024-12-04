import express from 'express';
import asyncHandler from 'express-async-handler';
import { RideController } from '../controllers/rideController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { RideSchema, RideRequestSchema } from '../schemas/rideSchema.js';

export const rideRouter = express.Router();

rideRouter.post('/offer',
  validateRequest(RideSchema),
  asyncHandler(RideController.offerRide)
);

rideRouter.post('/request',
  validateRequest(RideRequestSchema),
  asyncHandler(RideController.requestRide)
);

rideRouter.post('/:id/book',
  asyncHandler(RideController.bookRide)
);

rideRouter.post('/:id/complete',
  asyncHandler(RideController.completeRide)
);

rideRouter.get('/available',
  asyncHandler(RideController.getAvailableRides)
);

rideRouter.get('/matching/:requestId',
  asyncHandler(RideController.findMatchingRides)
);