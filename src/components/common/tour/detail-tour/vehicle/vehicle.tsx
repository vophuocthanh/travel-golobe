
import { IconFlight } from '@/common/icons'
import { formatCurrencyVND } from '@/shared/lib/format-price'
import { TourInfoResponse } from '@/shared/ts/interface/data.interface'
import moment from 'moment'

interface IVehicle {
  data?: TourInfoResponse
}

export default function Vehicle({ data }: IVehicle) {
  
  
  const startDate = moment(data?.start_date).format('DD/MM/YYYY') 
  console.log(data?.start_date,startDate,"egsag");
  const endDate = moment(data?.end_date).format('DD/MM/YYYY') 

  const getAirportCode = (str: string) => {
    const match = str.match(/\((.*?)\)/);
    return match ? match[1] : "";
  };

  const destination: string = (data?.road_vehicle.details.destination) ? getAirportCode(data?.road_vehicle.details.destination) : " ";
  const takePlace: string = (data?.road_vehicle.details.take_place) ? getAirportCode(data?.road_vehicle.details.take_place) : " ";
  
  
  return (
    <div className='mt-16 dark:border dark:border-white dark:rounded-xl'>
      <h2 className='mb-8 text-3xl font-semibold text-center dark:text-white'>LỊCH KHỞI HÀNH </h2>
      <div className='px-5 py-10 rounded-md shadow-2xl'>
        <div className=''>
          <h2 className='text-2xl font-medium text-center text-sky-500 '>PHƯƠNG TIỆN DI CHUYỂN</h2>
          <div className='flex justify-between gap-20 py-4'>
            <div className='w-full'>
              <div className='flex-col items-center justify-center gap-[1rem] w-full'>
                <div className='flex justify-between py-2'>
                  <div className='flex '>
                    <h4 className='text-lg font-medium dark:text-white'>Ngày đi -</h4>
                    <p className='flex items-center text-center dark:text-white'> {startDate}</p>
                  </div>
                  <div className='flex dark:text-white'>
                    <IconFlight />
                    <h3 className='text-lg font-medium text-sky-500 '>{data?.time_trip}</h3>
                  </div>
                </div>
                <div className='flex justify-between w-full py-2'>
                  <p className='text-lg font-medium dark:text-white'>{data?.road_vehicle.details.start_time}</p>
                  <p className='text-lg font-medium dark:text-white'>{data?.road_vehicle.details.end_time}</p>
                </div>
                <div className='flex flex-row items-center justify-center'>
                  <div className=' row--transport'></div>
                </div>
                <div className='relative flex flex-row justify-between w-full py-2'>
                  <p className='text-lg font-medium dark:text-white'>{destination}</p>
                  <div>
                    <p className=' dark:text-white'>{data?.road_vehicle.details.brand}</p>
                  </div>
                  <p className='text-lg font-medium dark:text-white' >{takePlace}</p>
                </div>
              </div>
            </div>
            <div className='w-full'>
              <div className='flex-col items-center justify-center gap-[1rem] w-full'>
                <div className='flex justify-between py-2'>
                  <div className='flex '>
                    <h4 className='text-lg font-medium dark:text-white'>Ngày về -</h4>
                    <p className='flex items-center text-center dark:text-white'> {endDate}</p>
                  </div>
                  <div className='flex dark:text-white'>
                    <IconFlight />
                    <h3 className='text-lg font-medium text-sky-500'>{data?.time_trip}</h3>
                  </div>
                </div>
                <div className='flex justify-between w-full py-2'>
                  <p className='text-lg font-medium dark:text-white'>{data?.road_vehicle.details.start_time}</p>
                  <p className='text-lg font-medium dark:text-white'>{data?.road_vehicle.details.end_time}</p>
                </div>
                <div className='flex flex-row items-center justify-center'>
                  <div className=' row--transport'></div>
                </div>
                <div className='relative flex flex-row justify-between w-full py-2'>
                  <p className='text-lg font-medium dark:text-white'>{takePlace}</p>
                  <div>
                    <p className=' dark:text-white'>{data?.road_vehicle.details.brand}</p>
                  </div>
                  <p className='text-lg font-medium dark:text-white'>{destination}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className='py-8 text-2xl font-medium text-center border-t-2 text-sky-500 '>GIÁ TOUR</h2>
          <div className='flex justify-between gap-20 py-4'>
            <div className='w-full'>
              <div className='flex-col items-center justify-center gap-[1rem] w-full'>
                <div className='flex justify-between py-2'>
                  <div className=''>
                    <h4 className='text-lg font-medium dark:text-white'>Người lớn</h4>
                    <p className='flex items-center text-center dark:text-white'> (Từ 12 tuổi trở lên)</p>
                  </div>
                  <div className='flex'>
                    <h3 className='text-lg font-medium text-red-600'>{formatCurrencyVND(data?.adult_price)}</h3>
                  </div>
                </div>
                <div className='flex justify-between py-2'>
                  <div className=''>
                    <h4 className='text-lg font-medium dark:text-white'>Trẻ em</h4>
                    <p className='flex items-center text-center dark:text-white'> (Từ 2 tuổi đến 12 tuổi)</p>
                  </div>
                  <div className='flex'>
                    <h3 className='text-lg font-medium text-red-600'>{formatCurrencyVND(data?.child_price)}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full'>
              <div className='flex-col items-center justify-center gap-[1rem] w-full'>
                <div className='flex justify-between py-2'>
                  <div className=''>
                    <h4 className='text-lg font-medium dark:text-white'>Em bé</h4>
                    <p className='flex items-center text-center dark:text-white'> (Dưới 2 tuổi)</p>
                  </div>
                  <div className='flex'>
                    <h3 className='text-lg font-medium text-red-600'>{formatCurrencyVND(data?.baby_price)}</h3>
                  </div>
                </div>
                <div className='flex justify-between py-2'>
                  <div className=''>
                    <h4 className='text-lg font-medium dark:text-white'>Phụ thu phòng đơn</h4>
                  </div>
                  <div className='flex'>
                    <h3 className='text-lg font-medium text-red-600'>{formatCurrencyVND(data?.baby_price)}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
