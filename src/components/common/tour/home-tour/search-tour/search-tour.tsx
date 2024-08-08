import { tour_search1 } from "@/assets/images"

const dataTourSearch = [
    {
        id: 1,
        image: tour_search1,
        title: 'Istanbul, Turkey',
        text: '325 places'
    },
    {
        id: 2,
        image: tour_search1,
        title: 'Istanbul, Turkey',
        text: '325 places'
    },
    {
        id: 3,
        image: tour_search1,
        title: 'Istanbul, Turkey',
        text: '325 places'
    },
    {
        id: 4,
        image: tour_search1,
        title: 'Istanbul, Turkey',
        text: '325 places'
    }
]
export default function SearchTour()  {
    return (
        <div className='h-40 px-32 py-3 mb-20 rounded-2xl'>
            <div className='w-full '>
                <h2 className="mb-8 text-2xl font-medium">Your recent searches</h2>
                <div className="flex justify-between">
                    {
                        dataTourSearch.map((item) => (
                            <div key={item.id} className="flex">
                                <img src={item.image} className="mr-4" alt="" />
                                <div className="flex items-center">
                                    <div>
                                        <h3 className="text-lg font-medium">{item.title}</h3>
                                        <p className="text-slate-400">{item.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}