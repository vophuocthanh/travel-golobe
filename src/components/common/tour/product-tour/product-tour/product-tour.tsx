import { tour_1 } from "@/assets/images";
import { IconAdress, IconDrink, IconHeart } from "@/common/icons";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const dataTourProduct = [
    {
        id: 1,
        image: tour_1,
        title: 'CVK Park Bosphorus Hotel Istanbul',
        adress: 'Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437',
        price: '$240'
    },
    {
        id: 2,
        image: tour_1,
        title: 'CVK Park Bosphorus Hotel Istanbul',
        adress: 'Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437',
        price: '$120'
    },
    {
        id: 3,
        image: tour_1,
        title: 'CVK Park Bosphorus Hotel Istanbul',
        adress: 'Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437',
        price: '$240'
    },
    {
        id: 4,
        image: tour_1,
        title: 'CVK Park Bosphorus Hotel Istanbul',
        adress: 'Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437',
        price: '$300'
    }
]

export default function ProductTour()  {
    return (
        <div className='w-[70%]'>
            <div>
                <div className="flex justify-between">
                    <div className=" p-4 w-[30%] border-b border-b-primary">
                        <h3>Tour</h3>
                        <p className="flex text-slate-400">257 places</p>
                    </div>
                    <div className=" p-4 w-[30%]">
                        <h3>Motels</h3>
                        <p className="flex text-slate-400">51 places</p>
                    </div>
                    <div className=" p-4 w-[30%]">
                        <h3>Hotels</h3>
                        <p className="flex text-slate-400">117 places</p>
                    </div>
                </div>
                <div className="flex justify-between my-6">
                    <div className="flex items-center justify-center ">
                        <h3>Showing 4 of <span className="text-red-500"> 257 places</span></h3>
                    </div>
                    <div>
                        <Select>
                            <SelectTrigger className="w-[180px]"> Sort by 
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div>
                    {
                        dataTourProduct.map((item)=>(
                            <div className="flex justify-between mb-5">
                                <img src={item.image} className="mr-6" alt="" />
                                <div className="p-3">
                                    <div className="flex justify-between">
                                        <div className="mr-5 ">
                                            <h2 className="mb-3 text-4xl font-medium">{item.title}</h2>
                                            <div className="flex mb-3">
                                                <IconAdress />
                                                <p className="ml-2">{item.adress}</p>
                                            </div>
                                            <div className="flex justify-between w-[70%] mb-3">
                                                <div className="flex">
                                                    <div className=" flex items-center justify-center mr-3">
                                                        <div className="  transform -translate-x w-5 h-5 bg-yellow-500 clip-path-star"></div>
                                                        <div className="  transform -translate-x w-5 h-5 bg-yellow-500 clip-path-star"></div>
                                                        <div className="  transform -translate-x w-5 h-5 bg-yellow-500 clip-path-star"></div>
                                                        <div className="  transform -translate-x w-5 h-5 bg-yellow-500 clip-path-star"></div>
                                                        <div className="  transform -translate-x w-5 h-5 bg-yellow-500 clip-path-star"></div>
                                                    </div>
                                                    <p>5 Star Hotel</p>
                                                </div>
                                                <div className="flex">
                                                    <IconDrink />
                                                    <p className="ml-3"><span className="font-semibold">20+</span> Aminities</p>
                                                </div>
                                            </div>

                                            <div className="flex mb-4">
                                                <Button className="mr-3 bg-white border border-primary hover:bg-slate-100">4.2</Button>
                                                <p className="flex items-center "><span className="text-lg font-medium">Very Good</span> 371 reviews</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p>starting from</p>
                                            <h2 className="font-medium text-red-500"><span className="text-2xl">{item.price}</span>/night</h2>
                                            <p className="text-right">excl. tax</p>
                                        </div>
                                    </div>
                                    <div className="flex "> 
                                        <Button className=" p-5 mr-5 text-xl border border-primary hover:bg-slate-100relative h-full bg-white ">
                                            <IconHeart />
                                        </Button>
                                        <Button className="w-full h-full p-5 text-xl">View Place</Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div>
                <Button className="w-full h-20 text-white bg-black hover:bg-slate-800">Show more results</Button>
            </div>
        </div>
    )
}