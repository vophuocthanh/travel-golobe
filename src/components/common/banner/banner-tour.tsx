import { tourApi } from '@/apis/tour.api'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'
import { Label } from '@radix-ui/react-label'
import { useQuery } from '@tanstack/react-query'
import { CalendarDays, Sofa } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'



export default function BannerTour() {
    const [searchTour, setSearchTour] = useState<string>('')
    const debouncedSearchTour = useDebounce<string>(searchTour, 500)

    const {data: getAllTour, isLoading} = useQuery({
        queryKey: ['getAllTourSearch', debouncedSearchTour],
        queryFn: () => tourApi.getAll( 1,50, debouncedSearchTour),
        enabled: !!debouncedSearchTour
    })
    console.log(getAllTour?.data,"1234");
    

    return (
    <div className='flex flex-wrap justify-between p-4 space-x-2'>
        <div className='relative w-[20rem] col-span-2 ml-5 h-[4rem]'>
        <Label
            htmlFor=''
            className='absolute z-10 p-3 text-sm text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4'
        >
            Enter Destination
        </Label>
        <Input
            className='max-w-md w-[24rem] border border-black p-2 h-[3.5rem] pt-4 pl-12'
            placeholder='Istanbul, Turkey'
            onChange={(e) => setSearchTour(e.target.value)}
        />
        <Sofa className='absolute left-3 top-[1rem] z-20 ' />
        {
            isLoading ? (
                <div className='absolute top-[4rem] left-0 w-full p-2 bg-white border border-gray-300 rounded-md shadow-md'>
                    Loading...
                </div>
            ) : (
                getAllTour && debouncedSearchTour && (
                    <div className='absolute top-[4rem] left-0 w-full p-2 bg-white border border-gray-300 rounded-md shadow-md h-32 overflow-y-auto'>
                    {getAllTour?.data
                        ?.filter((tour) => tour.name?.toLowerCase().includes(debouncedSearchTour.toLowerCase()))
                        .map((tour) => (
                        <div key={tour.id} className='p-2 cursor-pointer hover:bg-gray-100'>
                            <Link to={`/tour/${tour.id}`}>{tour.name} </Link>
                        </div>
                        ))}
                    </div>
                )
            )
        }

        </div>

      {/* Other Inputs */}
        <div className='relative w-[14rem] col-span-2 ml-5 h-[4rem]'>
        <Label
            htmlFor=''
            className='absolute p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 z-10 text-sm'
        >
            Check In
        </Label>
        <Input className='max-w-md w-[24rem] border border-black p-2 h-[3.5rem] pt-4' placeholder='Fri 12/2' />
        <CalendarDays className='absolute right-3 top-3.5' />
        </div>
        <div className='relative w-[14rem] col-span-2 ml-5 h-[4rem]'>
        <Label
            htmlFor=''
            className='absolute p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 z-10 text-sm'
        >
            Check Out
        </Label>
        <Input className='max-w-md w-[24rem] border border-black p-2 h-[3.5rem] pt-4' placeholder='Fri 20/2' />
        <CalendarDays className='absolute right-3 top-3.5' />
        </div>
   
    </div>
    )
}
