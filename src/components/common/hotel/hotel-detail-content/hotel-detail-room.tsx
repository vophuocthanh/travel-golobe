import { room1 } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { RoomType } from "@/shared/ts/interface/roomtype";

interface Rom {
  Room: RoomType[]
}
export default function HotelDetailRoom({ Room }: Rom) {
  const formatCurrency = (value: string | undefined) => {
    if (!value) return 'N/A'
    const numberValue = parseFloat(value)
    return isNaN(numberValue)
      ? 'N/A'
      : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(numberValue)
  }
  return (
    <div className="flex w-full mt-5">
      <div className="w-full">
        <div>
          <hr className="my-8 border-2 border-gray " />
        </div>
        <h1 className="mb-4 text-2xl font-semibold ">Available Rooms</h1>
        <div className="space-y-4">
          {Room.map((item: RoomType) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
              <div className="flex items-center">
                <img src={room1} alt="Superior room" className="object-cover w-20 h-20 rounded-md" />
                <div className="ml-4">
                  <h1 className="text-lg">{item.type}</h1>
                </div>
              </div>
              <div className="flex items-center gap-[3rem] text-right">
                <div className="flex items-end">
                  <p className="text-3xl font-semibold">{formatCurrency(item.pricePerDay.toString())}</p>
                </div>
                <Button className="px-4 py-2 mt-2 text-black rounded-md w-[7rem] h-[3rem]">Book now</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
