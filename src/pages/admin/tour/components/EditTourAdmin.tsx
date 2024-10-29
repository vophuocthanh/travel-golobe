import { tourApi } from '@/apis/tour.api'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/shared/lib/utils'
import { UpdateTourSchema } from '@/shared/utils/tour.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ArrowLeftToLine, CalendarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

export default function EditTourAdmin() {
  const { id } = useParams()
  const { data: getbyId } = useQuery({
    queryKey: ['getById', id],
    queryFn: () => tourApi.getById(id)
  })

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof UpdateTourSchema>>({
    resolver: zodResolver(UpdateTourSchema),
    defaultValues: {
      name: '',
      ideal_time: '',
      voucher: '',
      price: 0,
      start_date: '',
      end_date: '',
      description: '',
      time_trip: '',
      baby_price: 0,
      child_price: 0,
      adult_price: 0,
      image: '',
      image_2: '',
      image_3: '',
      image_4: '',
      image_5: '',
      starting_gate: '',
      sight_seeing: '',
      cuisine: '',
      suitable: '',
      rating: 0,
      number_of_seats_remaining: 0
    }
  })
  const { reset } = form
  useEffect(() => {
    if (getbyId) {
      reset({
        name: getbyId?.name,
        ideal_time: getbyId?.ideal_time ?? undefined,
        voucher: getbyId?.voucher ?? undefined,
        price: getbyId?.price,
        start_date: getbyId?.start_date,
        end_date: getbyId?.end_date,
        description: getbyId?.description,
        time_trip: getbyId?.time_trip,
        baby_price: getbyId?.baby_price,
        child_price: getbyId?.child_price,
        adult_price: getbyId?.adult_price,
        image: getbyId?.image ?? '',
        image_2: getbyId?.image_2 ?? '',
        image_3: getbyId?.image_3 ?? '',
        image_4: getbyId?.image_4 ?? '',
        image_5: getbyId?.image_5 ?? '',
        starting_gate: getbyId?.starting_gate ?? '',
        sight_seeing: getbyId?.sight_seeing ?? '',
        cuisine: getbyId?.cuisine ?? undefined,
        suitable: getbyId?.suitable ?? undefined,
        rating: getbyId?.rating,
        number_of_seats_remaining: getbyId?.number_of_seats_remaining ?? 0
      })
    }
  }, [getbyId, reset])
  const [startDate, setDatrtDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const mutationUpdateTour = useMutation({
    mutationFn: (data: z.infer<typeof UpdateTourSchema>) => tourApi.updateTour(id, data)
  })

  const queryClient = useQueryClient()
  function onSubmit(data: z.infer<typeof UpdateTourSchema>) {
    setLoading(true)

    const formattedData = {
      ...data,
      price: Number(data.price),
      start_date: startDate ? format(startDate, 'dd-MM-yyyy') : '',
      end_date: endDate ? format(endDate, 'dd-MM-yyyy') : ''
    }

    mutationUpdateTour.mutate(formattedData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getUpdateTourAll'] })
        toast.success('Update tour success')
        navigate('/admin/tours')
      },
      onError: () => {
        toast.error('Update tour failed')
      },
      onSettled: () => {
        setLoading(false)
      }
    })
  }

  const handleBack = () => {
    navigate('/admin/tours')
  }

  return (
    <div className='w-full p-2'>
      <div className='flex items-center gap-4'>
        <Button className='flex mb-4 text-white' onClick={handleBack}>
          <ArrowLeftToLine />
        </Button>
        <h1 className='mb-2 text-2xl font-bold'>Chỉnh sửa tour {id}</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='p-4 bg-white rounded-lg shadow'>
            <h2 className='text-xl font-bold '>Ảnh tour</h2>
            <div className='grid grid-cols-4 gap-4 mb-4'>
              <div className='w-full col-span-1 p-2 mt-6 bg-white rounded-lg shadow-md h-[20rem]'>
                <img src={getbyId?.image} alt='hotel' className='w-full h-full' />
              </div>
              <div className='w-full col-span-1 p-2 mt-6 bg-white rounded-lg shadow-md h-[20rem]'>
                <img src={getbyId?.image_2 ?? undefined} alt='hotel' className='w-full h-full' />
              </div>
              <div className='w-full col-span-1 p-2 mt-6 bg-white rounded-lg shadow-md h-[20rem]'>
                <img src={getbyId?.image_3 ?? undefined} alt='hotel' className='w-full h-full' />
              </div>
              <div className='w-full col-span-1 p-2 mt-6 bg-white rounded-lg shadow-md h-[20rem]'>
                <img src={getbyId?.image_4 ?? undefined} alt='hotel' className='w-full h-full' />
              </div>
            </div>
          </div>

          <div className='p-4 bg-white rounded-lg shadow'>
            <h2 className='mb-4 text-xl font-bold'>Thông tin tour</h2>
            <div className='grid grid-cols-2 gap-x-6 gap-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên tour</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Tour Name' {...field} />
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
                    <FormLabel>Số tiền</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Price' {...field} />
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
                    <FormLabel>Ảnh</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Ảnh 1' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='image_2'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ảnh 2</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Ảnh 2' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='image_3'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ảnh 3</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Ảnh 3' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='image_4'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ảnh 4</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Ảnh 4' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='image_5'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ảnh 5</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Ảnh 5' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='start_date'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày bắt đầu</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Ngày bắt đầu' {...field} />
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
                    <FormLabel>Ngày kết thúc</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Ngày kết thúc' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='starting_gate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nơi khởi hành</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Nhập nơi khởi hành' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='sight_seeing'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa điểm tham quan</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Sight Seeing' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='cuisine'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ẩm thực</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Nhập ẩm thực' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='suitable'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Đối tượng thích hợp</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Nhập đối tượng thích hợp' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='ideal_time'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thời gian lý tưởng</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Nhập thời gian lý tưởng' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='voucher'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giảm giá</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Nhập vchouer' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='time_trip'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thời gian chuyến đi</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Nhập thời gian chuyến đi' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='baby_price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá trẻ em</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Nhập giá em bé' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='child_price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá trẻ em từ 2 - 12 tuổi</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Mhập giá trẻ em' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='adult_price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá người lớn</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Adult price' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='rating'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Đánh giá</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Nhập số lượng đánh giá' {...field} />
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
                    <FormLabel>Số chỗ còn lại</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Nhập số chỗ còn lại' {...field} />
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
                            <Calendar
                              mode='single'
                              selected={startDate}
                              onSelect={setDatrtDate}
                              initialFocus
                              {...field}
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
            </div>
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
