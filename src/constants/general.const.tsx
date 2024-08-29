import IconDashboard from '@/assets/icons/icon-dashboard'
import IconPerson from '@/assets/icons/icon-person'
import { TSidebarLinks } from '@/shared/ts/types'
import { ContactRound, CreditCard, Hotel, TicketsPlane, TramFront } from 'lucide-react'

export const sidebarLinks: TSidebarLinks[] = [
  {
    title: 'Dashboard',
    icon: <IconDashboard />,
    path: '/admin'
  },
  {
    title: 'Hotel',
    icon: <Hotel />,
    path: '/admin/hotels'
  },
  {
    title: 'Flight',
    icon: <TicketsPlane />,
    path: '/admin/flights'
  },
  {
    title: 'Tour',
    icon: <TramFront />,
    path: '/admin/tours'
  },
  {
    title: 'Order',
    icon: <CreditCard />,
    path: '/admin/order'
  },
  {
    title: 'Employee',
    icon: <ContactRound />,
    path: '/admin/employee'
  },
  {
    title: 'Users',
    icon: <IconPerson />,
    path: '/admin/users'
  }
]
