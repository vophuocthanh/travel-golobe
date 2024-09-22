import ClientProvider from '@/components/common/loading-screen/client-provider'
import { path } from '@/constants/path'
import LayoutMain from '@/layout/LayoutMain'
import { Flight, Home, Hotel, Login, PageNotFound, Register, Tour, TourDetail } from '@/pages'
import BillingAdmin from '@/pages/admin/billing/BillingAdmin'
import Dashboard from '@/pages/admin/Dashboard'
import EmployeeAdmin from '@/pages/admin/employee/EmployeeAdmin'
import EditFlightAdmin from '@/pages/admin/flight/components/EditFLightAdmin'
import FlightAdmin from '@/pages/admin/flight/FlightAdmin'
import HotelAdmin from '@/pages/admin/hotel/HotelAdmin'
import TourAdmin from '@/pages/admin/tour/TourAdmin'
import UserAdmin from '@/pages/admin/users/UserAdmin'
import AllFlight from '@/pages/flight/all-flight/AllFlight'
import FlightDetail from '@/pages/flight/FlightDetail'
import ForgotPassword from '@/pages/forgot-password/ForgotPassword'
import HomeStay from '@/pages/home-stay/HomeStay'
import HotelDetail from '@/pages/hotel/hotel-detail/HotelDetail'
import Profile from '@/pages/profile/Profile'
import ResetPassword from '@/pages/reset-password/ResetPassword'
import TourDetailView from '@/pages/tour/TourDetailView'
import VerifyCode from '@/pages/verify-code/VerifyCode'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useRoutes } from 'react-router-dom'
import FlightPayment from '@/pages/flight/FlightPayment'
import TourPayment from '@/pages/tour/TourPayment'
import HotelPayment from '@/pages/hotel/HotelPayment'

export default function useRoutesElements() {
  const location = useLocation()

  const routeElements = useRoutes(
    [
      { path: path.home, element: <Home /> },
      { path: path.login, element: <Login /> },
      { path: path.register, element: <Register /> },
      { path: path.verify_code, element: <VerifyCode /> },
      { path: path.tour, element: <Tour /> },
      { path: path.tourId, element: <TourDetail /> },
      { path: path.tourDetailView, element: <TourDetailView /> },
      { path: path.hotel, element: <Hotel /> },
      { path: path.home_stay, element: <HomeStay /> },
      { path: path.flight, element: <Flight /> },
      { path: path.flight_detail, element: <FlightDetail /> },
      { path: path.forgot_password, element: <ForgotPassword /> },
      { path: path.reset_password, element: <ResetPassword /> },
      { path: path.profile, element: <Profile /> },
      { path: path.all_flight, element: <AllFlight /> },
      { path: path.hotelId, element: <HotelDetail /> },
      { path: '*', element: <PageNotFound /> },
      { path: path.admin, element: <LayoutMain children={<Dashboard />} /> },
      { path: path.users, element: <LayoutMain children={<UserAdmin />} /> },
      { path: path.billing, element: <LayoutMain children={<BillingAdmin />} /> },
      { path: path.admin_tour, element: <LayoutMain children={<TourAdmin />} /> },
      { path: path.admin_flight, element: <LayoutMain children={<FlightAdmin />} /> },
      { path: path.admin_flightID, element: <LayoutMain children={<EditFlightAdmin />} /> },
      { path: path.admin_hotel, element: <LayoutMain children={<HotelAdmin />} /> },
      { path: path.admin_employee, element: <LayoutMain children={<EmployeeAdmin />} /> },
      { path: path.flight_payment, element: <FlightPayment /> },
      { path: path.tour_payment, element: <TourPayment /> },
      { path: path.hotel_payment, element: <HotelPayment /> }
    ],
    location
  )

  const isAuthPath =
    location.pathname === path.login ||
    location.pathname === path.register ||
    location.pathname === path.forgot_password ||
    location.pathname === path.reset_password

  return (
    <ClientProvider>
      <AnimatePresence mode='wait'>
        {isAuthPath ? (
          <motion.div
            key={location.key}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', width: '100%' }}
          >
            {routeElements}
          </motion.div>
        ) : (
          <div className='w-full'>{routeElements}</div>
        )}
      </AnimatePresence>
    </ClientProvider>
  )
}
