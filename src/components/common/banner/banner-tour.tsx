import { tourApi } from '@/apis/tour.api'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'
import { Label } from '@radix-ui/react-label'
import { useQuery } from '@tanstack/react-query'
import {  Sofa } from 'lucide-react'
import {  useState } from 'react'
import { Link } from 'react-router-dom'

import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/shared/lib/utils'

interface DatePickerWithPresetsProps {
    returnDate: Date | undefined
    departDate: Date | undefined

    setReturnDate: React.Dispatch<React.SetStateAction<Date | undefined>>
    setDepartDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}

export default function BannerTour({departDate,returnDate,setReturnDate, setDepartDate}:DatePickerWithPresetsProps) {

    const [searchTour, setSearchTour] = useState<string>('')
    const debouncedSearchTour = useDebounce<string>(searchTour, 500)

    const {data: getAllTour, isLoading} = useQuery({
        queryKey: ['getAllTourSearch', debouncedSearchTour],
        queryFn: () => tourApi.getAll( 1,50, debouncedSearchTour),
        enabled: !!debouncedSearchTour
    })
    
    
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
        
        <Popover>
            <PopoverTrigger asChild>
                <Button
                variant={'outline'}
                className={cn(
                    'w-full justify-start text-left font-normal h-full',
                    !departDate && 'text-muted-foreground'
                )}
                >
                <CalendarIcon className='w-4 h-4 mr-2' />
                {departDate ? format(departDate, 'dd/MM/yyyy') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent align='start' className='flex flex-col w-auto p-2 space-y-2'>
                <div className='border rounded-md'>
                <Calendar mode='single' selected={departDate} onSelect={setDepartDate} />
                </div>
            </PopoverContent>
        </Popover>
        </div>
        <div className='relative w-[14rem] col-span-2 ml-5 h-[4rem]'>
        <Label
            htmlFor=''
            className='absolute p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 z-10 text-sm'
        >
            Check Out
        </Label>
        <Popover>
            <PopoverTrigger asChild>
                <Button
                variant={'outline'}
                className={cn(
                    'w-full justify-start text-left font-normal h-full',
                    !returnDate && 'text-muted-foreground'
                )}
                >
                <CalendarIcon className='w-4 h-4 mr-2' />
                {returnDate ? format(returnDate, 'dd/MM/yyyy') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent align='start' className='flex flex-col w-auto p-2 space-y-2'>
                <div className='border rounded-md'>
                <Calendar mode='single' selected={returnDate} onSelect={setReturnDate} />
                </div>
            </PopoverContent>
        </Popover>
        </div>
    </div>
    )
}
