import { hoteldetail1, hoteldetail2, hoteldetail3, hoteldetail4, hoteldetail5 } from "@/assets/images";
import { IconLink, IconStart } from "@/common/icons";
import { Footer, Header } from "@/components/common";
import SectionInViewRight from "@/components/common/animation/SectionInViewRight";
import HotelDetailAmenities from "@/components/common/hotel/hotel-detail-content/hotel-detail-amenities";
import HotelDetailMap from "@/components/common/hotel/hotel-detail-content/hotel-detail-map";
import HotelDetailOverview from "@/components/common/hotel/hotel-detail-content/hotel-detail-overview";
import HotelDetailReview from "@/components/common/hotel/hotel-detail-content/hotel-detail-review";
import HotelDetailRoom from "@/components/common/hotel/hotel-detail-content/hotel-detail-room";
import { Button } from "@/components/ui/button";
import { ChevronRight, HeartIcon, MapPin } from "lucide-react";
import { useState } from "react";

export default function HotelDetail() {
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    setLiked(!liked);
  };  
  return (
    <div className="w-full">
      <Header/>
      <SectionInViewRight>
      <main className="pt-20 px-[5rem]">
        <div className="flex items-center space-x-4">
        <div className="items-start flex-1 w-full mt-8 mb-8">
          <div className="flex items-center space-x-2 text-gray-800 text-md">
            <p className="text-red-400">Turkey</p>
            <ChevronRight className="w-4 h-4" />
            <p className="text-red-400">Istanbul</p>
            <ChevronRight className="w-4 h-4" />
            <p>CVK Park Bosphorus Hotel Istanbul</p>
          </div>
          <div className="flex mt-8 ">
            <h1 className="mr-5 text-3xl font-bold">CVK Park Bosphorus Hotel Istanbul</h1> 
            <div className="flex items-center mt-2">
              <IconStart/><IconStart/><IconStart/><IconStart/><IconStart/>
              <span className="mt-1 ml-2">5 Star Hotel</span>
            </div>
          </div>
          <div className="mt-5">
            <p className="flex text-gray-500 text-md">
              <MapPin className="w-4 h-4 mr-2 text-black" />
              Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437
            </p>
            <div className='flex items-center gap-2 mt-5'>
              <Button className='bg-white border border-primary'>4.2</Button>
              <p className='font-bold'>Very good</p>
              <p>371 reviews</p>
            </div>
          </div>
        </div>
        <div className="flex-1 text-right">
          <p className='text-[32px] font-bold text-[#FF8682]'>$240</p>
          <div className='flex justify-end space-x-2'>
            <p className='flex items-center justify-center w-10 h-10 text-xs font-medium transition-colors border rounded cursor-pointer border-primary'
            onClick={handleClick}>
            <HeartIcon className={`w-4 h-4 ${liked ? 'text-red-600' : ''}`}/>
            </p>
            <p className='flex items-center justify-center w-10 h-10 text-xs font-medium transition-colors border rounded cursor-pointer border-primary'>
            <IconLink/>
            </p>
            <Button>Book now</Button>
          </div>
        </div>
        </div>
        <div className="items-start w-full mt-5 mb-8">
          <div className="grid w-full grid-cols-4 gap-4">
            <div className="grid w-full col-span-2">
                <img src={hoteldetail1} alt="hotel" className="w-full h-[41rem]"/>
            </div>
            <div className="grid col-span-1 gap-4">
                <img src={hoteldetail2} alt="hotel" className="w-full h-[20rem]" />
                <img src={hoteldetail5} alt="hotel" className="w-full h-[20rem]"/>
            </div>
            <div className="grid col-span-1 gap-4">
                <img src={hoteldetail3} alt="hotel" className="w-full h-[20rem]"/>
                <img src={hoteldetail4} alt="hotel" className="w-full h-[20rem]"/>
            </div>
          </div>
        </div>
        <HotelDetailOverview/>
        <HotelDetailRoom/>
        <HotelDetailMap/>
        <HotelDetailAmenities/>
        <HotelDetailReview/>
      </main>
      </SectionInViewRight>
      <div className="mt-[15rem] bottom-0">
        <Footer />
      </div>
    </div>
  )
}
