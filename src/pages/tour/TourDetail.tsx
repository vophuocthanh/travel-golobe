import {   BannerTour, FilterTour, Footer, Header, ProductTour } from "@/components/common";
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'


export default function TourDetail() {
    return (
        <div className='w-full'>
            <Header />
            <div className='flex items-center justify-center pt-5 '>
                <div className='flex flex-col items-center justify-center gap-10 p-6 mt-40 bg-white border border-gray-300 shadow-lg md:flex-row rounded-xl'>
                    <BannerTour />
                    <Button className='px-6 py-2 font-semibold text-white transition-all duration-300 ease-in-out rounded-lg shadow-md '>
                    <Search />
                    </Button>
                </div>
            </div>
                <div className="flex justify-between mx-[6rem] mt-8">
                    <FilterTour  />
                    <ProductTour />
                </div>
            <Footer />
        </div>
    )
}