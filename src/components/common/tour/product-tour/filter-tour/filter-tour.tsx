

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"


export default function FilterTour()  {
    return (
        <div className='w-[25%]'>
            <h1 className="mb-8">Filters</h1>
            <div>
                <Accordion type="single"  collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger  >Price</AccordionTrigger>
                        <AccordionContent className="mb-6">
                        <Slider className="w-full mt-3" defaultValue={[33]} max={100} step={1} />
                        <div className="flex justify-between mb-6">
                            <p>$50</p>
                            <p>$1200</p>
                        </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <div className="mt-6">
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger  >Rating</AccordionTrigger>
                        <AccordionContent className="mb-6">
                        <div className="flex gap-5">
                        {
                            [0,1,2,3,4].map((item) =>(
                                <Button className="bg-white border border-primary hover:bg-slate-100">{item}+</Button>
                            ))
                        }
                        </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <div className="mt-6">
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger  >Freebies</AccordionTrigger>
                        <AccordionContent>
                        <div>
                            <div className="flex items-center mb-4 text-xl ">
                                <Checkbox className=""></Checkbox>
                                <p className="ml-4">Free breakfast</p>
                            </div>
                            <div className="flex items-center mb-4 text-xl ">
                                <Checkbox className=""></Checkbox>
                                <p className="ml-4">Free parking</p>
                            </div>
                            <div className="flex items-center mb-4 text-xl ">
                                <Checkbox className=""></Checkbox>
                                <p className="ml-4">Free internet</p>
                            </div>
                            <div className="flex items-center mb-4 text-xl ">
                                <Checkbox className=""></Checkbox>
                                <p className="ml-4">Free airport shuttle</p>
                            </div>
                            <div className="flex items-center mb-4 text-xl ">
                                <Checkbox className=""></Checkbox>
                                <p className="ml-4">Free cancellation</p>
                            </div>
                        </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <div className="mt-6">
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger  >Amenities</AccordionTrigger>
                        <AccordionContent className="mb-6">
                        <div>
                            <div className="flex items-center mb-4 text-xl ">
                                <Checkbox className=""></Checkbox>
                                <p className="ml-4">24hr front desk</p>
                            </div>
                            <div className="flex items-center mb-4 text-xl ">
                                <Checkbox className=""></Checkbox>
                                <p className="ml-4">Air-conditioned</p>
                            </div>
                            <div className="flex items-center mb-4 text-xl ">
                                <Checkbox className=""></Checkbox>
                                <p className="ml-4">Fitness</p>
                            </div>
                            <div className="flex items-center mb-4 text-xl ">
                                <Checkbox className=""></Checkbox>
                                <p className="ml-4">Pool</p>
                            </div>
                            <div className="flex items-center mb-4 text-xl ">
                                <Button className="p-0 text-red-400 bg-white hover:bg-slate-100"> +24 more</Button>
                            </div>
                        </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}