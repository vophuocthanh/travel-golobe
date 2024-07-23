import { Banner, Footer, Header, Perfect, Review } from '@/components/common'

export default function Home() {
  return (
    <div className='w-full'>
      <Header />
      <main className='pt-20'>
        <Banner />
        <div className='items-center justify-center mx-auto max-w-7xl'>
          <Perfect />
          <Review />
        </div>
        <Footer />
      </main>
    </div>
  )
}
