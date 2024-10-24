import { banner_coach } from '@/assets/images'
import { IconVector, IconVectorDown, IconVectorFlight } from '@/common/icons'
import { Footer, Header } from '@/components/common'
import CoachReview1 from '@/components/common/coach/coach-review-1/coach-review-1'
import CoachReview2 from '@/components/common/coach/coach-review-2/coach-review-2'
import PlacesTogether from '@/components/common/coach/places-together/places-together'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Coach() {
  return (
    <div className='w-full'>
      <Header />
      <main className='pt-20 dark:bg-slate-700 dark:text-white'>
        <section>
          <div className='flex items-center justify-center w-full h-[50rem] overflow-hidden relative '>
            {/* banner */}
            <div className='top-0 w-full h-full'>
              <img src={banner_coach} alt='coach' className='object-cover w-full h-[40.5rem]' />
              <div className='absolute p-5 text-gray top-1/4 left-[10rem] w-[27rem] bg-slate-100 rounded-lg'>
                <h1 className='text-4xl font-bold'>Create your travel wishlist, and let our bus service take you there!</h1>
                <p className='mt-2 text-lg'>Special offers to suit your plan</p>
              </div>
            </div>
            {/* banner-search */}
            <div className='absolute bottom-1 items-center justify-center p-4 bg-white rounded-lg shadow-md shadow-slate-300 w-[84%] h-[15rem] dark:bg-gray-900 dark:text-white'>
              <p className='mt-4 ml-5 text-lg font-semibold'>Where are you coach?</p>
              <div className='grid grid-cols-7 gap-4 mt-[2rem] mr-[2.8rem]'>
                <div className='relative w-full col-span-2 ml-5 '>
                  <label
                    className='absolute p-1.5 dark:p-0 text-gray-800 dark:text-gray-300 bg-white transform -translate-y-1/2 bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 top-1 left-4 z-10 text-sm rounded'        >
                    From - To
                  </label>
                  <Input
                    type='text'
                    className='block w-full dark:bg-gray-800 dark:text-white text-lg p-2 pl-5 mt-1 border border-gray-300 rounded-md shadow-sm h-[3rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md'
                    value='Lahore - Karachi'
                  />
                  <div className='absolute right-3 top-4'>
                    <IconVector />
                  </div>
                </div>
                <div className='relative w-full col-span-1 ml-5 '>
                  <label
                    className='absolute p-1.5 dark:p-0 text-gray-800 dark:text-gray-300 bg-white transform -translate-y-1/2 bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 top-1 left-4 z-10 text-sm rounded'        >

                    Trip
                  </label>
                  <Input
                    type='text'
                    className='block text-lg w-full dark:bg-gray-800 dark:text-white p-2 pl-5 mt-1 border border-gray-300 rounded-md shadow-sm h-[3rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md'
                    value='Return'
                  />
                  <div className='absolute right-3 top-6'>
                    <IconVectorDown />
                  </div>
                </div>
                <div className='relative w-full col-span-2 ml-5 '>
                  <label
                    className='absolute p-1.5 dark:p-0 text-gray-800 dark:text-gray-300 bg-white transform -translate-y-1/2 bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 top-1 left-4 z-10 text-sm rounded'>
                    Depart - Return
                  </label>
                  <Input
                    type='text'
                    className='block text-lg w-full p-2 dark:bg-gray-800 dark:text-white pl-5 mt-1 border border-gray-300 rounded-md shadow-sm h-[3rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md'
                    value='13 Nov 24 - 16 Nov 24'
                  />
                </div>
                <div className='relative w-full col-span-2 ml-5'>
                  <label
                    className='absolute p-1.5 dark:p-0 text-gray-800 dark:text-gray-300 bg-white transform -translate-y-1/2 bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 top-1 left-4 z-10 text-sm rounded'        >

                    Passenger - Class
                  </label>
                  <Input
                    type='text'
                    className='block w-full text-lg p-2 dark:bg-gray-800 dark:text-white pl-5 mt-1 border border-gray-300 rounded-md shadow-sm h-[3rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md'
                    value='1 Passenger, Economy'
                  />
                </div>
              </div>
              <div className='absolute flex p-4 jstify-end right-[1.6rem]'>
                <div className='flex gap-4 '>
                  <Button className='px-4 py-2 text-black bg-white border rounded-lg border-primary hover:bg-white '>
                    + Add Promo Code
                  </Button>
                  <Button className='flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:border hover:bg-white hover:border-spacing-3 hover:border-primary hover:text-black'>
                    <IconVectorFlight /> Show Coach
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div>
          <PlacesTogether />
          <CoachReview1 />
          <CoachReview2 />
        </div>

        <div className='mt-auto'>
          <Footer />
        </div>
      </main>
    </div>
  )
}
