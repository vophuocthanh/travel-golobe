import {banner_tour} from '@/assets/images'
import { IconAdd,IconPlaces } from '@/common/icons'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { CalendarDays, Sofa, User } from 'lucide-react'




export default function BannerTour()  {
    return (
        <div className='relative w-full mb-40'>
            <div className='relative '>
                <img className='w-full h-[500px]  ' src={banner_tour} alt="" />
                <div className='absolute top-0 w-5/12 p-32 text-white'>
                    <h3 className='mb-4 text-5xl font-normal'>Make your travel whishlist, we’ll do the rest</h3>
                    <p>Special offers to suit your plan</p>
                </div>
                <div className='absolute top-[440px] w-full px-32'> 
                    <div className='px-3 py-3 bg-gray-100 h-50 rounded-2xl'>
                        <div className='w-full '>
                            <h3 className='mb-5 text-lg font-medium '>Where are you tour?</h3>
                            <div className='flex justify-between mb-3'>
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
                            </div>
                            <div className='flex justify-end'>
                                <div className='flex p-2 mr-5 border rounded-lg border-primary hover:bg-slate-200'>                                    
                                    <div className='mr-2'><IconAdd  /></div>
                                    Add Promo Code
                                </div>
                                <div className='flex items-center p-2 border rounded-lg border-primary hover:bg-slate-200'>
                                    <div className='mr-2'><IconPlaces  /></div>
                                    Show Places
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


