import { flightdetail1, flightdetail2, flightdetail3 } from '@/assets/images';
import { Footer, Header } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@radix-ui/react-checkbox';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { ChevronRight, HeartIcon, Link, MapPin, MoveLeft, MoveRight, Plane, RockingChair, Timer, UtensilsCrossed, Wifi } from 'lucide-react';
import { useState } from 'react';
import { IconFlight } from '@/common/icons';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { flightApi } from '@/apis/flight.api';
import FlightDetailReview from './commentFlight';
import { commentFlightApi } from '@/apis/comment-flght.api';

export default function FlightDetail() {
    const [liked, setLiked] = useState(false);

    const handleClick = () => {
        setLiked(!liked);
    };

    const slides = [
        { content: flightdetail1 },
        { content: flightdetail2 },
        { content: flightdetail3 },
        { content: flightdetail1 },
        { content: flightdetail2 },
        { content: flightdetail3 },
        { content: flightdetail1 },
        { content: flightdetail2 },
        { content: flightdetail3 },
        { content: flightdetail1 },
        { content: flightdetail2 },
        { content: flightdetail3 },
        { content: flightdetail1 },
        { content: flightdetail2 },
        { content: flightdetail3 },
        { content: flightdetail1 },
        { content: flightdetail2 },
        { content: flightdetail3 },
    ];

    const { id } = useParams<{ id: string }>()

    const { data: getbyId } = useQuery({
        queryKey: ['getById', id],
        queryFn: () => flightApi.getById(id || ''),
    })
    const { data: getCommentFlight } = useQuery({
        queryKey: ['getComments', id],
        queryFn: () => commentFlightApi.getComments(id || '')
    })
    return (
        <>
            <Header />
            <div className='container mx-auto pt-28 pb-72'>
                <section>
                    <div className='flex text-sm items-center space-x-2 text-gray-600'>
                        <p>Today</p>
                        <ChevronRight className='w-4 h-4' />
                        <p>Istanbul</p>
                        <ChevronRight className='w-4 h-4' />
                        <p>{getbyId?.name}</p>
                    </div>
                    <div className='flex justify-between p-4'>
                        <div>
                            <p className='text-2xl font-bold'>{getbyId?.name}</p>
                            <div className='flex text-sm items-center space-x-2 mt-1'>
                                <MapPin className='w-4 h-4' />
                                <p></p>
                            </div>
                            <div className='flex items-center space-x-2 mt-2'>
                                <p className='border border-primary rounded w-10 h-8 flex justify-center items-center text-xs font-medium'>
                                    4.2
                                </p>
                                <p className='text-xs font-normal'>
                                    <span className='font-bold'>Very Good </span>
                                    54 reviews
                                </p>
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <p className='text-[32px] font-bold text-[#FF8682]'>$240</p>
                            <div className='flex space-x-2'>
                                <p
                                    className='border border-primary rounded w-10 h-10 flex justify-center items-center text-xs font-medium cursor-pointer transition-colors'
                                    onClick={handleClick}
                                >
                                    <HeartIcon
                                        className={`w-4 h-4 ${liked ? 'text-red-600' : ''}`}
                                    />
                                </p>
                                <p className='border border-primary rounded w-10 h-10 flex justify-center items-center text-xs font-medium cursor-pointer transition-colors'>
                                    <Link
                                        className={`w-4 h-4`}
                                    />
                                </p>
                                <Button>Book now</Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='mb-8'>
                    <img src={getbyId?.images} alt="Flight Banner" className='w-full h-80 object-cover rounded-xl' />
                </section>

                <section className='mb-8'>
                    <div className='flex justify-between p-4'>
                        <p className='text-2xl font-bold text-gray-800'>Basic Economy Features</p>
                        <div className="flex space-x-6">
                            <label className="flex items-center space-x-2">
                                <Checkbox />
                                <span className="text-lg font-medium">Economy</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <Checkbox />
                                <span className="text-lg font-medium">First Class</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <Checkbox />
                                <span className="text-lg font-medium">Business Class</span>
                            </label>
                        </div>
                    </div>

                    <div className='mb-10'>
                        <Swiper
                            modules={[Navigation, Pagination, A11y, Autoplay]}
                            spaceBetween={10}
                            slidesPerView={4}
                            pagination={{ clickable: true }}
                            navigation
                            breakpoints={{
                                1024: {
                                    slidesPerView: 9,
                                    spaceBetween: 20,
                                },
                            }}
                            autoplay={{
                                delay: 3000,
                            }}
                            loop={true}
                        >
                            {slides.map((slide, index) => (
                                <SwiperSlide key={index} className='flex justify-center'>
                                    <img src={slide.content} alt={`Slide ${index + 1}`} className="rounded-lg shadow-md w-[120px] h-[120px]" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className='bg-primary h-auto rounded-lg p-6 space-y-4 mb-10'>
                        <p className='text-2xl font-bold '>Emirates Airlines Policies</p>
                        <div className='flex flex-col space-y-4'>
                            <div className='flex items-center space-x-3'>
                                <Timer className='w-5 h-5 text-white' />
                                <p className='text-sm text-gray-200'>
                                    Pre-flight cleaning, installation of cabin HEPA filters.
                                </p>
                            </div>
                            <div className='flex items-center space-x-3'>
                                <Timer className='w-5 h-5 text-white' />
                                <p className='text-sm text-gray-200'>
                                    Pre-flight health screening questions.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='border rounded-xl p-6 bg-white shadow-md mb-10'>
                        <div className='flex justify-between'>
                            <p className='text-xl font-bold'>Return Wed, Dec 8</p>
                            <p className='text-lg font-medium'>{getbyId?.perios}</p>
                        </div>

                        <div className='pt-6'>
                            <div className='flex justify-between'>
                                <div className='flex items-center space-x-6 px-8 py-4 border rounded-lg'>
                                    <img src={getbyId?.images} alt="" className='w-16' />
                                    <div>
                                        <p className='text-2xl font-bold'>Emirates</p>
                                        <p className='text-sm font-medium'>Airbus A320</p>
                                    </div>
                                </div>
                                <div className='flex items-center p-6'>
                                    <div className='flex items-center space-x-6'>
                                        <Plane className='w-6 h-6' />
                                        <span className='border-l border-gray-400 h-6'></span>
                                        <Wifi className='w-6 h-6' />
                                        <span className='border-l border-gray-400 h-6'></span>
                                        <Timer className='w-6 h-6' />
                                        <span className='border-l border-gray-400 h-6'></span>
                                        <UtensilsCrossed className='w-6 h-6' />
                                        <span className='border-l border-gray-400 h-6'></span>
                                        <RockingChair className='w-6 h-6' />
                                    </div>
                                </div>

                            </div>
                            <div className='flex justify-center items-center space-x-20'>
                                <div className='flex space-x-4 items-center'>
                                    <p className='text-2xl font-semibold'>{getbyId?.startDate}</p>
                                    <p className='text-base font-medium'>Newark(EWR)</p>
                                </div>

                                <div className='flex items-center space-x-4'>
                                    <MoveLeft className='w-11 h-11' style={{ strokeWidth: 0.5 }} />
                                    <IconFlight />
                                    <MoveRight className='w-11 h-11' style={{ strokeWidth: 0.5 }} />
                                </div>

                                <div className='flex space-x-4 items-center'>
                                    <p className='text-2xl font-semibold'>{getbyId?.endDate}</p>
                                    <p className='text-base font-medium'>Newark(EWR)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <FlightDetailReview data={getCommentFlight?.data ?? []} />
            </div>
            <Footer />
        </>
    );
}
