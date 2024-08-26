import { hoteldetailmap } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export default function HotelDetailMap() {
  return (
    <div className="flex w-full mt-5">
      <div className="w-full">
        <div>
          <hr className="my-8 border-2 border-gray " />
        </div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="mb-2 text-2xl font-semibold">Location/Map</h1>
          <Button className="px-4 py-2 text-black rounded-md w-[12rem] h-[3rem]">View on google maps</Button>
        </div>
        <img src={hoteldetailmap} alt="HotelMap" className="object-cover w-full rounded-md" />
        <div className="mt-3">
            <p className="flex text-gray-500 text-md">
              <MapPin className="w-4 h-4 mr-2 text-black" />
              Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437
            </p>
        </div>
      </div>
    </div>
  )
}
