
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {  useQuery } from "@tanstack/react-query"
import { hotelApi } from "@/apis/hotel.api"
import { flightApi } from "@/apis/flight.api"
import { Flight, Hotel } from "@/shared/ts/interface/comment-tour.interface"



export function Infomation() {

  const {data: getAllHotel} = useQuery({
    queryKey: ['getAllHotel'],
    queryFn: () => hotelApi.getAll(1,10),
  })

  console.log(getAllHotel, "data");
  const {data: getAllFlight} = useQuery({
    queryKey: ['getAllFlight'],
    queryFn: () => flightApi.getAll()
  })
  console.log(getAllFlight?.data, "data123");
  
  return (
    <div className="flex justify-around">
      {/* hotel */}
      <div>
      <Select>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Hotel" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {
            getAllHotel?.data.map((item: Hotel) => (
              <div key={item.id}>
                <SelectItem value={item.id}>{item.hotel_names}</SelectItem>
              </div>
            ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
        
      </div>

      <div>
        <Select>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Flight" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {
              getAllFlight?.data.map((item: Flight) => (
                <div key={item.id}>
                  <SelectItem className="flex justify-around" value={item.id}><span className="">{item.brand}</span>:<span className="text-center text-red-500 ">${item.price}</span></SelectItem>
                </div>
              ))
              }
            </SelectGroup>
          </SelectContent>
        </Select>
        
      </div>
    </div>
  )
}
