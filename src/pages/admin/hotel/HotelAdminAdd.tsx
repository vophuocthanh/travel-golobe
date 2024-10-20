import { hotelApi } from '@/apis/hotel.api' // Giả định bạn có API cho hotel
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateHotelSchema } from '@/shared/utils/hotel.schema'


export default function CreateHotelAdmin() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const form = useForm<z.infer<typeof CreateHotelSchema>>({
        resolver: zodResolver(CreateHotelSchema),
        defaultValues: {
            hotel_names: '',
            location: '',
            price: 0,
            image: '',
            received_time: '',
            giveback_time: '',
            description: '',
        }
    })

    const mutationCreateHotel = useMutation({
        mutationFn: (data: z.infer<typeof CreateHotelSchema>) => hotelApi.addHotel(data)

    })

    function onSubmit(data: z.infer<typeof CreateHotelSchema>) {
        const formattedData = {
            ...data,
            price: Number(data.price),
        }
        mutationCreateHotel.mutate(formattedData, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['getHotelAll'] })
                toast.success('Thêm khách sạn thành công')
                navigate('/admin/hotels')
            },
            onError: () => {
                toast.error('Thêm khách sạn thất bại')
            }
        })
    }

    return (
        <div className='w-full h-full p-6 bg-gray-50'>
            <div className='flex items-center gap-2 mb-6'>
                <Button onClick={() => navigate('/admin/hotels')} className='text-white'>
                    Quay lại
                </Button>
                <h1 className='text-3xl font-bold text-gray-800'>Thêm khách sạn</h1>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 bg-white rounded-lg shadow-md p-6'>
                    <FormField
                        control={form.control}
                        name='hotel_names'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-medium'>Tên khách sạn</FormLabel>
                                <FormControl>
                                    <Input placeholder='Nhập tên khách sạn' {...field} className='border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300' />
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
                                    <Input placeholder='Nhập vị trí khách sạn' {...field} className='border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300' />
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
                                    <Input type='number' placeholder='Nhập giá' {...field} className='border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300' />
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
                                <FormLabel className='font-medium'>Ảnh khách sạn</FormLabel>
                                <FormControl>
                                    <Input placeholder='Nhập đường dẫn ảnh' {...field} className='border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='received_time'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-medium'>Thời gian nhận</FormLabel>
                                <FormControl>
                                    <Input placeholder='Nhập thời gian nhận' {...field} className='border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='giveback_time'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-medium'>Thời gian trả lại</FormLabel>
                                <FormControl>
                                    <Input placeholder='Nhập thời gian trả lại' {...field} className='border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300' />
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
                                <FormLabel className='font-medium'>Mô tả</FormLabel>
                                <FormControl>
                                    <Textarea placeholder='Nhập mô tả khách sạn' {...field} className='h-72 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type='submit' className='flex ml-auto px-4 py-2 text-white'>
                        Thêm
                    </Button>
                </form>
            </Form>
        </div>
    )
}    
