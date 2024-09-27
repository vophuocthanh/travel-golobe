import IconDashboard from '@/assets/icons/icon-dashboard'
import IconPerson from '@/assets/icons/icon-person'
import { TSidebarLinks } from '@/shared/ts/types'
import { BusFront, ContactRound, CreditCard, Hotel, Tickets, TicketsPlane } from 'lucide-react'

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
    icon: <Tickets />,
    path: '/admin/tours'
  },
  {
    title: 'Road Vehicle',
    icon: <BusFront />,
    path: '/admin/road-vehicle'
  },
  {
    title: 'Billing',
    icon: <CreditCard />,
    path: '/admin/billing'
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
