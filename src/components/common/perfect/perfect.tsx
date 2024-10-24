import { flight, hotel, tour } from '@/assets/images'
import SectionInViewRight from '@/components/common/animation/SectionInViewRight'
import { Button } from '@/components/ui/button'
import { dataPerfect } from '@/shared/lib/data-type'
import { Link } from 'react-router-dom'

export default function Perfect() {
  return (
    <SectionInViewRight>
      <div className='mx-auto mb-40 max-w-7xl'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col space-y-2 dark:text-white'>
            <h1 className='text-3xl font-medium'>Plan your perfect trip</h1>
            <p className='text-[#112211] dark:text-white'>Search Flights & Places Hire to our most popular destinations</p>
          </div>
          <Button className='text-black bg-white border border-emerald-300 hover:text-white dark:hover:text-slate-700 hover:shadow-md dark:border-white hover:transition-all'>
            See more places
          </Button>
        </div>
        <div className='flex flex-wrap w-full gap-8 mt-10 mb-20'>
          {dataPerfect.map((item) => (
            <div
              key={item.id}
              className='flex items-center gap-4 px-4 py-2 dark:bg-slate-900 dark:border-white dark:border dark:text-white shadow-xl cursor-pointer w-96 rounded-2xl'
            >
              <img src={item.image} alt='img' className='w-20 h-20 rounded-2xl' />
              <div className='flex flex-col space-y-2'>
                <h1>{item.name}</h1>
                <p>{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='relative flex gap-4'>
          <div className='w-[28rem] '>
            <img src={flight} alt='hotel' className='w-[28rem] h-[36rem] rounded-2xl object-cover dark:border-white dark:border' />
            <div className='absolute flex flex-col space-y-4 items-center justify-center bottom-5 w-[28rem]'>
              <h1 className='text-3xl font-medium text-white'>Flights</h1>
              <p className='text-center text-white'>
                Search Flights & Places Hire to our most popular <br /> destinations
              </p>
              <Link to='/flight'>
                <Button className='w-32 text-white dark:hover:text-slate-700 dark:border-white'>Show flight</Button>
              </Link>
            </div>
          </div>
          <div className='w-[28rem]'>
            <img src={hotel} alt='hotel' className='w-[28rem] h-[36rem] rounded-2xl object-cover dark:border-white dark:border' />
            <div className='absolute flex flex-col space-y-4 items-center justify-center bottom-5 w-[28rem]'>
              <h1 className='text-3xl font-medium text-white'>Hotels</h1>
              <p className='text-center text-white'>
                Search hotels & Places Hire to our most popular <br /> destinations
              </p>
              <Link to='/hotel'>
                <Button className='w-32 text-white dark:hover:text-slate-700 hover:shadow-md dark:border-white'>Show hotel</Button>
              </Link>
            </div>
          </div>
          <div className='w-[28rem]'>
            <img src={tour} alt='hotel' className='w-[28rem] h-[36rem] rounded-2xl object-cover dark:border-white dark:border' />
            <div className='absolute flex flex-col space-y-4 items-center justify-center bottom-5 w-[28rem]'>
              <h1 className='text-3xl font-medium text-white'>Tour</h1>
              <p className='text-center text-white'>
                Search Tours & Places Hire to our most popular <br /> destinations
              </p>
              <Link to='/tour'>
                <Button className='w-32 text-white dark:hover:text-slate-700 hover:shadow-md dark:border-white'>Show tour</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SectionInViewRight>
  )
}
