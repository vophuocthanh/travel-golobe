import { logo_footer, mailbox } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='w-full h-96 bg-primary'>
      <div className='max-w-7xl mx-auto'>
        {/* Absolute */}
        <div className='relative'>
          <div className='absolute inset-0 flex justify-center items-center'>
            <div className='w-[1000px] flex justify-center h-64 rounded-xl bg-[#CDEAE1]'>
              <div className='p-0 w-full flex justify-between'>
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
                    <Button className='bg-black text-white hover:bg-white hover:text-black hover:transition-all hover:shadow-md'>
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
          <div className='grid grid-cols-6 gap-4 w-full'>
            <div className='flex flex-col gap-4 w-full'>
              <img src={logo_footer} alt='logo' className='w-28 h-10 ml-4' />
              <div className='flex gap-4'>
                <Link to='https://www.facebook.com' target='_blank'>
                  <Facebook className='w-6 h-6' />
                </Link>
                <Link to='https://www.instagram.com' target='_blank'>
                  <Instagram className='w-6 h-6' />
                </Link>
                <Link to='https://x.com/home' target='_blank'>
                  <Twitter className='w-6 h-6' />
                </Link>
                <Link to='https://www.youtube.com' target='_blank'>
                  <Youtube className='w-6 h-6' />
                </Link>
              </div>
            </div>
            <div>
              <h1 className='text-xl font-medium'>Our Destinations</h1>
              <div className='flex flex-col gap-2 text-[#112211]'>
                <p>Canada</p>
                <p>Alaska</p>
                <p>France</p>
                <p>Iceland</p>
              </div>
            </div>
            <div>
              <h1 className='text-xl font-medium'>Our Activities</h1>
              <div className='flex flex-col gap-2 text-[#112211]'>
                <p>Northern Lights</p>
                <p>Cruising & sailing</p>
                <p>Multi-activities</p>
                <p>Kayaing</p>
              </div>
            </div>
            <div>
              <h1 className='text-xl font-medium'>Travel Blogs</h1>
              <div className='flex flex-col gap-2 text-[#112211]'>
                <p>Bali Travel Guide</p>
                <p>Sri Lanks Travel Guide</p>
                <p>Peru Travel Guide</p>
                <p>Bali Travel Guide</p>
              </div>
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
  )
}
