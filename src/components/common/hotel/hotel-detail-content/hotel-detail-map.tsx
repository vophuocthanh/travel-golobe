import { hotelApi } from "@/apis/hotel.api";
import { hoteldetailmap } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { MapPin } from "lucide-react";
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next'

export default function HotelDetailMap() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()

  const { data: getbyId } = useQuery({
    queryKey: ['getById', id],
    queryFn: () => hotelApi.getById(id)
  })

  return (
    <div className="flex w-full mt-5">
      <div className="w-full">
        <div>
          <hr className="my-8 border-2 border-gray " />
        </div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="mb-2 text-2xl font-semibold">{t('LocationMap')}</h1>
          <Button className="px-4 py-2 text-white rounded-md w-[12rem] h-[3rem]">{t('Viewon')}</Button>
        </div>
        <img src={hoteldetailmap} alt="HotelMap" className="object-cover w-full rounded-md" />
        <div className="mt-3">
          <p className="flex items-center text-gray-500 text-md">
            <MapPin className="w-4 h-4 mr-2 text-black" />
            {getbyId?.location}
          </p>
        </div>
      </div>
    </div>
  )
}
