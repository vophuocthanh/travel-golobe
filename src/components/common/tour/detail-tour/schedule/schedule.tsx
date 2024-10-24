

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { TourInfoResponse } from "@/shared/ts/interface/data.interface"
import moment from "moment";
import { useTranslation } from 'react-i18next';
interface IVehicle {
    data?: TourInfoResponse
}
export default function Schedule({data}: IVehicle) {
    const { t } = useTranslation();

    const sortedSchedules = data?.trip_schedules.sort((a, b) => a.day - b.day);
    
    return (
        <div className='mt-16 '>
            <h2 className='mb-8 text-3xl font-semibold text-center'>{t('Itinerary')}</h2>
            <div>
                <Accordion type="single" collapsible className="w-full">
                    {
                        sortedSchedules?.map((item) => (
                            <AccordionItem className="mb-2" value={`item-${item.day}`} key={item.id}>
                                <AccordionTrigger className="!no-underline bg-slate-100">
                                    <div>
                                        <div className="flex gap-5">
                                            <h3 className="text-xl font-medium "> {t('Date1')}: {item.day} </h3>
                                            <h3 className="text-xl font-medium ">{moment(item.date).format('DD/MM/YYYY') } </h3>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="px-5 ">
                                        <div className="text-xl">
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
