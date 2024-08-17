import LoadingScreen from '@/components/common/loading-screen/loading-screen'
import { useEffect, useState } from 'react'

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return loading ? <LoadingScreen setLoading={setLoading} /> : <>{children}</>
}
