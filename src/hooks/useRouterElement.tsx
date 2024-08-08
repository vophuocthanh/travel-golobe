import { path } from '@/constants/path'
import { Flight, Home, Hotel, Login, PageNotFound, Register, Tour } from '@/pages'
import Dashboard from '@/pages/admin/Dashboard'
import All_flight from '@/pages/flight/all-flight/All-flight'
import ForgotPassword from '@/pages/forgot-password/ForgotPassword'
import Profile from '@/pages/profile/Profile'
import ResetPassword from '@/pages/reset-password/ResetPassword'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useRoutes } from 'react-router-dom'

export default function useRoutesElements() {
  const location = useLocation()

  const routeElements = useRoutes(
    [
      { path: path.home, element: <Home /> },
      { path: path.login, element: <Login /> },
      { path: path.register, element: <Register /> },
      { path: path.tour, element: <Tour /> },
      { path: path.hotel, element: <Hotel /> },
      { path: path.flight, element: <Flight /> },
      { path: path.admin, element: <Dashboard /> },
      { path: path.forgot_password, element: <ForgotPassword /> },
      { path: path.reset_password, element: <ResetPassword /> },
      { path: path.profile, element: <Profile /> },
      { path: path.all_flight, element: <All_flight /> },


      { path: '*', element: <PageNotFound /> }
    ],
    location
  )

  const isAuthPath =
    location.pathname === path.login ||
    location.pathname === path.register ||
    location.pathname === path.forgot_password ||
    location.pathname === path.reset_password

  return (
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
        <div style={{ width: '100%' }}>{routeElements}</div>
      )}
    </AnimatePresence>
  )
}
