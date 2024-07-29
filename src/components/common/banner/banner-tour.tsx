import {banner_tour} from '@/assets/images'
import { IconAdd, IconPlaces } from '@/common/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function BannerTour()  {
    return (
        <div className='relative w-full mb-40'>
            <div className='relative '>
                <img className='w-full h-[500px]  ' src={banner_tour} alt="" />
                <div className='absolute top-0 w-5/12 p-32 text-white'>
                    <h3 className='mb-4 text-5xl font-normal'>Make your travel whishlist, we’ll do the rest</h3>
                    <p>Special offers to suit your plan</p>
                </div>
                <div className='absolute top-[430px] w-full px-32'> 
                    <div className='h-40 px-3 py-3 bg-gray-100 rounded-2xl'>
                        <div className='w-full '>
                            <h3 className='mb-4 text-lg font-medium '>Where are you flying?</h3>
                            <div className='flex gap-2 mb-4'>
                                <Input />
                                <Input />
                                <Input />
                                <Input />
                            </div>
                            <div className='flex justify-end'>
                                <Button className='p-2 mr-5 bg-white hover:bg-slate-200'>
                                    
                                    <div className='mr-2'><IconAdd  /></div>
                                    Add Promo Code
                                </Button>
                                <Button>
                                    <div className='mr-2'><IconPlaces  /></div>
                                    Show Places
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


