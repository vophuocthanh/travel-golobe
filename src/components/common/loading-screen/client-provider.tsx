import LoadingScreen from '@/components/common/loading-screen/loading-screen'
import { useEffect, useState } from 'react'

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore')

    if (!hasLoadedBefore) {
      const timer = setTimeout(() => {
        setLoading(false)
        sessionStorage.setItem('hasLoadedBefore', 'true')
      }, 3000)

      return () => clearTimeout(timer)
    } else {
      setLoading(false)
    }
  }, [])

  return loading ? <LoadingScreen setLoading={setLoading} /> : <>{children}</>
}
