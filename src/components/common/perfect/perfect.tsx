import { flight, hotel, tour } from '@/assets/images'
import SectionInViewRight from '@/components/common/animation/SectionInViewRight'
import { Button } from '@/components/ui/button'
import { dataPerfect } from '@/shared/lib/data-type'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

export default function Perfect() {
  const { t } = useTranslation();
  return (
    <SectionInViewRight>
      <div className='mx-auto mb-40 max-w-7xl'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col space-y-2'>
            <h1 className='text-3xl font-medium'>{t('trip')}</h1>
            <p className='text-[#112211]'> {t('textTrip')}</p>
          </div>
          <Button className='text-black bg-white border border-emerald-300 hover:text-white hover:shadow-md hover:transition-all'>
          {t('see')}
          </Button>
        </div>
        <div className='flex flex-wrap w-full gap-8 mt-10 mb-20'>
          {dataPerfect.map((item) => (
            <div
              key={item.id}
              className='flex items-center gap-4 px-4 py-2 bg-white shadow-xl cursor-pointer w-96 rounded-2xl'
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
          <div className='w-[28rem]'>
            <img src={flight} alt='hotel' className='w-[28rem] h-[36rem] rounded-2xl object-cover' />
            <div className='absolute flex flex-col space-y-4 items-center justify-center bottom-5 w-[27rem]'>
              <h1 className='text-3xl font-medium text-white'>{t('Flights')}</h1>
              <p className='flex w-full px-8 text-center text-white '>
                {t('textFlights')}
              </p>
              <Link to='/flight'>
                <Button className='w-32 text-white'>{t('ShowFlights')}</Button>
              </Link>
            </div>
          </div>
          <div className='w-[28rem]'>
            <img src={hotel} alt='hotel' className='w-[28rem] h-[36rem] rounded-2xl object-cover' />
            <div className='absolute flex flex-col space-y-4 items-center justify-center bottom-5 w-[27rem]'>
              <h1 className='text-3xl font-medium text-white'>{t('Hotels')}</h1>
              <p className='px-8 text-center text-white'>
                {t('textHotels')}
              </p>
              <Link to='/hotel'>
                <Button className='w-32 text-white'>{t('ShowHotels')}</Button>
              </Link>
            </div>
          </div>
          <div className='w-[28rem]'>
            <img src={tour} alt='hotel' className='w-[28rem] h-[36rem] rounded-2xl object-cover' />
            <div className='absolute flex flex-col space-y-4 items-center justify-center bottom-5 w-[27rem]'>
              <h1 className='text-3xl font-medium text-white'>{t('Tour')}</h1>
              <p className='px-8 text-center text-white'>
                {t('textTour')}
              </p>
              <Link to='/tour'>
                <Button className='w-32 text-white'>{t('Showtour')}</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SectionInViewRight>
  )
}
