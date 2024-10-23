import { flightApi } from '@/apis/flight.api'
import { hotelApi } from '@/apis/hotel.api'
import { tourApi } from '@/apis/tour.api'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/shared/lib/utils'
import { FlightResponseType, HotelResponseType } from '@/shared/ts/interface/data.interface'
import { CreateTourSchema } from '@/shared/utils/tour.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import dayjs from 'dayjs'
import { CalendarIcon, ChevronLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

export default function CreateTourAdmin() {
  const [startDate, setDatrtDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)
  const [pageHotel, setPageHotel] = useState(1)
  const [pageFlight, setPageFlight] = useState(1)
  const [hotels, setHotels] = useState<HotelResponseType[]>([])
  const [flights, setFlights] = useState<FlightResponseType[]>([])

  const form = useForm<z.infer<typeof CreateTourSchema>>({
    resolver: zodResolver(CreateTourSchema),
    defaultValues: {
      name: '',
      description: '',
      image: '',
      price: 0,
      hotelId: '',
      flightId: '',
      start_date: '',
      end_date: ''
    }
  })

  const mutationCreateTour = useMutation({
    mutationFn: (data: z.infer<typeof CreateTourSchema>) => tourApi.addTour(data)
  })

  function onSubmit(data: z.infer<typeof CreateTourSchema>) {
    setLoading(true)

    const formattedData = {
      ...data,
      price: Number(data.price),
      start_date: startDate ? format(startDate, 'dd-mm-yyyy') : '',
      end_date: endDate ? format(endDate, 'dd-mm-yyyy') : ''
    }
    mutationCreateTour.mutate(formattedData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getTourAll'] })
        toast.success('Create tour success')
        navigate('/admin/tours')
      },
      onError: () => {
        toast.error('Create tour failed')
      },
      onSettled: () => {
        setLoading(false)
      }
    })
  }

  const { data: getAllFlight } = useQuery({
    queryKey: ['getAllFlightAdmin', pageFlight],
    queryFn: () => flightApi.getAll(pageFlight, 20)
  })

  const {
    data: getAllHotelAdmin,
    isFetching,
    isError
  } = useQuery({
    queryKey: ['getAllHotelAdmin', pageHotel],
    queryFn: () => hotelApi.getAll(pageHotel, 20),
    refetchOnWindowFocus: true // true thì ví dụ qua route, xong vào lại thì nó load lại data, còn mà false là khi vào route thì nó ko load lại data, nó chỉ load từ cái data mà hồi nãy đã fetch truớc khi ra khỏi route khác. lưu ý là trường hợp là dùng staleTime thi true nó vẫn như false.
    // staleTime: 5 * 60 * 1000 //Là khoảng thời gian mà dữ liệu được coi là mới và sẽ không bị refetch từ server. Ở đây, nó được đặt là 5 phút (5 * 60 * 1000), nghĩa là trong vòng 5 phút kể từ lần fetch gần nhất, dữ liệu sẽ không được fetch lại, thay vào đó nó lấy từ cache.
  })

  useEffect(() => {
    if (getAllHotelAdmin?.data) {
      setHotels((prev) => [...prev, ...getAllHotelAdmin.data])
    }
  }, [getAllHotelAdmin])

  useEffect(() => {
    if (getAllFlight?.data) {
      setFlights((prev) => [...prev, ...getAllFlight.data])
    }
  }, [getAllFlight])

  const loadMore = () => {
    setPageHotel((prevPage) => prevPage + 1)
  }

  const loadMoreFlight = () => {
    setPageFlight((prevPage) => prevPage + 1)
  }

  if (isError) {
    return <div>Error loading hotels</div>
  }

  return (
    <div className='w-full h-full'>
      <div className='flex items-center gap-2'>
        <Link to='/admin/tours' className='flex items-center gap-4 px-4 py-2 bg-gray-200 rounded-md'>
          <ChevronLeft />
          <span>Quay lại</span>
        </Link>
        <h1 className='ml-6 text-3xl font-bold'>Tạo tour</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full p-2 mb-10 space-y-6'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên tour</FormLabel>
                <FormControl>
                  <Input placeholder='Nhập tên tour' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả tour</FormLabel>
                <FormControl>
                  <Textarea placeholder='Nhập mô tả tour' {...field} className='h-72' />
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
            name='hotelId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID của hotel</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select a hotel' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Hotel</SelectLabel>
                        <InfiniteScroll
                          dataLength={hotels.length}
                          next={loadMore}
                          hasMore={!isFetching && getAllHotelAdmin?.data?.length === 20}
                          loader={<h4>Loading more hotels...</h4>}
                          height={200}
                          endMessage={<p>You have seen all hotels</p>}
                        >
                          {hotels.map((hotel) => (
                            <SelectItem key={hotel.id} value={hotel.id || ''}>
                              {hotel?.hotel_names} - {hotel?.place}
                            </SelectItem>
                          ))}
                        </InfiniteScroll>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name='flightId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID của flight</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select a flight' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Flights</SelectLabel>
                        {getAllFlight?.data
                          ?.filter((flight) => flight.id)
                          .map((flight) => (
                            <SelectItem key={flight.id} value={flight.id || ''}>
                              {dayjs(flight.start_day).format('DD/MM/YYYY')} -{' '}
                              {dayjs(flight.end_day).format('DD/MM/YYYY')} - {flight.trip_to}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name='flightId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID của flight</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select a flight' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Flight</SelectLabel>
                        <InfiniteScroll
                          dataLength={flights.length}
                          next={loadMoreFlight}
                          hasMore={!isFetching && getAllFlight?.data?.length === 20}
                          loader={<h4>Loading more flight...</h4>}
                          height={200}
                          endMessage={<p>You have seen all flight</p>}
                        >
                          {flights.map((flight) => (
                            <SelectItem key={flight.id} value={flight.id || ''}>
                              {dayjs(flight.start_day).format('DD/MM/YYYY')} -{' '}
                              {dayjs(flight.end_day).format('DD/MM/YYYY')} - {flight.trip_to}
                            </SelectItem>
                          ))}
                        </InfiniteScroll>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex items-center gap-2'>
            <FormField
              control={form.control}
              name='start_date'
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
                            !startDate && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className='w-4 h-4 mr-2' />
                          {startDate ? format(startDate, 'dd-MM-yyyy') : <span>Pick a startDate</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <Calendar mode='single' selected={startDate} onSelect={setDatrtDate} initialFocus {...field} />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='end_date'
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
                            !endDate && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className='w-4 h-4 mr-2' />
                          {endDate ? format(endDate, 'dd-MM-yyyy') : <span>Pick a endDate</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <Calendar mode='single' selected={endDate} onSelect={setEndDate} initialFocus {...field} />
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
