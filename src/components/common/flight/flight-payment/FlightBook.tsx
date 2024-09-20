import { flight_pay } from "@/assets/images";

const flights = [
  {
    id: 1,
    name: "Emirates A380 Airbus",
    flightClass: "Economy",
    rating: 4.2,
    reviews: 54,
    image: flight_pay, 
  },
  {
    id: 2,
    name: "Qatar Airways Boeing 777",
    flightClass: "Business",
    rating: 4.7,
    reviews: 120,
    image: flight_pay, 
  },

];

export default function FlightBook() {
  return (
    <div>
    <div>
        {flights.map((flight) => (
          <div key={flight.id} className="flex items-center mb-4">
            <img
              src={flight.image}
              alt={flight.name}
              className="object-cover rounded-md w-30 h-30"
            />
            <div className="ml-4">
              <p className="text-gray-500">{flight.flightClass}</p>
              <h2 className="text-xl font-semibold">{flight.name}</h2>
              <div className="flex items-center mt-3">
                <p className="flex items-center justify-center h-[2.5rem] text-xs font-medium border rounded w-[3.5rem] border-primary">
                  {flight.rating}
                </p>
                <span className="ml-2 text-lg">Very Good</span>
                <span className="ml-1 text-lg text-gray-500">({flight.reviews} reviews)</span>
              </div>
            </div>
          </div>
        ))}
    </div>
    <div className="my-4 border-t"></div>
    <p className="text-lg text-gray-600">
      Your booking is protected by <span className="font-bold text-black">golobe</span>
    </p>
    <div className="my-4 border-t"></div>
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Price Details</h3>
      <div className="flex justify-between mt-2">
        <p className="text-lg text-gray-500">Base Fare</p>
        <p className="text-lg font-semibold">$400</p>
      </div>
      <div className="flex justify-between mt-2">
        <p className="text-lg text-gray-500">Discount</p>
        <p className="text-lg font-semibold">$400</p>
      </div>
      <div className="flex justify-between mt-2">
        <p className="text-lg text-gray-500">Taxes</p>
        <p className="text-lg font-semibold">$400</p>
      </div>
      <div className="flex justify-between mt-2">
        <p className="text-lg text-gray-500">Service Fee</p>
        <p className="text-lg font-semibold">$400</p>
      </div>
      <div className="mt-4 border-t"></div>
      <div className="flex justify-between mt-4">
        <p className="text-lg font-semibold">Total</p>
        <p className="text-lg font-bold">$400</p>
      </div>
    </div>
    </div>
  )
}
