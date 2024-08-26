import { IconBling } from "@/common/icons";


export default function HotelDetailOverview() {
  return (
    <div className="flex w-full mt-5">
      <div className="mx-auto">
        <div>
          <hr className="w-full my-8 border-2 border-gray" />
        </div>
        <h2 className="mb-4 text-2xl font-semibold">Overview</h2>
        <p className="mb-6 text-gray-700">
        Located in Taksim Gmsuyu, the heart of Istanbul, the CVK Park Bosphorus Hotel Istanbul has risen from the ashes of the historic Park Hotel, which also served as Foreign Affairs Palace 120 years ago and is hosting its guests by assuming this hospitality mission. With its 452 luxurious rooms and suites, 8500 m2 SPA and fitness area, 18 meeting rooms including 4 dividable ones and 3 terraces with Bosphorus view, Istanbuls largest terrace with Bosphorus view (4500 m2) and latest technology infrastructure, CVK Park Bosphorus Hotel Istanbul is destined to be the popular attraction point of the city. Room and suite categories at various sizes with city and Bosphorus view, as well as 68 separate luxury suites, are offered to its special guests as a wide variety of selection.        </p>
        <div className="grid grid-cols-8 gap-4 h-[12rem]">
            <div className="relative col-span-1 p-4 text-center rounded-lg bg-emerald-300">
                <span className="absolute flex text-4xl font-bold top-3">4.2</span>
                <p className="absolute flex text-lg font-semibold bottom-9">Very good</p>
                <p className="absolute flex bottom-4">371 reviews</p>
            </div>
            <div className="relative col-span-1 p-4 text-center border border-gray-200 rounded-lg">
              <IconBling/>
              <p className="absolute bottom-4">Near park</p>
            </div>
            <div className="relative col-span-1 p-4 text-center border border-gray-200 rounded-lg">
              <IconBling/>
              <p className="absolute bottom-4">Near nightlife</p>
            </div>
            <div className="relative col-span-1 p-4 text-center border border-gray-200 rounded-lg">
              <IconBling/>
              <p className="absolute bottom-4">Near theater</p>
            </div>
            <div className="relative col-span-1 p-4 text-center border border-gray-200 rounded-lg">
              <IconBling/>
              <p className="absolute bottom-4">Clean Hotel</p>
            </div>
        </div>
      </div>
    </div>
  )
}
