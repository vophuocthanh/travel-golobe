import { logo_footer, mailbox } from '@/assets/images'
import SectionInViewUp from '@/components/common/animation/SectionInViewUp'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { dataActivities, dataDestinations, dataTravel } from '@/shared/lib/data-type'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'

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
  return (
    <>
      <SectionInViewUp>
        <div className='w-full h-96 bg-primary dark:bg-gray-900'>
          <div className='mx-auto max-w-7xl'>
            {/* Absolute */}
            <div className='relative'>
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-[1000px] flex justify-center h-64 rounded-xl bg-[#CDEAE1] dark:bg-gray-800'>
                  <div className='flex justify-between w-full p-0'>
                    <div className='p-6 space-y-4'>
                      <h1 className='text-3xl font-bold dark:text-white'>
                        Subscribe <br /> Newsletter
                      </h1>
                      <div className='flex flex-col'>
                        <span className='dark:text-white'>The Travel</span>
                        <p className='dark:text-gray-300'>
                          Get inspired! Receive travel discounts, tips and behind the scenes stories.
                        </p>
                      </div>
                      <div className='flex gap-4'>
                        <Input placeholder='Your email address' className='dark:bg-gray-600 dark:text-white' />
                        <Button className='text-white bg-black hover:bg-white hover:text-black hover:transition-all hover:shadow-md dark:bg-gray-600 dark:hover:bg-white dark:hover:text-black'>
                          Subscribe
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
                        className='hover:scale-105 hover:transition-all dark:text-white'
                      >
                        {icon.icon}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <h1 className='text-xl font-medium dark:text-white'>Our Destinations</h1>
                  {dataDestinations.map((destination) => (
                    <div key={destination.id} className='flex flex-col gap-2 text-[#112211] dark:text-gray-300'>
                      <p className='cursor-pointer hover:underline'>{destination.name}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h1 className='text-xl font-medium dark:text-white'>Our Activities</h1>
                  {dataActivities.map((activity) => (
                    <div key={activity.id} className='flex flex-col gap-2 text-[#112211] dark:text-gray-300'>
                      <p className='cursor-pointer hover:underline'>{activity.name}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h1 className='text-xl font-medium dark:text-white'>Travel Blogs</h1>
                  {dataTravel.map((travel) => (
                    <div key={travel.id} className='flex flex-col gap-2 text-[#112211] dark:text-gray-300'>
                      <p className='cursor-pointer hover:underline'>{travel.name}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h1 className='text-xl font-medium dark:text-white'>About Us</h1>
                  <div className='flex flex-col gap-2 text-[#112211] dark:text-gray-300'>
                    <p>Our Story</p>
                    <p>Work with us</p>
                  </div>
                </div>
                <div>
                  <h1 className='text-xl font-medium dark:text-white'>Contact Us</h1>
                  <div className='flex flex-col gap-2 text-[#112211] dark:text-gray-300'>
                    <p>Our Story</p>
                    <p>Work with us</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionInViewUp>
      <div className='bg-[#a1f4d9] dark:bg-gray-600 w-full h-20'>
        <p className='text-center pt-7 dark:text-white'>Bản quyền © 2024 Travel Globe.</p>
      </div>
    </>
  )
}
