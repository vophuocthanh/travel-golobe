import { Banner, Footer, Header, Perfect, Review } from '@/components/common'
import Chatbox from '@/components/common/chatbox/chatbox'
import CrispProvider from '@/components/common/crips/crisp-provirde'
import '@/components/common/i18n/i18n'
import { getAccessTokenFromLS } from '@/shared/utils/storage'
import { useLocation } from 'react-router-dom'


export default function Home() {

  const location = useLocation()
  const token = getAccessTokenFromLS()

  const showCrispProvider = token && location.pathname !== '/admin/dashboard'
  const showChatbox = token && location.pathname !== '/admin/dashboard'

  return (
    <div className='w-full'>
      <Header />
      <main className='pt-20'>
        <Banner />
        <div className='items-center justify-center w-full p-2 mx-auto lg:max-w-7xl'>
          <Perfect />
          <Review />
          {showCrispProvider && <CrispProvider />}
          {showChatbox && <Chatbox />}
        </div>
        <Footer />
      </main>
    </div>
  )
}
