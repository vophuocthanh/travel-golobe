import { logo } from '@/assets/images'
import { IconFlight, IconHotel } from '@/common/icons'
import { TramFront } from 'lucide-react'
import { Link } from 'react-router-dom'

interface HeaderProps {
  className?: string
}

export default function Header({ className }: HeaderProps) {
  return (
    <div className={`${className} w-full flex justify-between bg-white z-50 py-4 px-10`}>
      <div className='flex items-center gap-6 '>
        <Link to='/flight' className='flex items-center gap-2'>
          <IconFlight />
          <span>Find Flight</span>
        </Link>
        <Link to='/hotel' className='flex items-center gap-2'>
          <IconHotel />
          <span>Find Hotel</span>
        </Link>
        <Link to='/tour' className='flex items-center gap-2'>
          <TramFront />
          <span>Find Tour</span>
        </Link>
      </div>
      <Link to='/' className='mr-40'>
        <img src={logo} alt='logo' className='w-24 h-10' />
      </Link>
      <div className='flex items-center gap-4'>
        <Link to='/login' className='flex items-center gap-2'>
          Login
        </Link>
        <Link to='/register' className='flex items-center gap-2 px-4 py-2 bg-black rounded-md hover:shadow-xl'>
          <span className='text-white'>Sign up</span>
        </Link>
      </div>
    </div>
  )
}
