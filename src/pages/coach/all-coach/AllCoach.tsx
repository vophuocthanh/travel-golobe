import { Footer, Header } from '@/components/common'
import ContentAllCoach from '@/components/common/coach/all-coach/ContentAllCoach'


export default function AllCoach() {
  return (
    <div className='w-full bg-gray-100'>
      <Header />
      <main className='pt-20'>
        <section>
          <div className=''>
            <ContentAllCoach />
          </div>
        </section>
        <div className='mt-[15rem]'>
          <Footer />
        </div>
      </main>
    </div>
  )
}
