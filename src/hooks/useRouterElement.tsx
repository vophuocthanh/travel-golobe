import { path } from '@/constants/path'
import { Flight, Home, Hotel, Login, PageNotFound, Register, Tour } from '@/pages'
import { useRoutes } from 'react-router-dom'

export default function useRoutesElements() {
  const routeElements = useRoutes([
    { path: path.home, element: <Home /> },
    { path: path.login, element: <Login /> },
    { path: path.register, element: <Register /> },
    { path: path.tour, element: <Tour /> },
    { path: path.hotel, element: <Hotel /> },
    { path: path.flight, element: <Flight /> },
    { path: '*', element: <PageNotFound /> }
  ])

  return routeElements
}
