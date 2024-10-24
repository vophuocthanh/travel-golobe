import { Beer, Bell, Bone, Coffee, Dumbbell, Spade, Waves, Wifi } from 'lucide-react'

export default function HotelDetailAmenities() {
  return (
    <div className='flex w-full mt-5'>
      <div className='w-full'>
        <div>
          <hr className='my-8 border-2 border-gray ' />
        </div>
        <h1 className='mb-4 text-2xl font-semibold '>Amenities</h1>
        <div className='grid grid-cols-3 gap-4 text-black'>
          <div>
            <p className='flex items-center gap-3 mb-5 dark:text-white'>
              <Waves className='dark:text-white' />
              Outdoor pool
            </p>
            <p className='flex items-center gap-3 mb-5 dark:text-white'>
              <Waves className='dark:text-white' />
              Indoor pool
            </p>
            <p className='flex items-center gap-3 mb-5 dark:text-white'>
              <Spade className='dark:text-white' />
              Spa and wellness center
            </p>
            <p className='flex items-center gap-3 mb-5 dark:text-white'>
              <Bone className='dark:text-white' />
              Restaurant
            </p>
            <p className='flex items-center gap-3 mb-5 dark:text-white'>
              <Bell className='dark:text-white' />
              Room service
            </p>
          </div>
          <div>
            <p className='flex items-center gap-3 mb-5 dark:text-white'>
              <Dumbbell className='dark:text-white' />
              Fitness center
            </p>
            <p className='flex items-center gap-3 mb-5 dark:text-white'>
              <Beer className='dark:text-white' />
              Bar/Lounge
            </p>
            <p className='flex items-center gap-3 mb-5 dark:text-white'>
              <Wifi className='dark:text-white' />
              Free Wi-Fi
            </p>
            <p className='flex items-center gap-3 mb-5 dark:text-white'>
              <Coffee className='dark:text-white' />
              Tea/coffee machine
            </p>
            <p className='flex items-center text-red-600'>+24 more</p>
          </div>
        </div>
      </div>
    </div>
  )
}
