import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { AlignRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const SHEET_SIDES = ['left'] as const

type MobilePage = (typeof SHEET_SIDES)[number]

export function MobilePage() {
  return (
    <div className='grid grid-cols-2 gap-2'>
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <AlignRight />
          </SheetTrigger>
          <SheetContent side={side} className='flex flex-col w-56 gap-10 pt-10'>
            <Link to='/vehicle/coach' className='text-3xl font-bold hover:text-green-400 hover:underline'>
              Coach
            </Link>
            <Link to='/vehicle/flight' className='text-3xl font-bold hover:text-green-400 hover:underline'>
              Flight
            </Link>
            <Link to='/hotel' className='text-3xl font-bold hover:text-green-400 hover:underline'>
              Hotel
            </Link>
            <Link to='/tour' className='text-3xl font-bold hover:text-green-400 hover:underline'>
              Tour
            </Link>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
