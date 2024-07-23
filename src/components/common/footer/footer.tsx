import { logo_footer, mailbox } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { dataActivities, dataDestinations, dataTravel } from '@/lib/data-type'
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
      <div className='w-full h-96 bg-primary'>
        <div className='mx-auto max-w-7xl'>
          {/* Absolute */}
          <div className='relative'>
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='w-[1000px] flex justify-center h-64 rounded-xl bg-[#CDEAE1]'>
                <div className='flex justify-between w-full p-0'>
                  <div className='p-6 space-y-4'>
                    <h1 className='text-3xl font-bold'>
                      Subscribe <br /> Newsletter
                    </h1>
                    <div className='flex flex-col'>
                      <span>The Travel</span>
                      <p>Get inspired! Receive travel discounts, tips and behind the scenes stories.</p>
                    </div>
                    <div className='flex gap-4'>
                      <Input placeholder='Your email address' />
                      <Button className='text-white bg-black hover:bg-white hover:text-black hover:transition-all hover:shadow-md'>
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
                    <Link key={icon.id} to={icon.link} target='_blank' className='hover:scale-105 hover:transition-all'>
                      {icon.icon}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h1 className='text-xl font-medium'>Our Destinations</h1>
                {dataDestinations.map((destination) => (
                  <div key={destination.id} className='flex flex-col gap-2 text-[#112211]'>
                    <p className='cursor-pointer hover:underline'>{destination.name}</p>
                  </div>
                ))}
              </div>
              <div>
                <h1 className='text-xl font-medium'>Our Activities</h1>
                {dataActivities.map((activity) => (
                  <div key={activity.id} className='flex flex-col gap-2 text-[#112211]'>
                    <p className='cursor-pointer hover:underline'>{activity.name}</p>
                  </div>
                ))}
              </div>
              <div>
                <h1 className='text-xl font-medium'>Travel Blogs</h1>
                {dataTravel.map((travel) => (
                  <div key={travel.id} className='flex flex-col gap-2 text-[#112211]'>
                    <p className='cursor-pointer hover:underline'>{travel.name}</p>
                  </div>
                ))}
              </div>
              <div>
                <h1 className='text-xl font-medium'>About Us</h1>
                <div className='flex flex-col gap-2 text-[#112211]'>
                  <p>Our Story</p>
                  <p>Work with us</p>
                </div>
              </div>
              <div>
                <h1 className='text-xl font-medium'>Contact Us</h1>
                <div className='flex flex-col gap-2 text-[#112211]'>
                  <p>Our Story</p>
                  <p>Work with us</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-[#a1f4d9] w-full h-20'>
        <p className='text-center pt-7'>Bản quyền © 2024 Travel Globe.</p>
      </div>
    </>
  )
}
