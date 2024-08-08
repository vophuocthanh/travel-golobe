import { path } from '@/constants/path'
import Dashboard from '@/pages/admin/Dashboard'
import { useLocation, useRoutes } from 'react-router-dom'

export default function useRoutesElements() {
  const location = useLocation()

  const routeElements = useRoutes(
    [
      { path: path.admin, element: <Dashboard /> },
    ],
    location
  )

  return routeElements
}
