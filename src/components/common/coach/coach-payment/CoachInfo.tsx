import { flight_Emirates, flight_Qatar } from '@/assets/images';
import { IconFlight } from '@/common/icons';
import { MoveLeft, MoveRight, Plane, RockingChair, Timer, UtensilsCrossed, Wifi } from 'lucide-react';

const flights = [
  {
    id: 1,
    airline: "Emirates",  
    planeModel: "Airbus A320",
    price: "$240",
    flightTime: "2h 28m",
    departureTime: "12:00 pm",
    departureLocation: "Newark(EWR)",
    arrivalTime: "3:00 pm",
    arrivalLocation: "Los Angeles(LAX)",
    flightLogo: flight_Emirates,
  },
  {
    id: 2,
    airline: "Qatar Airways",
    planeModel: "Boeing 777",
    price: "$350",
    flightTime: "6h 45m",
    departureTime: "8:30 am",
    departureLocation: "Doha(DOH)",
    arrivalTime: "3:15 pm",
    arrivalLocation: "New York(JFK)",
    flightLogo: flight_Qatar,
  },
];

export default function CoachInfo() {
  return (
    <div className="gap-6">
      {flights.map((flight) => (
        <div key={flight.id} className='mb-[2rem]'>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-3 text-2xl font-semibold">{flight.airline}</h2>
              <p className="font-medium text-gray-500 text-md">Return Wed, Dec 8</p>
            </div>
            <div>
              <h2 className="mb-3 text-3xl font-bold text-red-500">{flight.price}</h2>
              <p className="flex font-medium text-md">{flight.flightTime}</p>
            </div>
          </div>

          <div className="flex items-center justify-between my-4">
            <div className="flex items-center px-8 py-4 space-x-6 border rounded-lg">
              <img src={flight.flightLogo} alt="" className="w-16" />
              <div>
                <p className="text-2xl font-bold">{flight.airline}</p>
                <p className="text-sm font-medium text-gray-500">{flight.planeModel}</p>
              </div>
            </div>

            <div className="flex items-center p-6">
              <div className="flex items-center space-x-6">
                <Plane className="w-6 h-6" />
                <span className="h-6 border-l border-gray-400"></span>
                <Wifi className="w-6 h-6" />
                <span className="h-6 border-l border-gray-400"></span>
                <Timer className="w-6 h-6" />
                <span className="h-6 border-l border-gray-400"></span>
                <UtensilsCrossed className="w-6 h-6" />
                <span className="h-6 border-l border-gray-400"></span>
                <RockingChair className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-20">
            <div className="flex items-center space-x-4">
              <p className="text-2xl font-semibold">{flight.departureTime}</p>
              <p className="text-base font-medium">{flight.departureLocation}</p>
            </div>

            <div className="flex items-center space-x-4">
              <MoveLeft className="w-11 h-11" style={{ strokeWidth: 0.5 }} />
              <div className="flex justify-center w-10">
                <IconFlight />
              </div>
              <MoveRight className="w-11 h-11" style={{ strokeWidth: 0.5 }} />
            </div>

            <div className="flex items-center space-x-4">
              <p className="text-2xl font-semibold">{flight.arrivalTime}</p>
              <p className="text-base font-medium">{flight.arrivalLocation}</p>
            </div>
          </div>
          <hr className="w-full mt-2 border-black border-1" />
        </div>
      ))}
    </div>
  );
}
