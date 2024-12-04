import React, { useState } from 'react';
import { UserService } from './services/UserService';
import { VehicleService } from './services/VehicleService';
import { RideService } from './services/RideService';
import { Car } from 'lucide-react';

function App() {
  const [activeView, setActiveView] = useState<'register' | 'rides' | 'offers'>('register');

  // Demo function to showcase the services
  const runDemo = () => {
    // Register a user
    const user = UserService.register({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
    });

    // Register a vehicle
    const vehicle = VehicleService.registerVehicle({
      ownerId: user.id,
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      color: 'Silver',
      licensePlate: 'ABC123',
      seats: 4,
    });

    // Offer a ride
    const ride = RideService.offerRide(
      user.id,
      vehicle.id,
      { address: '123 Main St', city: 'New York' },
      { address: '456 Park Ave', city: 'Boston' },
      new Date(),
      3,
      50
    );

    console.log('Demo data:', { user, vehicle, ride });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">RideShare</h1>
            </div>
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveView('register')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeView === 'register'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Register
              </button>
              <button
                onClick={() => setActiveView('rides')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeView === 'rides'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Find Rides
              </button>
              <button
                onClick={() => setActiveView('offers')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeView === 'offers'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Offer Rides
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Welcome to RideShare
          </h2>
          <p className="text-gray-600 mb-4">
            A modern ride-sharing platform for connecting drivers and passengers.
          </p>
          <button
            onClick={runDemo}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Run Demo
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;