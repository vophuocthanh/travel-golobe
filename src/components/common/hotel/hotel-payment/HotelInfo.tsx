import { bookingHotelApi } from "@/apis/booking-hotel.api";
import { hoteldetail1 } from "@/assets/images";
import { IconHotelpay } from "@/common/icons";
import { useQuery } from "@tanstack/react-query";
import { MapPin, MoveLeft, MoveRight } from "lucide-react";
import { useParams } from "react-router-dom";



export default function HotelInfo() {
  const { id } = useParams()

  const { data: hotels } = useQuery({
    queryKey: ['getById', id],
    queryFn: () => bookingHotelApi.getByIdBookingHotel(id || ''),
  });
  return (
    <div className="gap-6">
      <div key={hotels?.id} className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-semibold">hotel.roomType</h2>
          <h2 className="text-2xl font-bold text-red-500">{hotels?.price}</h2>
        </div>

        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="flex items-center space-x-4">
            <img
              src={hoteldetail1}
              alt={hotels?.hotel_names}
              className="object-cover w-16 h-16 rounded-md"
            />
            <div>
              <h3 className="text-lg font-semibold">{hotels?.hotel_names}</h3>
              <div className="flex">
                <MapPin className='w-4 h-4 mr-2 text-black' />
                <p className="text-sm text-gray-500">{hotels?.location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-center">
            <p className="font-medium text-md">{hotels?.received_time}</p>
            <p className="text-sm text-gray-500">Check-In</p>
          </div>
          <div className="flex items-center space-x-6">
            <MoveLeft className="w-11 h-11" style={{ strokeWidth: 0.5 }} />
            <div className="flex justify-center w-10">
              <IconHotelpay />
            </div>
            <MoveRight className="w-11 h-11" style={{ strokeWidth: 0.5 }} />
          </div>
          <div className="text-center">
            <p className="font-medium text-md">{hotels?.giveback_time}</p>
            <p className="text-sm text-gray-500">Check-Out</p>
          </div>
        </div>
        <hr className="w-full mt-2 border-black border-1" />
      </div>
    </div>
  );
}
