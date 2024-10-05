import { logo } from '@/assets/images'
import { IconFlight, IconHotel, IconMappin } from '@/common/icons'
import DropdownHeader from '@/components/common/header/dropdown-header'
import { ThemeToggle } from '@/components/common/theme/theme-toogle'
import { getAccessTokenFromLS } from '@/shared/utils/storage'
import { Compass, TramFront } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface HeaderProps {
  className?: string
}

export default function Header({ className }: HeaderProps) {
  const token = getAccessTokenFromLS()
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  return (
    <>
      <header
        className={`${className} items-center w-full flex justify-between fixed bg-white z-50 py-4 px-10 shadow-lg`}
        style={{ height: '80px' }}
      >
        <div className='flex items-center gap-6 '>
          <div className="relative items-center inline-block gap-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <div className='flex items-center gap-2'>
              <Compass/>
              <span >Vehicle</span>
            </div>
          {isOpen && (
            <div className='absolute left-0 w-[10rem] mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 border-2 border-primary'>
              <div className="flex flex-col gap-4 p-2">
                <Link to='/vehicle/flight' className={`flex items-center gap-2 rounded-md w-full justify-center h-[2rem] ${selectedItem === 'flight' ? 'bg-green-200' : ''}`} onClick={() => setSelectedItem('flight')} >
                  <IconFlight />
                  <span>Find Flight</span>
                </Link>
                <Link to='/vehicle/coach' className={`flex items-center gap-2 rounded-md w-full justify-center h-[2rem] ${selectedItem === 'road' ? 'bg-green-200' : ''}`} onClick={() => setSelectedItem('road')} >
                  <TramFront />
                  <span>Find Coach</span>
                </Link>
              </div>
            </div>
          )}
          </div>
          <Link to='/hotel' className='flex items-center gap-2'>
            <IconHotel />
            <span>Find Hotel</span>
          </Link>
          <Link to='/tour' className='flex items-center gap-2'>
            <IconMappin />
            <span>Find Tour</span>
          </Link>
        </div>
        <Link to='/' className='mr-40'>
          <img src={logo} alt='logo' className='w-24 h-10' />
        </Link>
        <div className='flex items-center gap-6'>
          <ThemeToggle />
          {token ? (
            <DropdownHeader />
          ) : (
            <div className='flex items-center gap-4'>
              <Link to='/login' className='flex items-center gap-2'>
                Login
              </Link>
              <Link to='/register' className='flex items-center gap-2 px-4 py-2 bg-black rounded-md hover:shadow-xl'>
                <span className='text-white'>Sign up</span>
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
