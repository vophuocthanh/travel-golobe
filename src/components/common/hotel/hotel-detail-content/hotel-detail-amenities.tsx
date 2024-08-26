import { IconBar, IconBell, IconEat, IconGym, IconPool, IconSpa, IconTea, IconWifi } from "@/common/icons";

export default function HotelDetailAmenities() {
  return (
    <div className="flex w-full mt-5">
      <div className="w-full">
        <div>
          <hr className="my-8 border-2 border-gray " />
        </div>
        <h1 className="mb-4 text-2xl font-semibold ">Amenities</h1>
        <div className="grid grid-cols-3 gap-4 text-black">
            <div>
                <p className="flex items-center gap-3 mb-5">
                    <IconPool/>
                    Outdoor pool
                </p>
                <p className="flex items-center gap-3 mb-5">
                    <IconPool/>
                    Indoor pool
                </p>
                <p className="flex items-center gap-3 mb-5">
                    <IconSpa/>
                    Spa and wellness center
                </p>
                <p className="flex items-center gap-3 mb-5">
                    <IconEat/>
                    Restaurant
                </p>
                <p className="flex items-center gap-3 mb-5">
                    <IconBell/>
                    Room service
                </p>
            </div>
            <div>
                <p className="flex items-center gap-3 mb-5">
                    <IconGym/>
                    Fitness center
                </p>
                <p className="flex items-center gap-3 mb-5">
                    <IconBar/>
                    Bar/Lounge
                </p>
                <p className="flex items-center gap-3 mb-5">
                    <IconWifi/>
                    Free Wi-Fi
                </p>
                <p className="flex items-center gap-3 mb-5">
                    <IconTea/>
                    Tea/coffee machine
                </p>
                <p className="flex items-center text-red-600">
                    +24 more
                </p>
            </div>
        </div>
      </div>
    </div>
  )
}
