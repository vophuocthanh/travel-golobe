import { room1, room2, room3, room4 } from "@/assets/images";
import { Button } from "@/components/ui/button";

export default function HotelDetailRoom() {
  return (
    <div className="flex w-full mt-5">
      <div className="w-full">
        <div>
          <hr className="my-8 border-2 border-gray " />
        </div>
        <h1 className="mb-4 text-2xl font-semibold ">Available Rooms</h1>
        <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center">
                    <img src={room1} alt="Superior room" className="object-cover w-20 h-20 rounded-md"/>
                    <div className="ml-4">
                        <h1 className="text-lg">Superior room - 1 double bed or 2 twin beds</h1>
                    </div>
                </div>
                <div className="flex items-center gap-[3rem] text-right">
                    <div className="flex items-end">
                      <p className="text-3xl font-semibold">$240/</p>
                      <p>night</p>
                    </div>
                    <Button className="px-4 py-2 mt-2 text-black rounded-md w-[7rem] h-[3rem]">Book now</Button>
                </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center">
                    <img src={room2} alt="Superior room - City view" className="object-cover w-20 h-20 rounded-md"/>
                    <div className="ml-4">
                        <h1 className="text-lg">Superior room - City view - 1 double bed or 2 twin beds</h1>
                    </div>
                </div>
                <div className="flex items-center gap-[3rem] text-right">
                    <div className="flex items-end">
                      <p className="text-3xl font-semibold">$280/</p>
                      <p>night</p>
                    </div>
                    <Button className="px-4 py-2 mt-2 text-black rounded-md w-[7rem] h-[3rem]">Book now</Button>
                </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center">
                    <img src={room3} alt="Superior room - City view" className="object-cover w-20 h-20 rounded-md"/>
                    <div className="ml-4">
                        <h1 className="text-lg">Superior room - City view - 1 double bed or 2 twin beds</h1>
                    </div>
                </div>
                <div className="flex items-center gap-[3rem] text-right">
                    <div className="flex items-end">
                      <p className="text-3xl font-semibold">$320/</p>
                      <p>night</p>
                    </div>
                    <Button className="px-4 py-2 mt-2 text-black rounded-md w-[7rem] h-[3rem]">Book now</Button>
                </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center">
                    <img src={room4} alt="Superior room - City view" className="object-cover w-20 h-20 rounded-md"/>
                    <div className="ml-4">
                        <h1 className="text-lg">Superior room - City view - 1 double bed or 2 twin beds</h1>
                    </div>
                </div>
                <div className="flex items-center gap-[3rem] text-right">
                    <div className="flex items-end">
                      <p className="text-3xl font-semibold">$350/</p>
                      <p>night</p>
                    </div>
                    <Button className="px-4 py-2 mt-2 text-black rounded-md w-[7rem] h-[3rem]">Book now</Button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
