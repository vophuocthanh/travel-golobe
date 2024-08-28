import { logo } from '@/assets/images'
import DropdownHeader from '@/components/common/header/dropdown-header'
import { Link } from 'react-router-dom'

const TopBar = () => {
  return (
    <div className='flex items-center justify-between px-5 py-4 bg-[#FCFCFC]'>
      <div className='flex items-center gap-[82px] flex-1'>
        <Logo />
      </div>
      <DropdownHeader />
    </div>
  )
}

function Logo() {
  return (
    <Link to='/' className='flex items-center gap-4 ml-10'>
      <img src={logo} alt='logo' className='w-24 h-10' />
    </Link>
  )
}

export default TopBar
