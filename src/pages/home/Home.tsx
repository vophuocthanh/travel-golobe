import { Banner, Footer, Header, Perfect, Review } from '@/components/common'
import CrispProvider from '@/components/crips/crisp-provirde'
import { getAccessTokenFromLS } from '@/shared/utils/storage'

export default function Home() {
  const token = getAccessTokenFromLS()
  return (
    <div className='w-full'>
      <Header />
      <main className='pt-20'>
        <Banner />
        <div className='items-center justify-center mx-auto max-w-7xl'>
          <Perfect />
          <Review />
          {token ? <CrispProvider /> : null}
        </div>
        <Footer />
      </main>
    </div>
  )
}
