
import { IconCheckin, IconCheckout, IconRoom, IconSearch, IconTour } from '@/common/icons'
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


export default function CheckTour()  {
    return (
        <div className='flex justify-between p-4 mx-8 mt-8 bg-slate-100'>
            {
                dataTour.map((item) => (
                    <div key={item.id}>
                        <Label>{item.title}</Label>
                        <Input placeholder={item.text} icon={item.icon}  /> 
                    </div>
                ))
            }
            <Button className='h-full p-5 ' > <IconSearch /></Button>
        </div>
    )
}


