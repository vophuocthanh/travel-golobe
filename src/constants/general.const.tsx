import IconDashboard from '@/assets/icons/icon-dashboard'
import IconFlight from '@/assets/icons/icon-flight'
import IconHotel from '@/assets/icons/icon-hotel'
import IconPerson from '@/assets/icons/icon-person'
import IconTour from '@/assets/icons/icon-tour'
import { TSidebarLinks } from '@/shared/ts/types'
import { CreditCard } from 'lucide-react'

export const sidebarLinks: TSidebarLinks[] = [
  {
    title: 'Dashboard',
    icon: <IconDashboard />,
    path: '/admin'
  },
  {
    title: 'Hotel',
    icon: <IconHotel />,
    path: '/admin/hotels'
  },
  {
    title: 'Flight',
    icon: <IconFlight />,
    path: '/admin/flights'
  },
  {
    title: 'Tour',
    icon: <IconTour />,
    path: '/admin/tours'
  },
  {
    title: 'Order',
    icon: <CreditCard />,
    path: '/admin/order'
  },
  {
    title: 'Users',
    icon: <IconPerson />,
    path: '/admin/users'
  }
]
