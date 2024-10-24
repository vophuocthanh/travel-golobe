

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { TourInfoResponse } from "@/shared/ts/interface/data.interface"
import moment from "moment";
interface IVehicle {
    data?: TourInfoResponse
}
export default function Schedule({data}: IVehicle) {

    const sortedSchedules = data?.trip_schedules.sort((a, b) => a.day - b.day);
    
    return (
        <div className='mt-16 dark:border dark:border-white dark:rounded-lg dark:p-4'>
            <h2 className='mb-8 text-3xl font-semibold text-center dark:text-white '>Lịch trình</h2>
            <div>
                <Accordion type="single" collapsible className="w-full ">
                    {
                        sortedSchedules?.map((item) => (
                            <AccordionItem className="mb-2 dark:border dark:border-white" value={`item-${item.day}`} key={item.id}>
                                <AccordionTrigger className="!no-underline bg-slate-100 ">
                                    <div>
                                        <div className="flex gap-5 ">
                                            <h3 className="text-xl font-medium "> Ngày: {item.day} </h3>
                                            <h3 className="text-xl font-medium ">{moment(item.date).format('DD/MM/YYYY') } </h3>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="px-5 ">
                                        <div className="text-xl dark:text-white">
                                            <p>{item.schedule}</p>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            </div>

        </div>
    )
}
