import { logo } from '@/assets/images'
import { sidebarLinks } from '@/constants/general.const'
import { useSidebar } from '@/context/SidebarContext'
import { TSidebarLinks } from '@/shared/ts/types'
import { ChevronRight } from '@mui/icons-material'
import { ChevronLeft } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const router = useLocation()
  const { pathname } = router
  const { isCollapsed, toggleSidebar } = useSidebar()
  console.log('isCollapsed:', isCollapsed)

  return (
    <div className={`px-4 py-4 bg-[#FCFCFC] ${isCollapsed ? 'w-20' : 'w-64'} transition-width duration-300`}>
      <div className='flex items-center gap-2 mb-5'>
        <Link to='/' className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-4 ml-10'}`}>
          {!isCollapsed && <img src={logo} alt='logo' className='w-24 h-10' />}
        </Link>
        <button onClick={toggleSidebar} className={`ml-auto ${isCollapsed ? 'mr-2' : ''}`}>
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
      <div>
        {sidebarLinks.map((link) => (
          <SidebarLink isActive={pathname === link.path} key={link.title} link={link} isCollapsed={isCollapsed} />
        ))}
      </div>
    </div>
  )
}

interface ISidebarLinkProps {
  link: TSidebarLinks
  isActive: boolean
  isCollapsed: boolean
}

function SidebarLink({ link, isActive, isCollapsed }: ISidebarLinkProps) {
  return (
    <Link
      to={link.path}
      className={`flex items-center gap-4 font-medium text-base rounded-xl py-4 ${
        isCollapsed ? 'justify-center px-0' : 'px-10'
      } ${isActive ? 'bg-primary text-white' : 'hover:text-primary'} transition-all duration-300`}
    >
      <span>{link.icon}</span>
      {!isCollapsed && <span>{link.title}</span>}
    </Link>
  )
}

export default Sidebar
