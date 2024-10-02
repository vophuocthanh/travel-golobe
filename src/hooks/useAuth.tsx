import { getAccessTokenFromLS } from '@/shared/utils/storage'
import { useEffect, useState } from 'react'

interface UseAuthReturn {
  isAuthenticated?: boolean
  loading?: boolean
}

export function useAuth(): UseAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const token = getAccessTokenFromLS()

    if (token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }

    setLoading(false)
  }, [])

  return { isAuthenticated, loading }
}
