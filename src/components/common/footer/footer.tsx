import { logo_footer, mailbox } from '@/assets/images'
import SectionInViewUp from '@/components/common/animation/SectionInViewUp'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {  dataDestinations } from '@/shared/lib/data-type'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const dataIcon = [
  {
    id: 1,
    icon: <Facebook />,
    link: 'https://www.facebook.com/'
  },
  {
    id: 2,
    icon: <Instagram />,
    link: 'https://www.instagram.com/'
  },
  {
    id: 3,
    icon: <Twitter />,
    link: 'https://x.com/home'
  },
  {
    id: 4,
    icon: <Youtube />,
    link: 'https://www.youtube.com/'
  }
]


export default function Footer() {
  const { t } = useTranslation()
  const dataTravel = [
    {
      id: 1,
      name: t('Tips')
    },
    {
      id: 2,
      name:  t('Guide')
    },
    {
      id: 3,
      name:  t('TravelDestination')
    },
    {
      id: 4,
      name:  t('Guide')
    }
  ]
  
  const dataActivities = [
    {
      id: '1',
      name:  t('Northern')
    },
    {
      id: '2',
      name:  t('Cruising')
    },
    {
      id: '3',
      name:  t('Multi')
    },
    {
      id: '4',
      name:  t('Kayaing')
    }
  ]
  return (
    <>
      <SectionInViewUp>
        <div className='w-full h-96 bg-primary'>
          <div className='mx-auto max-w-7xl'>
            {/* Absolute */}
            <div className='relative'>
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-[1000px] flex justify-center h-64 rounded-xl bg-[#CDEAE1]'>
                  <div className='flex justify-between w-full p-0'>
                    <div className='p-6 space-y-4'>
                      <h1 className='text-3xl font-bold'>
                        {t('Subscribe')} <br /> {t('Newsletter')}
                      </h1>
                      <div className='flex flex-col'>
                        <span>{t('TheTravel')}</span>
                        <p>{t('Receivetravel')}</p>
                      </div>
                      <div className='flex gap-4'>
                        <Input placeholder='Your email address' />
                        <Button className='text-white bg-black hover:bg-white hover:text-black hover:transition-all hover:shadow-md'>
                        {t('Subscribe')}
                        </Button>
                      </div>
                    </div>
                    <div className=''>
                      <img src={mailbox} alt='mail' className='w-full h-64 pr-10' />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Absolute */}

            <div className='flex pt-44'>
              <div className='grid w-full grid-cols-6 gap-4 pl-16'>
                <div className='flex flex-col w-full gap-4'>
                  <img src={logo_footer} alt='logo' className='h-10 ml-4 w-28' />
                  <div className='flex gap-4'>
                    {dataIcon.map((icon) => (
                      <Link
                        key={icon.id}
                        to={icon.link}
                        target='_blank'
                        className='hover:scale-105 hover:transition-all'
                      >
                        {icon.icon}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <h1 className='text-xl font-medium'>{t('Destinations')}</h1>
                  {dataDestinations.map((destination) => (
                    <div key={destination.id} className='flex flex-col gap-2 text-[#112211]'>
                      <p className='cursor-pointer hover:underline'>{destination.name}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h1 className='text-xl font-medium'>{t('Activities')}</h1>
                  {dataActivities.map((activity) => (
                    <div key={activity.id} className='flex flex-col gap-2 text-[#112211]'>
                      <p className='cursor-pointer hover:underline'>{activity.name}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h1 className='text-xl font-medium'>{t('TravelBlogs')}</h1>
                  {dataTravel.map((travel) => (
                    <div key={travel.id} className='flex flex-col gap-2 text-[#112211]'>
                      <p className='cursor-pointer hover:underline'>{travel.name}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h1 className='text-xl font-medium'>{t('AboutUs')}</h1>
                  <div className='flex flex-col gap-2 text-[#112211]'>
                    <p>{t('OurStory')}</p>
                    <p>{t('Workwith')}</p>
                  </div>
                </div>
                <div>
                  <h1 className='text-xl font-medium'>{t('ContactUs')}</h1>
                  <div className='flex flex-col gap-2 text-[#112211]'>
                    <p>{t('OurStory')}</p>
                    <p>{t('Workwith')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionInViewUp>
      <div className='bg-[#a1f4d9] w-full h-20'>
        <p className='text-center pt-7'>{t('Copyright')} © 2024 Travel Globe.</p>
      </div>
    </>
  )
}
