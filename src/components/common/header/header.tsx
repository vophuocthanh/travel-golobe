import { logo } from '@/assets/images'
import { IconFlight, IconHotel, IconMappin } from '@/common/icons'
import DropdownHeader from '@/components/common/header/dropdown-header'
import { MobilePage } from '@/components/common/mobile/mobile-sidebar'
import { ThemeToggle } from '@/components/common/theme/theme-toogle'
import { getAccessTokenFromLS } from '@/shared/utils/storage'
import { Compass, TramFront } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Language } from '../Language/Language'

interface HeaderProps {
  className?: string
}

export default function Header({ className }: HeaderProps) {
  const { t } = useTranslation()
  const token = getAccessTokenFromLS()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  return (
    <>
      <header
        className={`${className} items-center w-full flex justify-between fixed bg-white z-50 py-4 px-10 shadow-lg`}
        style={{ height: '80px' }}
      >
        <div className='hidden sm:flex sm:items-center sm:gap-6'>
          <div className='relative items-center inline-block gap-2 cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
            <div className='flex items-center gap-2'>
              <Compass />
              <span>{t('vehicle')}</span>
            </div>
            {isOpen && (
              <div className='absolute left-0 w-[12rem] mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 border-2 border-primary'>
                <div className='flex flex-col gap-4 p-2'>
                  <Link
                    to='/vehicle/flight'
                    className={`flex items-center gap-2 rounded-md w-full justify-center h-[2rem] ${
                      selectedItem === 'flight' ? 'bg-green-200' : ''
                    }`}
                    onClick={() => setSelectedItem('flight')}
                  >
                    <IconFlight />
                    <span>{t('flight')}</span>
                  </Link>
                  <Link
                    to='/vehicle/coach'
                    className={`flex items-center gap-2 rounded-md w-full justify-center h-[2rem] ${
                      selectedItem === 'road' ? 'bg-green-200' : ''
                    }`}
                    onClick={() => setSelectedItem('road')}
                  >
                    <TramFront />
                    <span>{t('coach')}</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link to='/hotel' className='flex items-center gap-2'>
            <IconHotel />
            <span>{t('hotel')}</span>
          </Link>
          <Link to='/tour' className='flex items-center gap-2'>
            <IconMappin />
            <span>{t('tour')}</span>
          </Link>
        </div>
        <Link to='/' className='hidden mr-40 sm:block'>
          <img src={logo} alt='logo' className='w-24 h-10' />
        </Link>
        <div className='sm:hidden'>
          <MobilePage />
        </div>
        <div className='flex items-center gap-6'>
          <Language />
          <ThemeToggle />
          {token ? (
            <DropdownHeader />
          ) : (
            <div className='flex items-center gap-4'>
              <Link to='/login' className='flex items-center gap-2'>
                {t('login')}
              </Link>
              <Link to='/register' className='flex items-center gap-2 px-4 py-2 bg-black rounded-md hover:shadow-xl'>
                <span className='text-white'>{t('signup')}</span>
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
