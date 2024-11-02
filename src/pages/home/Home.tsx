import { Banner, Footer, Header, Perfect, Review } from '@/components/common'
import CrispProvider from '@/components/common/crips/crisp-provirde'
import '@/components/common/i18n/i18n'
import { getAccessTokenFromLS } from '@/shared/utils/storage'
import { useLocation } from 'react-router-dom'

export default function Home() {
  const location = useLocation()
  const token = getAccessTokenFromLS()

  const showCrispProvider = token && location.pathname !== '/admin'

  return (
    <div className='w-full'>
      <Header />
      <main className='pt-20'>
        <Banner />
        <div className='items-center justify-center mx-auto max-w-7xl'>
          <Perfect />
          <Review />
          {showCrispProvider && <CrispProvider />}
        </div>
        <Footer />
      </main>
    </div>
  )
}
