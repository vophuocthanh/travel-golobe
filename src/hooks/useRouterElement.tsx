import { path } from '@/constants/path'
import Home from '@/pages/home/Home'
import Login from '@/pages/login/Login'
import Register from '@/pages/register/Register'
import { useRoutes } from 'react-router-dom'

export default function useRoutesElements() {
  const routeElements = useRoutes([
    { path: path.home, element: <Home /> },
    { path: path.login, element: <Login /> },
    { path: path.register, element: <Register /> },
    { path: '*', element: <h1>404</h1> }
  ])

  return routeElements
}
