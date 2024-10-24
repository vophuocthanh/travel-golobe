import { hoteldetail1 } from "@/assets/images";
import { IconHotelpay } from "@/common/icons";
import { HotelBookingResponse } from "@/shared/ts/interface/booking-hotel.interface";
import { MapPin, MoveLeft, MoveRight } from "lucide-react";

interface hotelBookingType {
  hotel: HotelBookingResponse
}

export default function HotelInfo({ hotel }: hotelBookingType) {
  const formatCurrency = (value: string | undefined) => {
    if (!value) return 'N/A'
    const numberValue = parseFloat(value)
    return isNaN(numberValue)
      ? 'N/A'
      : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(numberValue)
  }
  return (
    <div className="gap-6 ">
      <div key={hotel.id} className="mb-6 ">
        <div className="flex items-center justify-between mb-4 ">
          <h2 className="text-3xl font-semibold">{hotel.status}</h2>
          <h2 className="text-2xl font-bold text-red-500">{formatCurrency(hotel.price?.toString())}</h2>
        </div>

        <div className="p-4 border rounded-lg bg-gray-50 dark:border dark:border-white dark:bg-slate-900 dark:text-white">
          <div className="flex items-center space-x-4">
            <img
              src={hoteldetail1}
              alt={hotel.hotel_names}
              className="object-cover w-16 h-16 rounded-md"
            />
            <div>
              <h3 className="text-lg font-semibold">{hotel.hotel_names}</h3>
              <div className="flex">
                <MapPin className='w-4 h-4 mr-2 text-black dark:text-white' />
                <p className="text-sm text-gray-500">{hotel.location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-center">
            <p className="font-medium text-md">{hotel.received_time}</p>
            <p className="text-sm text-gray-500">Check-In</p>
            <p className="font-medium text-md">{hotel.checkInDate}</p>
          </div>
          <div className="flex items-center space-x-6">
            <MoveLeft className="w-11 h-11" style={{ strokeWidth: 0.5 }} />
            <div className="flex justify-center w-10">
              <IconHotelpay />
            </div>
            <MoveRight className="w-11 h-11" style={{ strokeWidth: 0.5 }} />
          </div>
          <div className="text-center">
            <p className="font-medium text-md">{hotel.giveback_time}</p>
            <p className="text-sm text-gray-400">Check-Out</p>
            <p className="font-medium text-md">{hotel.checkOutDate}</p>
          </div>
        </div>
        <hr className="w-full mt-2 border-black border-1" />
      </div>
    </div>
  );
}
