import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import SectionInViewUp from '../../animation/SectionInViewUp'
import { useQuery } from '@tanstack/react-query'
import { hotelApi } from '@/apis/hotel.api'


interface Travel {
  id?: string
  name: string
  address: string
  price: string
  images: string
}

export default function FallIntroTravel() {

  const { data: getAll } = useQuery({
    queryKey: ['getAllHotel'],
    queryFn: () => hotelApi.getAll(2, 4)
  })

  return (
    <SectionInViewUp>
      <div className='mt-32'>
        <div className='mx-32 '>
          <h1 className='flex items-start justify-start pt-0 mb-4 text-4xl'> Fall intro travel</h1>
          <div className='flex flex-wrap justify-between '>
            <p className='w-[970px] text-xl mb-8'>
              Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the
              travel tools to get you to your destination.
            </p>
            <Link to='/hotel/home-stay'>
              <Button className='text-black bg-white border border-primary'>See All</Button>
            </Link>
          </div>
          <div className='flex flex-wrap justify-between'>
            {getAll?.data.map((travel: Travel) => (
              <div
                key={travel.id}
                className='relative flex flex-col justify-end h-[30rem] p-4 bg-center bg-cover w-[18rem] rounded-lg'
                style={{ backgroundImage: `url(${travel.images})` }}
              >
                <div className='absolute inset-x-0 bottom-0 rounded-b-lg h-1/3 bg-gradient-to-t from-gray-900 to-transparent'></div>

                <div className='relative flex justify-between w-full gap-4 mb-4'>
                  <div className='flex flex-col items-end'>
                    <p className='w-full text-3xl font-semibold text-white'>{travel.address}</p>
                    <p className='w-full text-gray-300'>{travel.name}</p>
                  </div>
                  <p className='flex items-center justify-center text-3xl text-white'>{travel.price}</p>
                </div>

                <Button className='relative hover:bg-white hover:border-spacing-3'>Book a Hotel</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionInViewUp>
  )
}
