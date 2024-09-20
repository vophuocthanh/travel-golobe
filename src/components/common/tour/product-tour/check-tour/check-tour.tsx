
import {  IconSearch } from '@/common/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';

import { Label } from '@radix-ui/react-label';
import { CalendarDays, Sofa, User } from 'lucide-react';




export default function CheckTour()  {
    return (
        <div className='flex justify-between p-4 mx-8 mt-8 text-center bg-slate-100'>
            <div className='relative w-[24rem] col-span-2 ml-5 h-[4rem]'>
                <Label
                htmlFor=''
                className='absolute z-10 p-3 text-sm text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4'
                >
                Enter Destination
                </Label>
                <Input
                className='max-w-md w-[24rem] border border-black p-2 h-[3.5rem] pt-4 pl-12'
                placeholder='Istanbul, Turkey'
                />
                <Sofa className='absolute left-3 top-[1rem] z-20 ' />
            </div>
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
            <div className='relative w-[14rem] col-span-2 ml-5 h-[4rem]'>
                <Label
                htmlFor=''
                className='absolute p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 z-10 text-sm'
                >
                Rooms & Guests
                </Label>
                <Input
                className='max-w-md w-[24rem] border border-black p-2 h-[3.5rem] pt-4 pl-12'
                placeholder='1 room ,2 guest'
                />
                <User className='absolute left-3 top-3.5 z-20' />

                {/* room and guest */}
            </div>
            <Button className='h-full p-5 ' > <IconSearch /></Button>
        </div>
    )
}


