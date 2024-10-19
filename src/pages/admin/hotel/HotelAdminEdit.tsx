import { hotelApi } from '@/apis/hotel.api'
import { hoteldetail1 } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HotelUpdateSchema } from '@/shared/utils/hotel.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeftToLine, CirclePlus } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

export default function HotelAdminEdit() {
  const { id } = useParams()
  const { data: getbyId } = useQuery({
    queryKey: ['getById', id],
    queryFn: () => hotelApi.getById(id)
  })

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof HotelUpdateSchema>>({
    resolver: zodResolver(HotelUpdateSchema),
    defaultValues: {
      hotel_names: '',
      location: '',
      star_number: 0,
      price: 0,
      score_hotels: 0,
      number_rating: 0,
      received_time: '',
      giveback_time: '',
      description: '',
      hotel_link: '',
      place: '',
      image: '',
      image_2: '',
      image_3: '',
      image_4: '',
      image_5: '',
      number_of_seats_remaining: 0,
    }
  })

  const { reset } = form

  useEffect(() => {
    if (getbyId) {
      reset({
        hotel_names: getbyId.hotel_names,
        location: getbyId.location,
        star_number: getbyId.star_number,
        price: getbyId.price,
        score_hotels: getbyId.score_hotels,
        number_rating: getbyId.number_rating,
        received_time: getbyId.received_time,
        giveback_time: getbyId.giveback_time,
        description: getbyId.description ?? undefined,
        hotel_link: getbyId.hotel_link,
        place: getbyId.place,
        image: getbyId.image ?? undefined,
        image_2: getbyId.image_2 ?? undefined,
        image_3: getbyId.image_3 ?? undefined,
        image_4: getbyId.image_4 ?? undefined,
        image_5: getbyId.image_5 ?? undefined,
        number_of_seats_remaining: getbyId.number_of_seats_remaining
      })
    }
  }, [getbyId, reset])

  const mutationUpdateHotel = useMutation({
    mutationFn: (data: z.infer<typeof HotelUpdateSchema>) => hotelApi.updateHotel(id, data)
  })

  const queryClient = useQueryClient()

  function onSubmit(data: z.infer<typeof HotelUpdateSchema>) {
    setLoading(true)

    const formattedData = {
      ...data,
      description: data.description || '',
      price: Number(data.price),
    }

    mutationUpdateHotel.mutate(formattedData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getUpdateTourAll'] })
        toast.success('Update hotel success')
        navigate('/admin/hotels')
      },
      onError: () => {
        toast.error('Update hotel failed')
      },
      onSettled: () => {
        setLoading(false)
      }
    })
  }

  const handleBack = () => {
    navigate('/admin/hotels')
  }

  return (
    <div className='w-full p-2'>
      <h1 className='mb-2 text-2xl font-bold'>EDIT HOTEL {id}</h1>
      <Button className='flex mb-4 mr-auto text-white' onClick={handleBack}>
        <ArrowLeftToLine />
      </Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='p-4 bg-white rounded-lg shadow'>
            <h2 className='text-xl font-bold '>Hotel Image</h2>
            <div className='grid grid-cols-4 gap-4 mb-4'>
              <div className='w-full col-span-1 p-2 mt-6 bg-white rounded-lg shadow-md h-[20rem]'>
                <img src={hoteldetail1} alt='hotel' className='w-full h-full' />
              </div>
              <div className='w-full col-span-1 p-2 mt-6 bg-white rounded-lg shadow-md h-[20rem]'>
                <img src={hoteldetail1} alt='hotel' className='w-full h-full' />
              </div>
              <div className='w-full col-span-1 p-2 mt-6 bg-white rounded-lg shadow-md h-[20rem]'>
                <div className='flex items-center justify-center h-full cursor-pointer'>
                  <div>
                    <div className='flex justify-center mb-2'>
                      <CirclePlus />
                    </div>
                    <p className='text-blue-600'>
                      Click to upload<span className='text-black'> or drag and drop</span>{' '}
                    </p>
                    <p>SVG, PNG, or PDF 800 x 400 px</p>
                  </div>
                </div>
              </div>
              <div className='w-full col-span-1 p-2 mt-6 bg-white rounded-lg shadow-md h-[20rem]'>
                <div className='flex items-center justify-center h-full cursor-pointer'>
                  <div>
                    <div className='flex justify-center mb-2'>
                      <CirclePlus />
                    </div>
                    <p className='text-blue-600'>
                      Click to upload<span className='text-black'> or drag and drop</span>{' '}
                    </p>
                    <p>SVG, PNG, or PDF 800 x 400 px</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='p-4 bg-white rounded-lg shadow'>
            <h2 className='mb-4 text-xl font-bold'>Hotel Information</h2>
            <div className='grid grid-cols-2 gap-x-6 gap-y-4'>
              <FormField
                control={form.control}
                name='hotel_names'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hotel Name</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Hotel Name' {...field} />
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
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Location' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='star_number'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Star Rating</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='Star Rating' {...field} />
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
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='Price' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='score_hotels'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hotel Score</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='Hotel Score' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='number_rating'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Ratings</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='Number of Ratings' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className='flex justify-center text-white'>
            <Button type='button' className='w-[20rem] flex mx-auto' onClick={handleBack}>
              Cancel
            </Button>
            <Button type='submit' className='w-[20rem] flex mx-auto' disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
