import { Footer, Header } from '@/components/common'
import ContentAllFlight from '@/components/common/flight/all-flight/ContentAllFlight'

export default function AllFlight() {
  return (
    <div className='w-full bg-gray-100'>
      <Header />
      <main className='pt-20'>
        <section>
          <div className=''>
            <ContentAllFlight />
          </div>
        </section>
        <div className='mt-[15rem]'>
          <Footer />
        </div>
      </main>
    </div>
  )
}
