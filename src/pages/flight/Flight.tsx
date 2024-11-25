import { banner_flight } from '@/assets/images'
import { Footer, Header } from '@/components/common'
import FlightReview1 from '@/components/common/flight/flight-review-1/flight-review-1'
import FlightReview2 from '@/components/common/flight/flight-review-2/flight-review-2'
import PlacesTogether from '@/components/common/flight/places-together/places-together'
import { useTranslation } from 'react-i18next'

export default function Flight() {
  const { t } = useTranslation()
  return (
    <div className="w-full ">
      <Header />
      <main className="w-full pt-20 ">
        <section>
          <div className="flex items-center justify-center w-full h-[50rem] overflow-hidden relative">
            {/* banner */}
            <div className="w-full h-full ">
              <img src={banner_flight} alt="flight" className="object-cover w-full h-screen " />

              <div className="absolute p-5 text-white top-1/4 left-[10rem] w-[25rem]">
                <h1 className="hidden text-4xl font-bold sm:block">{t('travelwhishlist')}</h1>
                <p className="hidden mt-2 text-lg sm:block">{t('Special')}</p>
              </div>
            </div>
            {/* banner-search */}
            {/* <div className='absolute bottom-1 items-center justify-center p-4 bg-white rounded-lg shadow-md shadow-slate-300 w-[84%] h-[15rem]'>
              <p className='mt-4 ml-5 text-lg font-semibold'>{t('flying')}</p>
              <div className='grid grid-cols-7 gap-4 mt-[2rem] mr-[2.8rem]'>
                <div className='relative w-full col-span-2 ml-5 '>
                  <label className='absolute z-10 p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 sm:text-sm'>
                    From - To
                  </label>
                  <Input
                    type='text'
                    className='block w-full text-lg p-2 pl-5 mt-1 border border-gray-300 rounded-md shadow-sm h-[3rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md'
                    value='Lahore - Karachi'
                  />
                  <div className='absolute right-3 top-4'>
                    <IconVector />
                  </div>
                </div>
                <div className='relative w-full col-span-1 ml-5 '>
                  <label className='absolute z-10 p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 sm:text-sm'>
                    Trip
                  </label>
                  <Input
                    type='text'
                    className='block text-lg w-full p-2 pl-5 mt-1 border border-gray-300 rounded-md shadow-sm h-[3rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md'
                    value='Return'
                  />
                  <div className='absolute right-3 top-6'>
                    <IconVectorDown />
                  </div>
                </div>
                <div className='relative w-full col-span-2 ml-5 '>
                  <label className='absolute p-1.5 z-10 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 sm:text-sm'>
                    Depart - Return
                  </label>
                  <Input
                    type='text'
                    className='block text-lg w-full p-2 pl-5 mt-1 border border-gray-300 rounded-md shadow-sm h-[3rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md'
                    value='13 Nov 24 - 16 Nov 24'
                  />
                </div>
                <div className='relative w-full col-span-2 ml-5'>
                  <label className='absolute p-1.5 z-10 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 sm:text-sm'>
                    Passenger - Class
                  </label>
                  <Input
                    type='text'
                    className='block w-full text-lg p-2 pl-5 mt-1 border border-gray-300 rounded-md shadow-sm h-[3rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md'
                    value='1 Passenger, Economy'
                  />
                </div>
              </div>
              <div className='absolute flex p-4 jstify-end right-[1.6rem]'>
                <div className='flex gap-4 '>
                  <Button className='px-4 py-2 text-black bg-white border rounded-lg border-primary hover:bg-white '>
                    + {t('Promo')}
                  </Button>
                  <Button className='flex items-center gap-2 px-4 py-2 text-black rounded-lg bg-primary hover:border hover:bg-white hover:border-spacing-3 hover:border-primary hover:text-black'>
                    <IconVectorFlight /> {t('places')}
                  </Button>
                </div>
              </div>
            </div> */}
          </div>
        </section>
        <div className="w-full">
          <PlacesTogether />
          <FlightReview1 />
          <FlightReview2 />
        </div>

        <div className="mt-auto">
          <Footer />
        </div>
      </main>
    </div>
  )
}
