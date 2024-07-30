import { Button } from '@/components/ui/button'
import { baku_azerbaijan } from '@/assets/images'

const fallIntroTravel = [
  { id: 1, city: 'Melbourne', title: 'An amazing journey', image: baku_azerbaijan, price: '700 $' },
  { id: 2, city: 'Paris', title: 'A Paris Adventure', image: baku_azerbaijan, price: '600 $' },
  { id: 3, city: 'London', title: 'London eye adventure', image: baku_azerbaijan, price: '380 $' },
  { id: 4, city: 'Columbia', title: 'Amazing streets', image: baku_azerbaijan, price: '200 $' }
]

export default function FallIntroTravel() {
  return (
    <div className='mt-32'>
      <div className='mx-32 '>
        <h1 className='flex items-start justify-start pt-0 mb-4 text-4xl'> Fall intro travel</h1>
        <div className='flex flex-wrap justify-between '>
          <p className='w-[970px] text-xl mb-8'>
            Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the
            travel tools to get you to your destination.
          </p>
          <Button className='text-black bg-white border border-primary'>See All</Button>
        </div>
        <div className='flex flex-wrap justify-between'>
          {fallIntroTravel.map((travel) => (
            <div
              key={travel.id}
              className='relative flex flex-col justify-end h-[30rem] p-4 bg-center bg-cover w-[18rem] rounded-lg'
              style={{ backgroundImage: `url(${travel.image})` }}
            >
              <div className='absolute inset-x-0 bottom-0 rounded-b-lg h-1/3 bg-gradient-to-t from-gray-900 to-transparent'></div>

              <div className='relative flex justify-between w-full gap-4 mb-4'>
                <div className='flex flex-col items-end'>
                  <p className='w-full text-3xl font-semibold text-white'>{travel.city}</p>
                  <p className='w-full text-gray-300'>{travel.title}</p>
                </div>
                <p className='flex items-center justify-center text-3xl text-white'>{travel.price}</p>
              </div>

              <Button className='relative hover:bg-white hover:border-spacing-3'>Book a Hotel</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
