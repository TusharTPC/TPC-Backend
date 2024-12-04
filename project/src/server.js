import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler.js';
import { userRouter } from './routes/userRoutes.js';
import { vehicleRouter } from './routes/vehicleRoutes.js';
import { rideRouter } from './routes/rideRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/users', userRouter);
app.use('/api/vehicles', vehicleRouter);
app.use('/api/rides', rideRouter);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;