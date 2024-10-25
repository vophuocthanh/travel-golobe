import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { cn } from '@/shared/lib/utils'

import { coachApi } from '@/apis/coach.api'
import { CreateCoachSchema } from '@/shared/utils/coach.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TimePicker } from 'antd'
import { format } from 'date-fns'
import { Dayjs } from 'dayjs'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

export default function RoadVehicleAdminCreate() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [startTime, setStartTime] = useState<Dayjs | null>(null)
  const [endTime, setEndTime] = useState<Dayjs | null>(null)
  const handleTimeChange = (value: Dayjs | null) => {
    if (value) {
      setStartTime(value)
    }
  }

  const handleEndTimeChange = (value: Dayjs | null) => {
    if (value) {
      setEndTime(value)
    }
  }
  const [startDay, setStartDay] = useState<Date>()
  const [endDay, setEndDay] = useState<Date>()

  const form = useForm<z.infer<typeof CreateCoachSchema>>({
    resolver: zodResolver(CreateCoachSchema),
    defaultValues: {
      brand: '',
      price: 0,
      number_of_seat: '',
      start_time: '',
      start_day: '',
      end_day: '',
      end_time: '',
      trip_time: '',
      take_place: '',
      destination: '',
      location: ''
      // image: '',
      // number_of_seats_remaining:'',
    }
  })

  const mutationCreateCoach = useMutation({
    mutationFn: (data: z.infer<typeof CreateCoachSchema>) => {
      return coachApi.addCoach(data)
    }
  })

  function onSubmit(data: z.infer<typeof CreateCoachSchema>) {
    const formattedData = {
      ...data,
      price: Number(data.price),
      start_day: startDay ? format(startDay, 'dd-mm-yyyy') : '',
      end_day: endDay ? format(endDay, 'dd-mm-yyyy') : '',
      start_time: startTime ? startTime.format('HH:mm') : '',
      end_time: endTime ? endTime.format('HH:mm') : ''
    }
    mutationCreateCoach.mutate(formattedData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getCoachAll'] })
        toast.success('Thêm chuyến xe thành công')
        navigate('/admin/road-vehicle')
      },
      onError: () => {
        toast.error('Thêm chuyến xe thất bại')
      }
    })
  }

  return (
    <div className='w-full h-full p-2'>
      <div className='flex items-center gap-2 mb-6'>
        <Button onClick={() => navigate('/admin/road-vehicle')} className='text-white'>
          Quay lại
        </Button>
        <h1 className='text-3xl font-bold text-gray-800'>Thêm chuyến xe</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='p-6 space-y-6 bg-white rounded-lg shadow-md'>
          <FormField
            control={form.control}
            name='brand'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-medium'>Tên nhà xe</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Nhập tên nhà xe'
                    {...field}
                    className='border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                  />
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
                <FormLabel className='font-medium'>Giá</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='Nhập giá'
                    {...field}
                    className='border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='number_of_seat'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-medium'>Số ghế</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Nhập số ghế'
                    {...field}
                    className='border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                  />
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
                  <FormLabel className='mr-[3rem]'>Nhập ngày bắt đầu</FormLabel>
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
                        <Calendar
                          mode='single'
                          selected={startDay}
                          onSelect={(date) => {
                            setStartDay(date)
                            field.onChange(date ? format(date, 'dd-MM-yyyy') : '')
                          }}
                          initialFocus
                        />
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
                  <FormLabel className='mr-[3rem]'>Nhập ngày kết thúc</FormLabel>
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
                        <Calendar
                          mode='single'
                          selected={endDay}
                          onSelect={(date) => {
                            setEndDay(date)
                            field.onChange(date ? format(date, 'dd-MM-yyyy') : '')
                          }}
                          initialFocus
                        />
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
              render={({ field }) => (
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
                        <TimePicker
                          onChange={(time) => {
                            handleTimeChange(time)
                            field.onChange(time ? time.format('HH:mm') : '')
                          }}
                          format={'HH:mm'}
                        />
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
              render={({ field }) => (
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
                        <TimePicker
                          onChange={(time) => {
                            handleEndTimeChange(time)
                            field.onChange(time ? time.format('HH:mm') : '')
                          }}
                          format={'HH:mm'}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='trip_time'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-medium'>Thời gian chuyến đi</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Nhập thời gian chuyến đi'
                    {...field}
                    className='border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                  />
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
                <FormLabel className='font-medium'>Nơi đón</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Nhập nơi đón'
                    {...field}
                    className='border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                  />
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
                <FormLabel className='font-medium'>Điểm đến</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Nhập điểm đến'
                    {...field}
                    className='border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-medium'>Vị trí</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Nhập vị trí'
                    {...field}
                    className='border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
                        control={form.control}
                        name='image'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-medium'>Ảnh coach</FormLabel>
                                <FormControl>
                                    <Input placeholder='Nhập đường dẫn ảnh' {...field} className='border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}
          {/* <FormField
                        control={form.control}
                        name='number_of_seats_remaining' 
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-medium'>Số ghế còn lại</FormLabel>
                                <FormControl>
                                    <Input 
                                        type='number' 
                                        placeholder='Nhập số ghế còn lại' 
                                        {...field} 
                                        className='border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300' 
                                        min={0} 
                                        onWheel={(e) => e.currentTarget.blur()} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}
          <Button type='submit' className='flex px-4 py-2 ml-auto text-white'>
            Thêm
          </Button>
        </form>
      </Form>
    </div>
  )
}
