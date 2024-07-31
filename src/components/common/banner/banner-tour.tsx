import {banner_tour} from '@/assets/images'
import { IconAdd, IconCheckin, IconCheckout, IconPlaces, IconRoom, IconTour } from '@/common/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'

const dataTour = [
    {
        id: 1,
        icon: <IconTour />,
        title: 'Enter Destination',
        text: 'Istanbul, Turkey',
    },
    {
        id: 2,
        icon: <IconCheckin />,
        title: 'Check In',
        text: 'Fri 12/2',
    },
    {
        id: 1,
        icon: <IconCheckout />,
        title: 'Check Out',
        text: 'Sun 12/4',
    },
    {
        id: 1,
        icon: <IconRoom />,
        title: 'Rooms & Guests',
        text: '1 room, 2 guests',
    }
]
console.log(dataTour);


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
                    <div className='px-3 py-3 bg-gray-100 h-44 rounded-2xl'>
                        <div className='w-full '>
                            <h3 className='mb-2 text-lg font-medium '>Where are you flying?</h3>
                            <div className='flex justify-between mb-3'>
                                {
                                    dataTour.map((item) => (
                                        <div>
                                            <Label>{item.title}</Label>
                                            <Input placeholder={item.text} icon={item.icon}  /> 
                                        </div>
                                    ))
                                }
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


