import { getUserFromLocalStorage } from '@/shared/utils/storage'
import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface AdminRouteProps {
  children: ReactNode
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const user = getUserFromLocalStorage()

  if (!user || user?.role !== 'ADMIN') {
    return <Navigate to='/' replace />
  }

  return <>{children}</>
}

export default AdminRoute
