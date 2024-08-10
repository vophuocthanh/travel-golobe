import { IconSreach, IconVector, IconVectorDown,} from "@/common/icons";
import { Footer, Header } from "@/components/common";
import ContentAllFlight from "@/components/common/flight/all-flight/ContentAllFlight";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AllFlight() {
  return (
    <div className='w-full bg-gray-100'>
      <Header />
      <main className='pt-20'>
      <section>
        {/* Sreach */}
        <div className='flex items-center justify-center w-full h-[11rem] overflow-hidden relative  bg-gray-100'>
          <div className='absolute top-0 items-center justify-center px-4 bg-white rounded-lg shadow-md shadow-slate-300 w-[84%] h-[8rem] mt-5'>
              <div className='grid grid-cols-12 gap-4 mt-[2rem]'>
                <div className='relative w-full col-span-3 ml-5'>
                  <label className='absolute z-10 p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 sm:text-sm'>
                    From - To
                  </label>
                  <Input
                    type='text'
                    className='block text-lg w-full p-2 pl-5 mt-1 border border-gray-300 rounded-md shadow-sm h-[3rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md'
                    value='Lahore - Karachi'
                  />
                  <div className='absolute right-3 top-4'>
                    <IconVector />
                  </div>
                </div>
                <div className='relative w-full col-span-2 ml-5 '>
                  <label className='absolute z-10 p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 sm:text-sm'>
                    Trip
                  </label>
                  <Input
                    type='text'
                    className='block text-lg w-full p-2 pl-5 mt-1 border border-gray-300 rounded-md shadow-sm h-[3rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md'
                    value='Return'
                  />
                  <div className='absolute right-3 top-6'>
                    <IconVectorDown />
                  </div>
                </div>
                <div className='relative w-full col-span-3 ml-5 '>
                  <label className='absolute z-10 p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 sm:text-sm'>
                    Depart - Return
                  </label>
                  <Input
                    type='text'
                    className='block text-lg w-full p-2 pl-5 mt-1 border border-gray-300 rounded-md shadow-sm h-[3rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md'
                    value='13 Nov 24 - 16 Nov 24'
                  />
                </div>
                <div className='relative w-full col-span-3 ml-5'>
                  <label className='absolute p-1.5 z-10 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 sm:text-sm'>
                    Passenger - Class
                  </label>
                  <Input
                    type='text'
                    className='block text-lg w-full p-2 pl-5 mt-1 border border-gray-300 rounded-md shadow-sm h-[3rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md'
                    value='1 Passenger, Economy'
                  />
                </div>
                <div className='w-full col-span-1 ml-5'>
                  <Button className="h-[3rem] mt-1 w-[3.8rem]">
                    <IconSreach/>
                  </Button>
                </div>
              </div>
            </div>
        </div>
        
        <div className="">
          <ContentAllFlight/>
        </div>
      </section>
      <div className='mt-[15rem]'>
          <Footer />
        </div>
      </main>
    </div>
  );
}
