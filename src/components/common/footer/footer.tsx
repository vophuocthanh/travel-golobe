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
        <div className='w-full h-full bg-primary'>
          <div className='mx-auto max-w-7xl'>
            {/* Absolute */}
            <div className='relative'>
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-[1000px] flex justify-center h-64 rounded-xl bg-[#CDEAE1]'>
                  <div className='flex justify-between w-full p-0'>
                    <div className='p-6 space-y-4'>
                      <h1 className='text-lg font-bold lg:text-3xl'>
                        {t('Subscribe')} <br /> {t('Newsletter')}
                      </h1>
                      <div className='flex flex-col text-sm lg:text-md'>
                        <span>{t('TheTravel')}</span>
                        <p>{t('Receivetravel')}</p>
                      </div>
                      <div className='flex w-[15rem] gap-4 lg:w-[30rem]'>
                        <Input placeholder='Your email address' />
                        <Button className='text-white bg-black hover:bg-white hover:text-black hover:transition-all hover:shadow-md'>
                        {t('Subscribe')}
                        </Button>
                      </div>
                    </div>
                    <div className=''>
                      <img src={mailbox} alt='mail' className='w-full h-64 lg:pr-10' />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Absolute */}

            <div className='flex pt-40 lg:pt-44'>
              <div className='grid w-full grid-cols-6 gap-2 pl-2 lg:px-4 lg:gap-4 lg:pl-16 '>
                <div className='flex flex-col w-full gap-4'>
                  <img src={logo_footer} alt='logo' className='lg:ml-4 h-13 w-15 lg:h-10 lg:w-28' />
                  <div className='gap-4 lg:flex '>
                    {dataIcon.map((icon) => (
                      <Link
                        key={icon.id}
                        to={icon.link}
                        target='_blank'
                        className='items-center hover:scale-105 hover:transition-all'
                      >
                        {icon.icon}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <h1 className='text-sm font-medium lg:text-xl'>{t('Destinations')}</h1>
                  {dataDestinations.map((destination) => (
                    <div key={destination.id} className='flex flex-col gap-2 text-[#112211]'>
                      <p className='cursor-pointer hover:underline'>{destination.name}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h1 className='text-sm font-medium lg:text-xl'>{t('Activities')}</h1>
                  {dataActivities.map((activity) => (
                    <div key={activity.id} className='flex flex-col gap-2 text-[#112211]'>
                      <p className='cursor-pointer hover:underline'>{activity.name}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h1 className='text-sm font-medium lg:text-xl'>{t('TravelBlogs')}</h1>
                  {dataTravel.map((travel) => (
                    <div key={travel.id} className='flex flex-col gap-2 text-[#112211]'>
                      <p className='cursor-pointer hover:underline'>{travel.name}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h1 className='text-sm font-medium lg:text-xl'>{t('AboutUs')}</h1>
                  <div className='flex flex-col gap-2 text-[#112211]'>
                    <p>{t('OurStory')}</p>
                    <p>{t('Workwith')}</p>
                  </div>
                </div>
                <div>
                  <h1 className='text-sm font-medium lg:text-xl'>{t('ContactUs')}</h1>
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
      <div className='bg-[#a1f4d9] w-full lg:h-20 h-15'>
        <p className='py-2 text-center lg:pt-7'>{t('Copyright')} © 2024 Travel Globe.</p>
      </div>
    </>
  )
}
