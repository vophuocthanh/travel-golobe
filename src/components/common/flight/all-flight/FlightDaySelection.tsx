import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/shared/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  day: string
  setDay: Dispatch<SetStateAction<string>>
}

const FlightDaySelection: React.FC<Props> = ({ day, setDay }) => {
  const handleSelect = (selectedDate?: Date) => {
    if (selectedDate) {
      setDay(format(selectedDate, 'dd-MM-yyyy'))
    } else {
      setDay('')
    }
  }

  return (
    <div className='mb-[2rem]'>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-[240px] justify-start text-left font-normal shadow-md transition duration-300 ease-in-out hover:shadow-lg hover:bg-gray-100',
              !day && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2' />
            {day ? day : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-4 mt-2 bg-white rounded-lg shadow-lg'>
          <Calendar
            mode='single'
            selected={day ? new Date(day.split('-').reverse().join('-')) : undefined}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default FlightDaySelection
