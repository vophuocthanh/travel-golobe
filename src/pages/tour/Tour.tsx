import { banner_tour } from '@/assets/images'
import { IconAdd, IconPlaces } from '@/common/icons'
import { BannerTour, Footer, Header, IntoTour, LocationTour, SearchTour } from '@/components/common'

export default function Tour() {
  return (
    <div className='w-full dark:bg-gray-700'>
      <Header />
      <div className='relative w-full '>
        <img src={banner_tour} alt='' className='object-cover w-full h-screen ' />
        <div className='absolute inset-0 flex items-center justify-center w-[650px] flex-col bg-gradient-to-r from-blue-500/50 to-transparent '>
          <div className='ml-32'>
            <h1 className='text-5xl text-white w-[28rem]'>Make your travel whishlist , we'll do the rest</h1>
            <p className='text-white '>Special offers to suit your plan</p>
          </div>
        </div>
        <div className=' absolute flex flex-col items-center justify-center w-full p-8 mx-auto space-y-4 max-w-7xl shadow-2xl bg-white rounded-xl left-1/2 top-[105%] -translate-x-1/2 -translate-y-1/2 h-[250px] dark:bg-gray-900'>
          <div className='relative w-full '>
            <p className='p-4 text-3xl dark:text-white'>Where are you flying ?</p>
            <BannerTour
              returnDate={new Date()}
              departDate={new Date()}
              setReturnDate={() => {}}
              setDepartDate={() => {}}
            />
            <div className='flex justify-end p-4'>
              <div className='flex gap-4'>
                <div className='flex items-center px-4 py-2 text-black bg-white border rounded-lg border-primary hover:bg-white '>
                  <div className='mr-1'>
                    <IconAdd />
                  </div>{' '}
                  Add Promo Code
                </div>
                <div className='flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-primary hover:border hover:bg-white hover:border-spacing-3 hover:border-primary hover:text-black'>
                  <IconPlaces /> Show places
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-[280px] '></div>

      <SearchTour />
      <IntoTour />
      <LocationTour />
      <Footer />
    </div>
  )
}
