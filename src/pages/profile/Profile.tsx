import { banner_account, logo_flight, logo_hotel } from '@/assets/images'
import { Footer, Header } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { Armchair, Calendar, ChevronRight, CirclePlus, Clock4, CloudUploadIcon, Cpu, CreditCard, DoorOpen, Minus } from 'lucide-react'
import Div from './components/div-profile'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Input from './components/input-profile'
import { useQuery } from '@tanstack/react-query'
import { meApi } from '@/apis/me'
import ContentAccount from './components/content-account'


export default function Profile() {
    const { data: getMeProfile } = useQuery({
        queryKey: ['getMeProfile'],
        queryFn: () => meApi.getMeProfile()
    })

    return (
        <div>

            <Header />
            <section className='container mx-auto pt-28'>
                <div className='banner relative'>
                    <img src={banner_account} alt="" className='w-full h-80 object-cover rounded-xl' />
                    <Dialog>
                        <DialogTrigger>
                            <Button className='text-lg flex items-center space-x-2 absolute right-3 bottom-4 p-2 rounded-md shadow-md'>
                                <CloudUploadIcon />
                                <p>Upload new cover</p>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-xl font-semibold mb-4 text-center">Upload Avartar</DialogTitle>
                                <DialogDescription>
                                    <form>
                                        <input type="file" name="" id="" />
                                    </form>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                    <div className='absolute -bottom-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center'>
                        <img src={getMeProfile?.avatar} alt="" className='rounded-full w-36 h-36 border-4 border-white shadow-lg' />
                        <p className='mt-2 font-semibold text-lg'>{getMeProfile?.name}</p>
                        <p className='text-gray-500'>{getMeProfile?.email}</p>
                    </div>
                </div>

                <div className="container mx-auto pt-28 pb-64">
                    <Tabs defaultValue="account" className="mt-5">
                        <TabsList className="flex space-x-40 py-5 mb-6 justify-center rounded-md shadow-md ">
                            <TabsTrigger value="account" className="px-4 py-2 font-semibold text-gray-700 border-b-2 border-transparent hover:border-primary">
                                Account
                            </TabsTrigger>
                            <TabsTrigger value="Tickets-Booking" className="px-4 py-2 font-semibold text-gray-700 border-b-2 border-transparent hover:border-primary">
                                Tickets/Booking
                            </TabsTrigger>
                            <TabsTrigger value="Payment-methods" className="px-4 py-2 font-semibold text-gray-700 border-b-2 border-transparent hover:border-primary">
                                Payment methods
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">
                            <p className="text-2xl font-bold mb-6">Account</p>
                            <div className='space-y-3'>
                                <ContentAccount title='Name' content={getMeProfile?.name} />
                                <ContentAccount title='Email' content={getMeProfile?.email} boolean="hhh" />
                                <ContentAccount title='Phone Number' content={getMeProfile?.phone} />
                                <ContentAccount title='Date of Birth' content={getMeProfile?.date_of_birth} />
                                <ContentAccount title='Country' content={getMeProfile?.country} />
                            </div>

                        </TabsContent>
                        <TabsContent value="Tickets-Booking">
                            <p className="text-xl font-semibold mb-4">Tickets/Booking</p>
                            <Tabs defaultValue="flight" className="w-full">
                                <TabsList className='flex space-x-10 my-2'>
                                    <TabsTrigger value="flight" className="px-4 py-2 text-lg font-medium border-b-2 border-transparent hover:border-blue-500 transition duration-300">
                                        Flight
                                    </TabsTrigger>
                                    <TabsTrigger value="stays" className="px-4 py-2 text-lg font-medium border-b-2 border-transparent hover:border-blue-500 transition duration-300">
                                        Stays
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="flight">
                                    <div className="flex items-center bg-white border rounded-lg shadow-md px-4 relative">
                                        <img src={logo_flight} alt="airline-logo" className="w-16 h-16 mr-4" />
                                        <div className='flex space-x-12 items-center px-5'>
                                            <div className='flex space-x-5 items-center justify-center'>
                                                <div className="start text-center">
                                                    <p className='text-gray-500 text-base'>Newark (EWR)</p>
                                                    <p className='font-bold text-xl pt-1/2'>12:00 AM</p>
                                                </div>
                                                <div className='flex justify-center'>
                                                    <Minus className='h-6 w-6' />
                                                </div>
                                                <div className="come text-center">
                                                    <p className='text-gray-500 text-base'>Newark (EWR)</p>
                                                    <p className='font-bold text-xl pt-1/2'>6:00 PM</p>
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-2 gap-x-8 p-4'>
                                                <Div icon={<Calendar />} name='Date' content='12-11-22' className='col-span-1' />
                                                <Div icon={<DoorOpen />} name='Gate' content='A12' className='col-span-1' />
                                                <Div icon={<Clock4 />} name='Flight time' content='Newark(EWR)' className='col-span-1' />
                                                <Div icon={<Armchair />} name='Seat no.' content='128' className='col-span-1' />
                                            </div>
                                        </div>
                                        <Button className="bg-green-500 text-white px-2 py-2 rounded absolute right-20">Download Ticket</Button>
                                        <Button className="text-primary bg-white border border-primary rounded shadow-md hover:bg-primary hover:text-white transition-colors duration-300 px-4 py-2 absolute right-4">
                                            <ChevronRight />
                                        </Button>
                                    </div>
                                </TabsContent>
                                <TabsContent value="stays">
                                    <div className="flex items-center bg-white border rounded-lg shadow-md px-4 relative">
                                        <img src={logo_hotel} alt="airline-logo" className="w-16 h-16 mr-4" />
                                        <div className='flex space-x-12 items-center px-5'>
                                            <div className='flex space-x-5 items-center justify-center'>
                                                <div className="start text-center">
                                                    <p className='text-gray-500 text-base'>Check-In</p>
                                                    <p className='font-bold text-xl pt-1/2'>Thur, Dec 8</p>
                                                </div>
                                                <div className='flex justify-center'>
                                                    <Minus className='h-6 w-6' />
                                                </div>
                                                <div className="come text-center">
                                                    <p className='text-gray-500 text-base'>Check Out</p>
                                                    <p className='font-bold text-xl pt-1/2'>Fri, Dec 9</p>
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-2 gap-x-8 p-4'>
                                                <Div icon={<Clock4 />} name='Check-In time' content='12:00pm' className='col-span-1' />
                                                <Div icon={<DoorOpen />} name='Room no.' content='A12' className='col-span-1' />
                                                <Div icon={<Clock4 />} name='Check-In out' content='11:30am' className='col-span-1' />
                                            </div>
                                        </div>
                                        <Button className="bg-green-500 text-white px-2 py-2 rounded absolute right-20">Download Ticket</Button>
                                        <Button className="text-primary bg-white border border-primary rounded shadow-md hover:bg-primary hover:text-white transition-colors duration-300 px-4 py-2 absolute right-4">
                                            <ChevronRight />
                                        </Button>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </TabsContent>
                        <TabsContent value="Payment-methods">
                            <p className="text-xl font-bold">Payment methods</p>
                            <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-4 py-6 my-5 relative gap-6">
                                <div className="bg-primary text-black rounded-2xl px-6 py-8 shadow-lg w-80 h-44 grid grid-cols-2 gap-6">
                                    <p className="col-span-1 text-xl font-semibold">*******</p>
                                    <div className="flex items-center justify-end col-span-1">
                                        <Cpu className="w-8 h-8" />
                                    </div>
                                    <div className="col-span-1">
                                        <p className="text-base">Valid Thru</p>
                                        <p className="text-xl font-semibold">02/27</p>
                                    </div>
                                    <div className="flex items-center justify-end col-span-1">
                                        <CreditCard className="w-8 h-8" />
                                    </div>
                                </div>

                                <Dialog>
                                    <DialogTrigger>
                                        <div className="bg-white text-primary border border-primary border-dashed rounded-2xl shadow-lg w-80 h-44" >
                                            <div className="flex justify-center items-center h-44">
                                                <CirclePlus className='w-8 h-8 text-primary' />
                                            </div>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle className="text-xl font-semibold mb-4 text-center">Add a new Card</DialogTitle>
                                            <DialogDescription>
                                                <form>
                                                    <Input name='Card Number' icon={<CreditCard />} />
                                                    <div className="mb-4 grid grid-cols-2 gap-2">
                                                        <div className='col-span-1'>
                                                            <Input name='Exp. Date' />
                                                        </div>
                                                        <div className='col-span-1'>
                                                            <Input name='CVC' />
                                                        </div>
                                                    </div>
                                                    <Input name='Name on Card' />
                                                    <Input name='Country or Region' />
                                                    <div className="flex items-center space-x-3 pb-3">
                                                        <input
                                                            id="save-info-checkbox"
                                                            type="checkbox"
                                                            className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                                        />
                                                        <label htmlFor="save-info-checkbox" className="text-gray-700 text-sm">
                                                            Securely save my information for 1-click checkout
                                                        </label>
                                                    </div>
                                                    <Button type="submit" className="bg-primary w-full">Submit</Button>

                                                    <p className='text-xs text-gray-500 text-center'>By confirming your subscription, you allow The Outdoor Inn Crowd Limited to charge your card for this payment and future payments in accordance with their terms. You can always cancel your subscription.</p>
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