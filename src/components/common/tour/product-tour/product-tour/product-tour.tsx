import { tour_1 } from "@/assets/images";
import { IconAdress, IconDrink } from "@/common/icons";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export default function ProductTour()  {
    return (
        <div className='w-[70%]'>
            <div>
                <div className="flex">
                    <Button className="flex p-3 bg-slate-100">
                        <h3>Hotels</h3>
                        <p className="flex text-slate-400">257 places</p>
                    </Button>
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

                <div className="flex justify-between mb-5">
                    <img src={tour_1} className="mr-6" alt="" />
                    <div className="p-3">
                        <div className="flex justify-between">
                            <div className="mr-5 ">
                                <h2 className="mb-3 text-4xl font-medium">CVK Park Bosphorus Hotel Istanbul</h2>
                                <div className="flex mb-3">
                                    <IconAdress />
                                    <p>Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437</p>
                                </div>
                                <div className="flex justify-between w-[50%] mb-3">
                                    <div>
                                        <p>5 Star Hotel</p>
                                    </div>
                                    <div className="flex">
                                        <IconDrink />
                                        <p className=""><span className="font-semibold">20+</span> Aminities</p>
                                    </div>
                                </div>

                                <div className="flex mb-4">
                                    <Button className="mr-3 bg-white border border-primary hover:bg-slate-100">4.2</Button>
                                    <p className="flex items-center "><span className="text-lg font-medium">Very Good</span> 371 reviews</p>
                                </div>
                            </div>
                            <div>
                                <p>starting from</p>
                                <h2 className="font-medium text-red-500"><span className="text-2xl">$240</span>/night</h2>
                                <p>excl. tax</p>
                            </div>
                        </div>
                        <div className="flex "> 
                            <Button className="h-full p-5 mr-5 text-xl ">@</Button>
                            <Button className="w-full h-full p-5 text-xl">View Place</Button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mb-5">
                    <img src={tour_1} className="mr-6" alt="" />
                    <div className="p-3">
                        <div className="flex justify-between">
                            <div className="mr-5 ">
                                <h2 className="mb-3 text-4xl font-medium">CVK Park Bosphorus Hotel Istanbul</h2>
                                <div className="flex mb-3">
                                    <IconAdress />
                                    <p>Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437</p>
                                </div>
                                <div className="flex justify-between w-[50%] mb-3">
                                    <div>
                                        <p>5 Star Hotel</p>
                                    </div>
                                    <div className="flex">
                                        <IconDrink />
                                        <p className=""><span className="font-semibold">20+</span> Aminities</p>
                                    </div>
                                </div>

                                <div className="flex mb-4">
                                    <Button className="mr-3 bg-white border border-primary hover:bg-slate-100">4.2</Button>
                                    <p className="flex items-center "><span className="text-lg font-medium">Very Good</span> 371 reviews</p>
                                </div>
                            </div>
                            <div>
                                <p>starting from</p>
                                <h2 className="font-medium text-red-500"><span className="text-2xl">$240</span>/night</h2>
                                <p>excl. tax</p>
                            </div>
                        </div>
                        <div className="flex "> 
                            <Button className="h-full p-5 mr-5 text-xl ">@</Button>
                            <Button className="w-full h-full p-5 text-xl">View Place</Button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mb-5">
                    <img src={tour_1} className="mr-6" alt="" />
                    <div className="p-3">
                        <div className="flex justify-between">
                            <div className="mr-5 ">
                                <h2 className="mb-3 text-4xl font-medium">CVK Park Bosphorus Hotel Istanbul</h2>
                                <div className="flex mb-3">
                                    <IconAdress />
                                    <p>Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437</p>
                                </div>
                                <div className="flex justify-between w-[50%] mb-3">
                                    <div>
                                        <p>5 Star Hotel</p>
                                    </div>
                                    <div className="flex">
                                        <IconDrink />
                                        <p className=""><span className="font-semibold">20+</span> Aminities</p>
                                    </div>
                                </div>

                                <div className="flex mb-4">
                                    <Button className="mr-3 bg-white border border-primary hover:bg-slate-100">4.2</Button>
                                    <p className="flex items-center "><span className="text-lg font-medium">Very Good</span> 371 reviews</p>
                                </div>
                            </div>
                            <div>
                                <p>starting from</p>
                                <h2 className="font-medium text-red-500"><span className="text-2xl">$240</span>/night</h2>
                                <p>excl. tax</p>
                            </div>
                        </div>
                        <div className="flex "> 
                            <Button className="h-full p-5 mr-5 text-xl ">@</Button>
                            <Button className="w-full h-full p-5 text-xl">View Place</Button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mb-5">
                    <img src={tour_1} className="mr-6" alt="" />
                    <div className="p-3">
                        <div className="flex justify-between">
                            <div className="mr-5 ">
                                <h2 className="mb-3 text-4xl font-medium">CVK Park Bosphorus Hotel Istanbul</h2>
                                <div className="flex mb-3">
                                    <IconAdress />
                                    <p>Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437</p>
                                </div>
                                <div className="flex justify-between w-[50%] mb-3">
                                    <div>
                                        <p>5 Star Hotel</p>
                                    </div>
                                    <div className="flex">
                                        <IconDrink />
                                        <p className=""><span className="font-semibold">20+</span> Aminities</p>
                                    </div>
                                </div>

                                <div className="flex mb-4">
                                    <Button className="mr-3 bg-white border border-primary hover:bg-slate-100">4.2</Button>
                                    <p className="flex items-center "><span className="text-lg font-medium">Very Good</span> 371 reviews</p>
                                </div>
                            </div>
                            <div>
                                <p>starting from</p>
                                <h2 className="font-medium text-red-500"><span className="text-2xl">$240</span>/night</h2>
                                <p>excl. tax</p>
                            </div>
                        </div>
                        <div className="flex "> 
                            <Button className="h-full p-5 mr-5 text-xl ">@</Button>
                            <Button className="w-full h-full p-5 text-xl">View Place</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Button className="w-full h-20 text-white bg-black hover:bg-slate-800">Show more results</Button>
            </div>
        </div>
    )
}