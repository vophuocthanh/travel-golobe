import IconDashboard from '@/assets/icons/icon-dashboard'
import IconPerson from '@/assets/icons/icon-person'
import { TSidebarLinks } from '@/shared/ts/types'
import { BusFront, CircleDollarSign, ContactRound, CreditCard, Hotel, Tickets, TicketsPlane } from 'lucide-react'

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
    title: 'Coach',
    icon: <BusFront />,
    path: '/admin/road-vehicle'
  },
  {
    title: 'Tour',
    icon: <Tickets />,
    path: '/admin/tours'
  },
  {
    title: 'Billing',
    icon: <CreditCard />,
    path: '/admin/billing'
  },
  {
    title: 'Payment',
    icon: <CircleDollarSign />,
    path: '/admin/payments'
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
