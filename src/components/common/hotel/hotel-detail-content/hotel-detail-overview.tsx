import { hotelApi } from "@/apis/hotel.api";
import { IconBling } from "@/common/icons";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";


export default function HotelDetailOverview() {
  const { id } = useParams<{ id: string }>()

  const { data: getbyId } = useQuery({
    queryKey: ['getById', id],
    queryFn: () => hotelApi.getById(id),
  })
  return (
    <div className="flex w-full mt-5">
      <div className="mx-auto">
        <div>
          <hr className="w-full my-8 border-2 border-gray" />
        </div>
        <h2 className="mb-4 text-2xl font-semibold">Overview</h2>
        <p className="mb-6 text-gray-700">
          {getbyId?.description}
        </p>
        <div className="grid grid-cols-8 gap-4 h-[12rem]">
          <div className="relative col-span-1 p-4 text-center rounded-lg bg-emerald-300">
            <span className="absolute flex text-4xl font-bold top-3">4.2</span>
            <p className="absolute flex text-lg font-semibold bottom-9">Very good</p>
            <p className="absolute flex bottom-4">371 reviews</p>
          </div>
          <div className="relative col-span-1 p-4 text-center border border-gray-200 rounded-lg">
            <IconBling />
            <p className="absolute bottom-4">Near park</p>
          </div>
          <div className="relative col-span-1 p-4 text-center border border-gray-200 rounded-lg">
            <IconBling />
            <p className="absolute bottom-4">Near nightlife</p>
          </div>
          <div className="relative col-span-1 p-4 text-center border border-gray-200 rounded-lg">
            <IconBling />
            <p className="absolute bottom-4">Near theater</p>
          </div>
          <div className="relative col-span-1 p-4 text-center border border-gray-200 rounded-lg">
            <IconBling />
            <p className="absolute bottom-4">Clean Hotel</p>
          </div>
        </div>
      </div>
    </div>
  )
}
