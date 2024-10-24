import { Button } from "@/components/ui/button";
import { HotelBookingResponse } from "@/shared/ts/interface/booking-hotel.interface";

interface hotelType {
  hotel: HotelBookingResponse
  loading: boolean
  onClick?: () => void

}



export default function HotelBook({ hotel, loading, onClick }: hotelType) {

  const formatCurrency = (value: string | undefined) => {
    if (!value) return 'N/A'
    const numberValue = parseFloat(value)
    return isNaN(numberValue)
      ? 'N/A'
      : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(numberValue)
  }
  return (
    <div>
      <div>
        <div key={hotel.id} className="flex items-center mb-4 dark:border dark:border-white dark:bg-slate-900 dark:text-white">
          <img
            src={hotel.image}
            alt={hotel.hotel_names}
            className="object-cover h-20 rounded-md w-25"
          />
          <div className="ml-4">
            <p className="text-gray-500">{hotel.hotel_names}</p>
            <h2 className="text-xl font-semibold">{hotel.hotel_names}</h2>
            <div className="flex items-center mt-3">
              <p className="flex items-center justify-center h-[2.5rem] text-xs font-medium border rounded w-[3.5rem] border-primary">
                {hotel.star_number}
              </p>
              <span className="ml-2 text-lg">Very Good</span>
              <span className="ml-1 text-lg text-gray-300">({hotel.number_rating} reviews)</span>
            </div>
          </div>
        </div>
      </div>
      <div className="my-4 border-t"></div>
      <p className="text-lg text-gray-300">
        Your booking is protected by <span className="font-bold text-black dark:text-white">golobe</span>
      </p>
      <div className="my-4 border-t"></div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Price Details</h3>
        <div className="flex justify-between mt-2">
          <p className="text-lg text-gray-300">Base Fare</p>
          <p className="text-lg font-semibold">{formatCurrency(hotel.price?.toString())}</p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-lg text-gray-300">Discount</p>
          <p className="text-lg font-semibold">{formatCurrency(hotel.price?.toString())}</p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-lg text-gray-300">Taxes</p>
          <p className="text-lg font-semibold">{formatCurrency(hotel.price?.toString())}</p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-lg text-gray-300">Service Fee</p>
          <p className="text-lg font-semibold">{formatCurrency(hotel.price?.toString())}</p>
        </div>
        <div className="mt-4 border-t"></div>
        <div className="flex justify-between mt-4">
          <p className="text-lg font-semibold">Total</p>
          <p className="text-lg font-bold">{formatCurrency(hotel.price?.toString())}</p>
        </div>
      </div>
      <Button onClick={onClick} loading={loading} className='w-full mt-4'>
        Thanh toán
      </Button>
    </div>
  )
}
