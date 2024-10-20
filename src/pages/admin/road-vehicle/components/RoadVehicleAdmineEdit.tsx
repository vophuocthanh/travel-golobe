import { coachApi } from '@/apis/coach.api'
import { coachdetail1, coachdetail2 } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeftToLine, CirclePlus } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { UpdateCoachSchema } from '@/shared/utils/coach.schema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'


export default function RoadVehicleAdminEdit() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: getbyId } = useQuery({
    queryKey: ['getById', id],
    queryFn: () => coachApi.getById(id)
  })

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof UpdateCoachSchema>>({
    resolver: zodResolver(UpdateCoachSchema),
    defaultValues: {
      brand: '',
      number_of_seat:'',
      start_time: '',
      start_day: '',
      end_time: '',
      end_day: '',
      trip_time: '',
      take_place: '',
      destination: '',
      location: '',
      price: 0,
      image: '',
      number_of_seats_remaining: 0,
    }
  })
  const { reset, handleSubmit, register } = form

  useEffect(() => {
    if (getbyId){
      reset({
        brand: getbyId.brand,
        price: getbyId.price,
        number_of_seat: getbyId.number_of_seat,
        start_time: getbyId.start_time,
        start_day: getbyId.start_day,
        end_time: getbyId.end_time,
        end_day: getbyId.end_day,
        trip_time: getbyId.trip_time,
        take_place: getbyId.take_place,
        destination: getbyId.destination,
        location: getbyId.location,
        number_of_seats_remaining: getbyId.number_of_seats_remaining,
      })
    }
  }, [getbyId, reset])

  const queryClient = useQueryClient()

  const mutationUpdateVehicle = useMutation({
    mutationFn: (data: z.infer<typeof UpdateCoachSchema>) => coachApi.putCoach(id, data),
  })

  const onSubmit = (data: z.infer<typeof UpdateCoachSchema>) => {
    setLoading(true)
    const formattedData = {
      ...data,
      price: Number(data.price),
      number_of_seats_remaining: Number(data.number_of_seats_remaining),
    }

    mutationUpdateVehicle.mutate(formattedData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getUpdateTourAll'] })
        toast.success('Update road vehicle success')
        navigate('/admin/road-vehicle')
      },
      onError: () => {
        toast.error('Update road vehicle failed')
      },
      onSettled: () => {
        setLoading(false)
      }
    })
  }
  
  const handleBack = () => {
    navigate('/admin/road-vehicle')
  }

  return (
    <div className='w-full p-2'>
      <h1 className='mb-2 text-2xl font-bold'>Road Vehicle Edit {id}</h1>
      <Button className='flex mb-4 mr-auto text-white' onClick={handleBack}>
        <ArrowLeftToLine />
      </Button>
      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <div className='p-4 bg-white rounded-lg shadow'>
          <h2 className='text-xl font-bold'>Road Vehicle Image</h2>
          <div className='grid grid-cols-4 gap-4 mb-4'>
            <div className='w-full col-span-1 p-2 mt-6 bg-white rounded-lg shadow-md h-[20rem]'>
              <img src={coachdetail1} alt='vehicle' className='w-full h-full' />
            </div>
            <div className='w-full col-span-1 p-2 mt-6 bg-white rounded-lg shadow-md h-[20rem]'>
              <img src={coachdetail2} alt='vehicle' className='w-full h-full' />
            </div>
            <div className='w-full col-span-1 p-2 mt-6 bg-white rounded-lg shadow-md h-[20rem]'>
              <div className='flex items-center justify-center h-full cursor-pointer'>
                <div>
                  <div className='flex justify-center mb-2'>
                    <CirclePlus />
                  </div>
                  <p className='text-blue-600'>
                    Click to upload <span className='text-black'>or drag and drop</span>{' '}
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
                    Click to upload <span className='text-black'>or drag and drop</span>{' '}
                  </p>
                  <p>SVG, PNG, or PDF 800 x 400 px</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='p-4 bg-white rounded-lg shadow'>
          <h2 className='mb-4 text-xl font-bold'>Road Vehicle Information</h2>
          <div className='grid grid-cols-2 gap-x-6 gap-y-4'>
            <Input
              {...register('brand')}
              placeholder='Brand Name'
              className='col-span-2 p-2 border rounded'
            />
            <Input
              {...register('number_of_seat')}
              placeholder='Number Of Seat'
              className='col-span-2 p-2 border rounded'
            />
            <Input
              {...register('start_time')}
              placeholder='Start Time'
              className='col-span-1 p-2 border rounded'
            />
            <Input
              {...register('start_day')}
              placeholder='Start Day'
              className='col-span-1 p-2 border rounded'
            />
            <Input
              {...register('end_time')}
              placeholder='End Time'
              className='col-span-1 p-2 border rounded'
            />
            <Input
              {...register('end_day')}
              placeholder='End Day'
              className='col-span-1 p-2 border rounded'
            />
            <Input
              {...register('trip_time')}
              placeholder='Trip Time'
              className='col-span-1 p-2 border rounded'
            />
            <Input
              {...register('take_place')}
              placeholder='Take Place'
              className='col-span-1 p-2 border rounded'
            />
            <Input
              {...register('destination')}
              placeholder='Destination'
              className='col-span-1 p-2 border rounded'
            />
            <Input
              {...register('location')}
              placeholder='Location'
              className='col-span-1 p-2 border rounded'
            />
            <Input
              {...register('number_of_seats_remaining')}
              type='number'
              placeholder='Number Of Seats Remaining'
              className='col-span-1 p-2 border rounded'
            />
            <Input
              {...register('price')}
              type='number'
              placeholder='Price'
              className='col-span-1 p-2 border rounded'
            />
          </div>
        </div>
      </form>
      <div className='flex justify-center mt-5 space-x-[30%]'>
          <Button type='button' className='w-[20rem]' onClick={handleBack}>
            Cancel
          </Button>
          <Button type='submit' className='w-[20rem]' disabled={loading} onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
      </div>
    </div>
  )
}
