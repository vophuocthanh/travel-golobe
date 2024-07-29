import { BannerTour, Footer, Header, IntoTour, LocationTour, SearchTour } from "@/components/common";

export default function Tour() {
  return (
    <div className='w-full'>
      <Header />
      <main className='pt-20'>
        <BannerTour />
        <SearchTour />
        <IntoTour />
        <LocationTour />
        <Footer />
      </main>
    </div>
  )
}
