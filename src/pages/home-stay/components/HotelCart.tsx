import React from 'react'
import { Button } from '@/components/ui/button'
import { Coffee, Heart, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import BasicRating from './StarRating'
import { useQuery } from '@tanstack/react-query'
import { hotelApi } from '@/apis/hotel.api'

interface HotelCardProps {
  isFavorite: boolean
  onFavoriteToggle: () => void
}

interface Item {
  id?: string
  name: string
  address: string
  create_at?: string
  update_at?: string
  evaluate?: string
  price: string
  description: string
  images: string
  image_two?: string
  image_three?: string
  image_four?: string
}

const HotelCard: React.FC<HotelCardProps> = ({ isFavorite, onFavoriteToggle }) => {

  const { data: getAll } = useQuery({
    queryKey: ['getAllHotel'],
    queryFn: () => hotelApi.getAll(1, 4)
  })

  return (
    <>
      {getAll?.data.map((item: Item) => (
        <div key={item.id} className='flex w-full h-[20rem] rounded-xl overflow-hidden'>
          <div className='w-[35%] bg-blue-300 flex-3 relative'>
            <img src={item.images} alt='Hotel' className='object-cover w-full h-full' />
            <p className='h-9 w-[5rem] bg-gray-200 rounded-lg flex justify-center items-center absolute top-3 right-2'>
              9 images
            </p>
          </div>
          <div className='w-[65%] flex-7 h-full pl-4 bg-[#FFFFFF]'>
            <div className='flex flex-col w-full h-full'>
              <div className='w-full h-[75%] border-b-2 border-gray-400'>
                <div className='flex flex-row w-full h-full'>
                  <div className='w-[70%] flex flex-col gap-4'>
                    <p className='pt-4 text-3xl'>{item.name}</p>
                    <p className='flex text-gray-500 text-md'>
                      <MapPin className='w-4 h-4 text-black' />
                      {item.address}
                    </p>
                    <div className='flex gap-2'>
                      <BasicRating />
                      <div className='flex gap-1'>
                        <p className='font-bold'>20+</p>
                        <Coffee className='font-bold text-black' />
                        <p>Aminities</p>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Button className='bg-white border border-primary'>4.2</Button>
                      <p className='font-bold'>Very good</p>
                      <p>371 reviews</p>
                    </div>
                  </div>
                  <div className='w-[30%] pt-4'>
                    <p className='text-sm'>starting from</p>
                    <p className='text-3xl text-[#FF8682] font-bold'>${item.price} / night</p>
                    <p className='mr-3 text-right text-gray-400'>excl. tax</p>
                  </div>
                </div>
              </div>
              <div className='w-full h-[25%] flex'>
                <div className='flex flex-row items-center justify-center w-full gap-4'>
                  <Button
                    className={isFavorite ? 'bg-white border border-primary' : 'bg-primary text-white'}
                    onClick={onFavoriteToggle}
                  >
                    <Heart />
                  </Button>
                  <Link to={`/hotel/${item.id}`} className='w-full'>
                    <Button className='w-full mx-4'>View Place</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default HotelCard
