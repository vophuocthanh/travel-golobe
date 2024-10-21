import { flightApi } from '@/apis/flight.api'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { cn } from '@/shared/lib/utils'
import { CreateFlightSchema } from '@/shared/utils/flight.shema'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import TimePicker from 'antd/es/time-picker'
import { format } from 'date-fns'
import { CalendarIcon, ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Dayjs } from 'dayjs'
export default function CreateFlightAdmin() {
  const [startTime, setStartTime] = useState<Dayjs | null>(null) // Update type to Dayjs
  const [endTime, setEndTime] = useState<Dayjs | null>(null) // Update type to Dayjs

  const handleTimeChange = (value: Dayjs | null) => {
    if (value) {
      setStartTime(value)
    }
  }

  const handleEndTimeChange = (value: Dayjs | null) => {
    if (value) {
      setEndTime(value) // Set end time from TimePicker
    }
  }

  const [startDay, setStartDay] = useState<Date>()
  const [endDay, setEndDay] = useState<Date>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof CreateFlightSchema>>({
    resolver: zodResolver(CreateFlightSchema),
    defaultValues: {
      brand: '',
      price: 0,
      start_time: '',
      start_day: '',
      end_day: '',
      end_time: '',
      trip_time: '',
      take_place: '',
      destination: '',
      trip_to: '',
      image: ''
    }
  })

  const mutationCreateTour = useMutation({
    mutationFn: (data: z.infer<typeof CreateFlightSchema>) => flightApi.addFlight(data)
  })
  console.log(mutationCreateTour, 'mutationCreateTour')

  function onSubmit(data: z.infer<typeof CreateFlightSchema>) {
    setLoading(true)
    console.log('123')
    console.log(data, 'data')

    const formattedData = {
      ...data,
      price: Number(data.price),
      start_day: startDay ? format(startDay, 'dd-mm-yyyy') : '',
      end_day: endDay ? format(endDay, 'dd-mm-yyyy') : '',
      start_time: startTime ? startTime.format('HH:mm') : '',
      end_time: endTime ? endTime.format('HH:mm') : ''
    }
    mutationCreateTour.mutate(formattedData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getAllFlight'] })
        toast.success('Create tour success')
        navigate('/admin/flights')
      },
      onError: () => {
        toast.error('Create tour failed')
      },
      onSettled: () => {
        setLoading(false)
      }
    })
  }
  return (
    <div className='w-full h-full'>
      <div className='flex items-center gap-2'>
        <Link to='/admin/flights' className='flex items-center gap-4 px-4 py-2 bg-gray-200 rounded-md'>
          <ChevronLeft />
          <span>Quay lại</span>
        </Link>
        <h1 className='ml-6 text-3xl font-bold'>Tạo FLight</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full p-2 mb-10 space-y-6'>
          <FormField
            control={form.control}
            name='brand'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên Brand</FormLabel>
                <FormControl>
                  <Input placeholder='Nhập brand' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='destination'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination</FormLabel>
                <FormControl>
                  <Input placeholder='Nhập destination' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='image'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ảnh tour</FormLabel>
                <FormControl>
                  <Input placeholder='Nhập image' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nhập số tiền</FormLabel>
                <FormControl>
                  <Input placeholder='Nhâp số tiền' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='take_place'
            render={({ field }) => (
              <FormItem>
                <FormLabel>take_place</FormLabel>
                <FormControl>
                  <Input placeholder='Nhập take_placeid của hotel' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='trip_to'
            render={({ field }) => (
              <FormItem>
                <FormLabel>trip_to</FormLabel>
                <FormControl>
                  <Input placeholder='Nhập trip_to' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='trip_time'
            render={({ field }) => (
              <FormItem>
                <FormLabel>trip_time</FormLabel>
                <FormControl>
                  <Input placeholder='Nhập trip_time' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex items-center gap-2'>
            <FormField
              control={form.control}
              name='start_day'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='mr-6'>Nhập ngày bắt đầu</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[280px] justify-start text-left font-normal',
                            !startDay && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className='w-4 h-4 mr-2' />
                          {startDay ? format(startDay, 'dd-MM-yyyy') : <span>Pick a startDay</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <Calendar mode='single' selected={startDay} onSelect={setStartDay} initialFocus {...field} />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='end_day'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='mr-6'>Nhập ngày kết thúc</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[280px] justify-start text-left font-normal',
                            !endDay && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className='w-4 h-4 mr-2' />
                          {endDay ? format(endDay, 'dd-MM-yyyy') : <span>Pick a endDay</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <Calendar mode='single' selected={endDay} onSelect={setEndDay} initialFocus {...field} />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex items-center gap-2'>
            <FormField
              control={form.control}
              name='start_time'
              render={() => (
                <FormItem>
                  <FormLabel className='mr-6'>Nhập thời gian bắt đầu</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[280px] justify-start text-left font-normal',
                            !startTime && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className='w-4 h-4 mr-2' />
                          {startTime ? startTime.format('HH:mm') : <span>Pick a start time</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-full p-0'>
                        <TimePicker onChange={handleTimeChange} />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='end_time'
              render={() => (
                <FormItem>
                  <FormLabel className='mr-6'>Nhập thời gian kết thúc</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[280px] justify-start text-left font-normal',
                            !endTime && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className='w-4 h-4 mr-2' />
                          {endTime ? endTime.format('HH:mm') : <span>Pick an end time</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-full p-0'>
                        <TimePicker onChange={handleEndTimeChange} />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit' loading={loading} className='flex ml-auto'>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
