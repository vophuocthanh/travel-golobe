import {   CheckTour, FilterTour, Footer, Header, ProductTour } from "@/components/common";



export default function TourDetail() {
    return (
        <div className='w-full'>
            <Header />
            <main className='pt-20 mb-60 '>
                <CheckTour />
                <div className="flex justify-between mx-[6rem] mt-8">
                    <FilterTour  />
                    <ProductTour />
                </div>
            </main>
            <Footer />
        </div>
    )
}