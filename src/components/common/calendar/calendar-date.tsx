'use client'

import * as React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/shared/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
interface DatePickerWithRangeProps {
  date: DateRange | undefined
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
  className: string | undefined
}
export function DatePickerWithRange({ className, date, setDate }: DatePickerWithRangeProps) {
  return (
    <div className={cn('grid gap-2 ', className)}>
      <Popover>
        <PopoverTrigger asChild className=''>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-[260px] border-none justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='w-4 h-4 mr-2' />
            {date?.from ? (
              date.to ? (
                <>
                  Từ :{format(date.from, 'dd-MM-yyyy')} - đến :{format(date.to, 'dd-MM-yyyy')}
                </>
              ) : (
                format(date.from, 'dd-MM-yyyy')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
