import BillingAllView from '@/components/common/admin/billing/billing-all/BillingAllView'
import BillingCoachView from '@/components/common/admin/billing/billing-coach/BillingCoachView'
import BillingFlightView from '@/components/common/admin/billing/billing-flight/BillingFlightView'
import BillingHotelView from '@/components/common/admin/billing/billing-hotel/BillingHotelView'
import BillingTourView from '@/components/common/admin/billing/billing-tour/BillingTourView'
import ClientProvider from '@/components/common/loading-screen/client-provider'
import { path } from '@/constants/path'
import LayoutMain from '@/layout/LayoutMain'
import { Flight, Home, Hotel, Login, PageNotFound, Register, Tour, TourDetail } from '@/pages'
import BillingAdmin from '@/pages/admin/billing/BillingAdmin'
import Dashboard from '@/pages/admin/Dashboard'
import EmployeeAdmin from '@/pages/admin/employee/EmployeeAdmin'
import CreateFlightAdmin from '@/pages/admin/flight/components/CreateFlightAdmin'
import EditFlightAdmin from '@/pages/admin/flight/components/EditFLightAdmin'
import FlightAdmin from '@/pages/admin/flight/FlightAdmin'
import HotelAdmin from '@/pages/admin/hotel/HotelAdmin'
import CreateHotelAdmin from '@/pages/admin/hotel/HotelAdminAdd'
import HotelAdminEdit from '@/pages/admin/hotel/HotelAdminEdit'
import PaymentAdmin from '@/pages/admin/payments/PaymentAdmin'
import PaymentDetailView from '@/pages/admin/payments/PaymentDetailView'
import RoadVehicleAdmin from '@/pages/admin/road-vehicle/RoadVehicleAdmin'
import RoadVehicleAdminView from '@/pages/admin/road-vehicle/RoadVehicleAdminView'
import CreateTourAdmin from '@/pages/admin/tour/components/CreateTourAdmin'
import EditTourAdmin from '@/pages/admin/tour/components/EditTourAdmin'
import TourAdmin from '@/pages/admin/tour/TourAdmin'
import UserAdminDetail from '@/pages/admin/users/detail/UserAdminDetail'
import UserAdmin from '@/pages/admin/users/UserAdmin'
import AllCoach from '@/pages/coach/all-coach/AllCoach'
import CoachDetail from '@/pages/coach/all-coach/CoachDetail'
import CoachPayment from '@/pages/coach/all-coach/CoachPayment'
import Coach from '@/pages/coach/Coach'
import AllFlight from '@/pages/flight/all-flight/AllFlight'
import FlightDetail from '@/pages/flight/FlightDetail'
import FlightPayment from '@/pages/flight/FlightPayment'
import ForgotPassword from '@/pages/forgot-password/ForgotPassword'
import HomeStay from '@/pages/home-stay/HomeStay'
import HotelDetail from '@/pages/hotel/hotel-detail/HotelDetail'
import HotelPayment from '@/pages/hotel/HotelPayment'
import Profile from '@/pages/profile/Profile'
import ResetPassword from '@/pages/reset-password/ResetPassword'
import TourDetailView from '@/pages/tour/TourDetailView'
import TourPayment from '@/pages/tour/TourPayment'
import VerifyCode from '@/pages/verify-code/VerifyCode'
import AdminRoute from '@/routes/AdminRoute'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useRoutes } from 'react-router-dom'

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
      { path: path.coach, element: <Coach /> },
      { path: path.flight_detail, element: <FlightDetail /> },
      { path: path.coach_detail, element: <CoachDetail /> },
      { path: path.forgot_password, element: <ForgotPassword /> },
      { path: path.reset_password, element: <ResetPassword /> },
      { path: path.profile, element: <Profile /> },
      { path: path.all_flight, element: <AllFlight /> },
      { path: path.all_coach, element: <AllCoach /> },
      { path: path.hotelId, element: <HotelDetail /> },
      { path: '*', element: <PageNotFound /> },
      {
        path: path.admin,
        element: (
          <AdminRoute>
            <LayoutMain children={<Dashboard />} />
          </AdminRoute>
        )
      },
      { path: path.users, element: <LayoutMain children={<UserAdmin />} /> },
      { path: path.users_id, element: <LayoutMain children={<UserAdminDetail />} /> },
      { path: path.billing, element: <LayoutMain children={<BillingAdmin />} /> },
      { path: path.admin_payment, element: <LayoutMain children={<PaymentAdmin />} /> },
      { path: path.all_view, element: <LayoutMain children={<BillingAllView />} /> },
      { path: path.hotel_view, element: <LayoutMain children={<BillingHotelView />} /> },
      { path: path.flight_view, element: <LayoutMain children={<BillingFlightView />} /> },
      { path: path.coach_view, element: <LayoutMain children={<BillingCoachView />} /> },
      { path: path.payment_view, element: <LayoutMain children={<PaymentDetailView />} /> },
      { path: path.tour_view, element: <LayoutMain children={<BillingTourView />} /> },
      { path: path.admin_tour, element: <LayoutMain children={<TourAdmin />} /> },
      { path: path.admin_create_tour, element: <LayoutMain children={<CreateTourAdmin />} /> },
      { path: path.hotel_add, element: <LayoutMain children={<CreateHotelAdmin />} /> },
      { path: path.admin_tourID, element: <LayoutMain children={<EditTourAdmin />} /> },
      { path: path.admin_flight, element: <LayoutMain children={<FlightAdmin />} /> },
      { path: path.admin_create_flight, element: <LayoutMain children={<CreateFlightAdmin />} /> },
      { path: path.admin_flightID, element: <LayoutMain children={<EditFlightAdmin />} /> },
      { path: path.admin_hotel, element: <LayoutMain children={<HotelAdmin />} /> },
      { path: path.admin_hotelID, element: <LayoutMain children={<HotelAdminEdit />} /> },
      { path: path.admin_road_vehicle, element: <LayoutMain children={<RoadVehicleAdmin />} /> },
      { path: path.road_vehicleID, element: <LayoutMain children={<RoadVehicleAdminView />} /> },
      { path: path.admin_employee, element: <LayoutMain children={<EmployeeAdmin />} /> },
      { path: path.flight_payment, element: <FlightPayment /> },
      { path: path.coach_payment, element: <CoachPayment /> },
      { path: path.tour_payment, element: <TourPayment /> },
      { path: path.hotel_payment, element: <HotelPayment /> },
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
