import { flightApi } from '@/apis/flight.api'
import { Button } from '@/components/ui/button'
import { UpdateFlightSchema } from '@/shared/utils/flight.shema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
// import { format } from 'date-fns'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/shared/lib/utils'
import TimePicker from 'antd/es/time-picker'
import { Dayjs } from 'dayjs'
import { ArrowLeftToLine, CalendarIcon } from 'lucide-react'
import { toast } from 'react-toastify'
// import { Calendar } from '@/components/ui/calendar'

const EditAdminFlight = () => {
  const { id } = useParams()
  const { data: getbyId } = useQuery({
    queryKey: ['getById', id],
    queryFn: () => flightApi.getById(id)
  })
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof UpdateFlightSchema>>({
    resolver: zodResolver(UpdateFlightSchema),
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
      image: '',
      number_of_seats_remaining: 0
    }
  })
  const { reset } = form
  useEffect(() => {
    if (getbyId) {
      reset({
        brand: getbyId?.brand,
        price: getbyId?.price,
        start_day: getbyId?.start_day,
        end_day: getbyId?.end_day,
        start_time: getbyId?.start_time,
        end_time: getbyId?.end_time,
        trip_time: getbyId?.trip_time,
        take_place: getbyId?.take_place,
        destination: getbyId?.destination,
        trip_to: getbyId?.trip_to,
        image: getbyId?.image,
        number_of_seats_remaining: getbyId?.number_of_seats_remaining ?? 0
      })
    }
  }, [getbyId, reset])

  // const [startDay, setStartDay] = useState<Date>()
  // const [endDay, setEndDay] = useState<Date>()
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
  const mutationUpdateFlight = useMutation({
    mutationFn: (data: z.infer<typeof UpdateFlightSchema>) => flightApi.putFlight(id, data)
  })
  const queryClient = useQueryClient()
  function onSubmit(data: z.infer<typeof UpdateFlightSchema>) {
    setLoading(true)

    const formattedData = {
      ...data,
      price: Number(data.price),
      // start_day: startDay ? format(startDay, 'dd-MM-yyyy') : '',
      // end_day: endDay ? format(endDay, 'dd-MM-yyyy') : '',
      start_time: startTime ? startTime.format('HH:mm') : '',
      end_time: endTime ? endTime.format('HH:mm') : ''
    }

    mutationUpdateFlight.mutate(formattedData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getUpdateFlightAll'] })
        toast.success('Update FLight success')
        navigate('/admin/flights')
      },
      onError: () => {
        toast.error('Update FLight failed')
      },
      onSettled: () => {
        setLoading(false)
      }
    })
  }
  const handleBack = () => {
    navigate('/admin/flights')
  }

  return (
    <div className='w-full p-2'>
      <h1 className='mb-2 text-2xl font-bold'>EDIT FLight {id}</h1>
      <Button className='flex mb-4 mr-auto text-white' onClick={handleBack}>
        <ArrowLeftToLine />
      </Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
            name='number_of_seats_remaining'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nhập số chỗ </FormLabel>
                <FormControl>
                  <Input placeholder='Nhâp number_of_seats_remaining' {...field} />
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
          {/* <div className='flex items-center gap-2'>
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
          </div> */}
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
          <div className='flex justify-center text-white'>
            <Button type='button' className='w-[20rem] flex mx-auto' onClick={handleBack}>
              Cancel
            </Button>
            <Button type='submit' loading={loading} className='w-[20rem] flex mx-auto'>
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default EditAdminFlight
