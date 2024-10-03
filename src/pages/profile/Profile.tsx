/* eslint-disable @typescript-eslint/no-explicit-any */
import { meApi } from '@/apis/me'
import { logo_flight, logo_hotel } from '@/assets/images'
import { Footer, Header } from '@/components/common'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import ContentPassword from '@/pages/profile/components/content-password'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Armchair, Calendar, ChevronRight, CirclePlus, Clock4, Cpu, CreditCard, DoorOpen, Minus } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

import Div from './components/div-profile'
import Input from './components/input-profile'

import { flightApi } from '@/apis/flight.api'
import { hotelApi } from '@/apis/hotel.api'
import { tourApi } from '@/apis/tour.api'
import { Link } from 'react-router-dom'
import ContentAddress from './components/content-adress'
import ContentCountry from './components/content-country'
import ContentDate from './components/content-date'
import ContentEmail from './components/content-email'
import ContentName from './components/content-name'
import ContentPhone from './components/content-phone'

const colors = ['#D1E9F7', '#E9F7D1', '#F7D1E9', '#F7E9D1', '#D1F7E9', '#E9D1F7']

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState('account')
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }
  const inputFileRef = useRef<HTMLInputElement | null>(null)
  const queryClient = useQueryClient()
  const { data: getMeProfile } = useQuery({
    queryKey: ['getMe'],
    queryFn: () => meApi.getMe()
  })

  const { data: getFavoriteTours } = useQuery({
    queryKey: ['getFavoriteTours'],
    queryFn: () => tourApi.getFavoriteTours()
  })

  const { data: getFavoriteFlights } = useQuery({
    queryKey: ['getFavoriteFlights'],
    queryFn: () => flightApi.getFavoriteFlights()
  })

  const { data: getFavoriteHotels } = useQuery({
    queryKey: ['getFavoriteHotels'],
    queryFn: () => hotelApi.getFavoriteHotels()
  })

  const mutationAvatar = useMutation({
    mutationFn: (avatar: File) => meApi.uploadAvatar(avatar),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMe'] })
      toast.success('Upload avatar successfully')
    },
    onError: () => {
      toast.error('Upload avatar failed')
    }
  })

  const handleClickAvatar = () => {
    inputFileRef.current?.click()
  }

  const handleUploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      mutationAvatar.mutate(file)
    } else {
      toast.error('No file chosen')
    }
  }

  const randomColor = getRandomColor()

  return (
    <div>
      <Header />
      <section className='container mx-auto pt-28'>
        <div className='relative banner'>
          <div className='object-cover w-full h-80 rounded-xl' style={{ backgroundColor: randomColor }}></div>
          <div className='absolute flex flex-col items-center transform -translate-x-1/2 -bottom-24 left-1/2'>
            <img
              src={getMeProfile?.avatar}
              alt='Avatar'
              className='border-4 border-white rounded-full shadow-lg cursor-pointer w-36 h-36'
              onClick={handleClickAvatar}
            />
            <p className='mt-2 text-lg font-semibold'>{getMeProfile?.name}</p>
            <p className='text-gray-500'>{getMeProfile?.email}</p>

            <input type='file' accept='image/*' className='hidden' ref={inputFileRef} onChange={handleUploadAvatar} />
          </div>
        </div>

        <div className='container pb-64 mx-auto pt-28'>
          <Tabs value={activeTab} onValueChange={handleTabChange} className='mt-5'>
            <TabsList className='flex justify-center py-5 mb-6 space-x-40 rounded-md shadow-md '>
              <TabsTrigger
                value='account'
                className={`px-4 py-2 font-semibold ${
                  activeTab === 'account'
                    ? 'text-primary border-b-2 border-primary-500'
                    : 'text-gray-700 border-b-2 border-transparent'
                } hover:border-primary`}
              >
                Account
              </TabsTrigger>
              <TabsTrigger
                value='Tickets-Booking'
                className={`px-4 py-2 font-semibold ${
                  activeTab === 'Tickets-Booking'
                    ? 'text-primary border-b-2 border-primary-500'
                    : 'text-gray-700 border-b-2 border-transparent'
                } hover:border-primary`}
              >
                Tickets/Booking
              </TabsTrigger>
              <TabsTrigger
                value='Payment-methods'
                className={`px-4 py-2 font-semibold ${
                  activeTab === 'Payment-methods'
                    ? 'text-primary border-b-2 border-primary-500'
                    : 'text-gray-700 border-b-2 border-transparent'
                } hover:border-primary`}
              >
                Payment methods
              </TabsTrigger>
            </TabsList>
            <TabsContent value='account'>
              <p className='mb-6 text-2xl font-bold'>Account</p>
              <div className='space-y-3'>
                <ContentName title='Name' content={getMeProfile?.name} />
                <ContentEmail title='Email' content={getMeProfile?.email} />
                <ContentPhone title='Phone Number' content={getMeProfile?.phone} />
                <ContentDate title='Date of Birth' content={getMeProfile?.date_of_birth} />
                <ContentAddress title='Adresss' content={getMeProfile?.address} />
                <ContentCountry title='Country' content={getMeProfile?.country} />
                <ContentPassword title='Password' content='*************' />
              </div>
            </TabsContent>
            <TabsContent value='Tickets-Booking'>
              <p className='mb-4 text-xl font-semibold'>Tickets/Booking</p>
              <Tabs defaultValue='flight' className='w-full'>
                <TabsList className='flex my-2 space-x-10'>
                  <TabsTrigger
                    value='flight'
                    className='px-4 py-2 text-lg font-medium transition duration-300 border-b-2 border-transparent hover:border-blue-500'
                  >
                    Flight
                  </TabsTrigger>
                  <TabsTrigger
                    value='stays'
                    className='px-4 py-2 text-lg font-medium transition duration-300 border-b-2 border-transparent hover:border-blue-500'
                  >
                    Stays
                  </TabsTrigger>
                </TabsList>
                <TabsContent value='flight'>
                  <div className='relative flex items-center px-4 bg-white border rounded-lg shadow-md'>
                    <img src={logo_flight} alt='airline-logo' className='w-16 h-16 mr-4' />
                    <div className='flex items-center px-5 space-x-12'>
                      <div className='flex items-center justify-center space-x-5'>
                        <div className='text-center start'>
                          <p className='text-base text-gray-500'>Newark (EWR)</p>
                          <p className='text-xl font-bold pt-1/2'>12:00 AM</p>
                        </div>
                        <div className='flex justify-center'>
                          <Minus className='w-6 h-6' />
                        </div>
                        <div className='text-center come'>
                          <p className='text-base text-gray-500'>Newark (EWR)</p>
                          <p className='text-xl font-bold pt-1/2'>6:00 PM</p>
                        </div>
                      </div>

                      <div className='grid grid-cols-2 p-4 gap-x-8'>
                        <Div icon={<Calendar />} name='Date' content='12-11-22' className='col-span-1' />
                        <Div icon={<DoorOpen />} name='Gate' content='A12' className='col-span-1' />
                        <Div icon={<Clock4 />} name='Flight time' content='Newark(EWR)' className='col-span-1' />
                        <Div icon={<Armchair />} name='Seat no.' content='128' className='col-span-1' />
                      </div>
                    </div>
                    <Button className='absolute px-2 py-2 text-white bg-green-500 rounded right-20'>
                      Download Ticket
                    </Button>
                    <Button className='absolute px-4 py-2 transition-colors duration-300 bg-white border rounded shadow-md text-primary border-primary hover:bg-primary hover:text-white right-4'>
                      <ChevronRight />
                    </Button>
                  </div>
                  <div className='w-full h-full mt-10'>
                    <div className='flex flex-col'>
                      <h1 className='text-2xl font-bold'>Tour yêu thích</h1>
                      {getFavoriteTours?.data.map(
                        (tour: { id: string; image: string; name: string; description: string }) => (
                          <div
                            key={tour.id}
                            className='flex items-center justify-between p-4 my-2 bg-white border rounded-lg shadow-md'
                          >
                            <div className='flex items-center'>
                              <img src={tour.image} alt='tour-image' className='w-16 h-16 mr-4' />
                              <div className='flex flex-col'>
                                <h1>{tour.name}</h1>
                                <p>{tour.description}</p>
                              </div>
                            </div>
                            <Link to={`/tour/${tour.id}`}>
                              <Button className='px-4 py-2 text-white rounded-md bg-primary'>View detail</Button>
                            </Link>
                          </div>
                        )
                      )}
                    </div>
                    <div className='flex flex-col'>
                      <h1 className='text-2xl font-bold'>Flight yêu thích</h1>
                      {getFavoriteFlights?.data.map((flight: any) => (
                        <div
                          key={flight.id}
                          className='flex items-center justify-between p-4 my-2 bg-white border rounded-lg shadow-md'
                        >
                          <div className='flex items-center'>
                            <img
                              src='https://www.vietnamairlines.com/~/media/ContentImage/TravelInfo/ChuyenBayMoUoc.jpg?la=en'
                              alt='flight-image'
                              className='w-16 h-16 mr-4'
                            />
                            <div className='flex flex-col'>
                              <h1>{flight.brand}</h1>
                              <p>{flight.type_ticket}</p>
                              <p>{flight.price}</p>
                            </div>
                          </div>
                          <Link to={`/flight/${flight.id}`}>
                            <Button className='px-4 py-2 text-white rounded-md bg-primary'>View detail</Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                    <div className='flex flex-col'>
                      <h1 className='text-2xl font-bold'>Hotel yêu thích</h1>
                      {getFavoriteHotels?.data.map(
                        (hotel: { id: string; image: string; hotel_names: string; description: string }) => (
                          <div
                            key={hotel.id}
                            className='flex items-center justify-between p-4 my-2 bg-white border rounded-lg shadow-md'
                          >
                            <div className='flex items-center'>
                              <img
                                src='https://cf.bstatic.com/xdata/images/hotel/max1024x768/469254471.jpg?k=92a78249a4cd8daaf9525f55e57d6f33d9b98ed4ac8a7d99bdf0ee5833f3c8ca&o=&hp=1'
                                alt='hotel-image'
                                className='w-16 h-16 mr-4'
                              />
                              <div className='flex flex-col'>
                                <h1 className='font-medium'>{hotel.hotel_names}</h1>
                                <p className='hotel-description'>{hotel.description}</p>
                              </div>
                            </div>
                            <Link to={`/hotel/${hotel.id}`}>
                              <Button className='px-4 py-2 text-white rounded-md bg-primary'>View detail</Button>
                            </Link>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value='stays'>
                  <div className='relative flex items-center px-4 bg-white border rounded-lg shadow-md'>
                    <img src={logo_hotel} alt='airline-logo' className='w-16 h-16 mr-4' />
                    <div className='flex items-center px-5 space-x-12'>
                      <div className='flex items-center justify-center space-x-5'>
                        <div className='text-center start'>
                          <p className='text-base text-gray-500'>Check-In</p>
                          <p className='text-xl font-bold pt-1/2'>Thur, Dec 8</p>
                        </div>
                        <div className='flex justify-center'>
                          <Minus className='w-6 h-6' />
                        </div>
                        <div className='text-center come'>
                          <p className='text-base text-gray-500'>Check Out</p>
                          <p className='text-xl font-bold pt-1/2'>Fri, Dec 9</p>
                        </div>
                      </div>

                      <div className='grid grid-cols-2 p-4 gap-x-8'>
                        <Div icon={<Clock4 />} name='Check-In time' content='12:00pm' className='col-span-1' />
                        <Div icon={<DoorOpen />} name='Room no.' content='A12' className='col-span-1' />
                        <Div icon={<Clock4 />} name='Check-In out' content='11:30am' className='col-span-1' />
                      </div>
                    </div>
                    <Button className='absolute px-2 py-2 text-white bg-green-500 rounded right-20'>
                      Download Ticket
                    </Button>
                    <Button className='absolute px-4 py-2 transition-colors duration-300 bg-white border rounded shadow-md text-primary border-primary hover:bg-primary hover:text-white right-4'>
                      <ChevronRight />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>
            <TabsContent value='Payment-methods'>
              <p className='text-xl font-bold'>Payment methods</p>
              <div className='relative flex items-center gap-6 px-4 py-6 my-5 bg-white border border-gray-300 rounded-lg shadow-md'>
                <div className='grid grid-cols-2 gap-6 px-6 py-8 text-black shadow-lg bg-primary rounded-2xl w-80 h-44'>
                  <p className='col-span-1 text-xl font-semibold'>*******</p>
                  <div className='flex items-center justify-end col-span-1'>
                    <Cpu className='w-8 h-8' />
                  </div>
                  <div className='col-span-1'>
                    <p className='text-base'>Valid Thru</p>
                    <p className='text-xl font-semibold'>02/27</p>
                  </div>
                  <div className='flex items-center justify-end col-span-1'>
                    <CreditCard className='w-8 h-8' />
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger>
                    <div className='bg-white border border-dashed shadow-lg text-primary border-primary rounded-2xl w-80 h-44'>
                      <div className='flex items-center justify-center h-44'>
                        <CirclePlus className='w-8 h-8 text-primary' />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className='mb-4 text-xl font-semibold text-center'>Add a new Card</DialogTitle>
                      <DialogDescription>
                        <form>
                          <Input name='Card Number' icon={<CreditCard />} />
                          <div className='grid grid-cols-2 gap-2 mb-4'>
                            <div className='col-span-1'>
                              <Input name='Exp. Date' />
                            </div>
                            <div className='col-span-1'>
                              <Input name='CVC' />
                            </div>
                          </div>
                          <Input name='Name on Card' />
                          <Input name='Country or Region' />
                          <div className='flex items-center pb-3 space-x-3'>
                            <input
                              id='save-info-checkbox'
                              type='checkbox'
                              className='w-5 h-5 text-blue-600 border-gray-300 rounded form-checkbox focus:ring-blue-500'
                            />
                            <label htmlFor='save-info-checkbox' className='text-sm text-gray-700'>
                              Securely save my information for 1-click checkout
                            </label>
                          </div>
                          <Button type='submit' className='w-full bg-primary'>
                            Submit
                          </Button>

                          <p className='text-xs text-center text-gray-500'>
                            By confirming your subscription, you allow The Outdoor Inn Crowd Limited to charge your card
                            for this payment and future payments in accordance with their terms. You can always cancel
                            your subscription.
                          </p>
                        </form>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <Footer />
    </div>
  )
}
