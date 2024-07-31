import { path } from '@/constants/path'
import { Account, Flight, Home, Hotel, Login, PageNotFound, Register, Tour } from '@/pages'
import Dashboard from '@/pages/admin/Dashboard'
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
      { path: path.account, element: <Account /> },
      { path: '*', element: <PageNotFound /> }
    ],
    location
  )

  const isAuthPath = location.pathname === path.login || location.pathname === path.register

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
