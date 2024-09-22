import { flight, hotel, tour_1 } from '@/assets/images';
import { Footer, Header } from '@/components/common';
import { Button } from '@/components/ui/button';
import { ChevronRight, HeartIcon, Link, MapPin, Star } from 'lucide-react';
import { useState } from 'react';

export default function TourDetailView() {
    const [liked, setLiked] = useState(false);

    const handleClick = () => {
        setLiked(!liked);
    };

    // function handleBookingTour() {
    //     mutationBookingHotel.mutate(id || '', {
    //         onSuccess: () => {
    //             toast.success('Booking success 🚀🚀⚡⚡!')
    //         },
    //         onError: () => {
    //             toast.error('Booking failed 😭😭😭😭!')
    //         }
    //         })
    //     }
    const reviews = [
        {
            rating: 5.0,
            title: 'Amazing',
            author: 'Omar Siphron',
            content: 'Loremm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            rating: 5.0,
            title: 'Amazing',
            author: 'Cristofer Ekstrom Bothman',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
    ];



    return (
        <>
            <Header />
            <div className="container mx-auto pt-28 pb-36 px-4">
                {/* Header Section */}
                <section className="mb-12">
                    <div className="flex text-sm items-center space-x-2 text-gray-600 mb-4">
                        <p>Today</p>
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                        <p>Istanbul</p>
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                        <p>CVK Park Bosphorus Hotel Istanbul</p>
                    </div>
                    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md p-6">
                        <div className="flex-1 mb-6 md:mb-0">
                            <p className="text-3xl font-bold text-gray-800">Emirates A380 Airbus</p>
                            <div className="flex text-sm items-center space-x-2 mt-2 text-gray-500">
                                <MapPin className="w-4 h-4" />
                                <p>Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437</p>
                            </div>
                            <div className="flex items-center space-x-2 mt-4">
                                <p className="border border-primary rounded-lg w-12 h-8 flex justify-center items-center text-sm font-semibold text-primary">
                                    4.2
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold">Very Good</span> 54 reviews
                                </p>
                            </div>
                        </div>
                        <div className="flex-none text-right space-y-4">
                            <p className="text-3xl font-bold text-[#FF8682]">$240</p>
                            <div className="flex space-x-4">
                                <div
                                    className="border border-primary rounded-full w-12 h-12 flex justify-center items-center text-sm font-medium cursor-pointer hover:bg-red-100 transition-colors"
                                    onClick={handleClick}
                                >
                                    <HeartIcon
                                        className={`w-5 h-5 ${liked ? 'text-red-600' : 'text-gray-500'}`}
                                    />
                                </div>
                                <div className="border border-primary rounded-full w-12 h-12 flex justify-center items-center text-sm font-medium cursor-pointer hover:bg-gray-100 transition-colors">
                                    <Link className="w-5 h-5 text-gray-500" />
                                </div>
                                <Button>Book now</Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Image Gallery */}
                <section className="mb-12">
                    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                        <img src={tour_1} alt="Tour" className="w-full md:w-[60%] h-auto object-cover rounded-lg shadow-lg" />
                        <div className="flex flex-col space-y-4 w-full md:w-[40%]">
                            <div className="flex space-x-4">
                                <img src={flight} alt="Flight" className="w-[48%] h-auto object-cover rounded-lg shadow-lg" />
                                <img src={flight} alt="Flight" className="w-[48%] h-auto object-cover rounded-lg shadow-lg" />
                            </div>
                            <div className="flex space-x-4">
                                <img src={flight} alt="Flight" className="w-[48%] h-auto object-cover rounded-lg shadow-lg" />
                                <img src={flight} alt="Flight" className="w-[48%] h-auto object-cover rounded-lg shadow-lg" />
                            </div>
                        </div>
                    </div>
                </section>

                <hr className="border-t border-gray-300 mb-12" />

                <section>
                    <div className="mb-8">
                        <p className="text-2xl font-bold mb-4">Overview</p>
                        <p className="text-base font-medium text-gray-700">
                            Located in Taksim Gmsuyu, the heart of Istanbul,
                            the CVK Park Bosphorus Hotel Istanbul has risen from the
                            ashes of the historic Park Hotel, which also served as
                            Foreign Affairs Palace 120 years ago and is hosting its
                            guests by assuming this hospitality mission. With its 452
                            luxurious rooms and suites, 8500 m2 SPA and fitness area, 18
                            meeting rooms including 4 dividable ones and 3 terraces with
                            Bosphorus view, Istanbuls largest terrace with Bosphorus view
                            (4500 m2) and latest technology infrastructure, CVK Park
                            Bosphorus Hotel Istanbul is destined to be the popular
                            attraction point of the city. Room and suite categories
                            at various sizes with city and Bosphorus view, as well
                            as 68 separate luxury suites, are offered to its special
                            guests as a wide variety of selection.
                        </p>
                    </div>

                    <hr className="border-t border-gray-300 mb-12" />

                    <div className="flex space-x-6 mb-8">
                        <div className="bg-primary p-6 rounded-lg text-center text-white flex flex-col items-center shadow-md">
                            <p className="text-4xl font-bold">4.2</p>
                            <p className="text-base font-semibold">Very Good</p>
                            <p className="text-sm">371 reviews</p>
                        </div>
                        <div className="border border-primary p-6 rounded-lg text-center flex flex-col items-center shadow-md">
                            <p className="text-4xl font-bold">4.2</p>
                            <p className="text-base font-semibold">Very Good</p>
                            <p className="text-sm">371 reviews</p>
                        </div>
                    </div>

                    <hr className="border-t border-gray-300 mb-12" />

                    <div>
                        <p className="text-2xl font-bold mb-4">Available Rooms</p>
                        <div className="flex items-center justify-between pb-4 mb-4">
                            <div className="flex space-x-4 items-center">
                                <img src={hotel} alt="Hotel Room" className="w-16 h-16 rounded-lg shadow-md" />
                                <p className="text-base font-medium">Superior room - 1 double bed or 2 twin beds</p>
                            </div>
                            <div className="flex space-x-10 items-center">
                                <div className="text-xl font-semibold">$price <span className="text-sm font-normal">/night</span></div>
                                <Button>
                                    Book now
                                </Button>
                            </div>
                        </div>
                    </div>

                    <hr className="border-t border-gray-300 mb-12" />

                    <div>
                        <p className="text-xl font-bold">Amenities/Map</p>
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 p-4">
                            <div className="flex items-center space-x-80">
                                <div className='flex space-x-2'>
                                    <MapPin className='w-5 h-5' />
                                    <span>name</span>
                                </div>
                                <div className=' flex space-x-2'>
                                    <MapPin className='w-5 h-5' />
                                    <span>name</span>
                                </div>
                            </div>
                            <button className="text-blue-500">+24 more</button>
                        </div>
                    </div>

                    <hr className="border-t border-gray-300 mb-12" />

                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-2xl font-bold">Location/Map</p>
                            <Button className="bg-primary text-white">View on Google Maps</Button>
                        </div>

                        <div>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.82334438999!2d108.22030047552775!3d16.07465433929193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218307d81c91d%3A0xbc7c14cab8a09c8!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBEdXkgVMOa!5e0!3m2!1svi!2s!4v1627566941055!5m2!1svi!2s"
                                width="100%"
                                height="450"
                                allowFullScreen
                                loading="lazy"
                                className="rounded-lg shadow-md"
                            ></iframe>
                        </div>
                    </div>

                    <hr className="border-t border-gray-300 mb-12" />
                    <hr className="mb-12 border-t border-gray-300" />

                    <div>
                        <p className="mb-4 text-2xl font-bold">Reviews</p>
                        <div className="flex flex-col space-y-4">
                            {reviews.map((review, index) => (
                                <div key={index} className="p-4 border border-gray-300 rounded-lg shadow-md">
                                    <div className="flex items-center mb-2 space-x-2">
                                        <Star className="w-5 h-5 text-yellow-400" />
                                        <p className="font-semibold">{review.rating} - {review.title}</p>
                                    </div>
                                    <p className="mb-2 text-sm font-medium text-gray-700">{review.author}</p>
                                    <p className="text-sm">{review.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}