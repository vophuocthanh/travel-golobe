import { meApi } from '@/apis/me'
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
import { CirclePlus, Cpu, CreditCard } from 'lucide-react'
import { useRef, useState } from 'react'
import Input from './components/input-profile'

import PaymentHistory from '@/pages/profile/components/payment-history'
import { toast } from 'react-toastify'
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

              <PaymentHistory />
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
