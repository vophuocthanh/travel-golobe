import { hoteldetail1 } from "@/assets/images";

const hotels = [
  {
    id: 1,
    name: "Superior room - 1 double bed or 2 twin beds",
    hotelClass: "CVK Park Bosphorus...",
    rating: 4.2,
    reviews: 54,
    image: hoteldetail1, 
  },
  
];

export default function TourBook() {
  return (
    <div>
    <div>
        {hotels.map((hotel) => (
          <div key={hotel.id} className="flex items-center mb-4">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="object-cover h-20 rounded-md w-25"
            />
            <div className="ml-4">
              <p className="text-gray-500">{hotel.hotelClass}</p>
              <h2 className="text-xl font-semibold">{hotel.name}</h2>
              <div className="flex items-center mt-3">
                <p className="flex items-center justify-center h-[2.5rem] text-xs font-medium border rounded w-[3.5rem] border-primary">
                  {hotel.rating}
                </p>
                <span className="ml-2 text-lg">Very Good</span>
                <span className="ml-1 text-lg text-gray-500">({hotel.reviews} reviews)</span>
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
