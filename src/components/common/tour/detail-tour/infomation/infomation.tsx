import { IconCuisine, IconEndow, IconIdealTime, IconSightseeing, IconSuitable, IconVehicle } from '@/common/icons'
import { TourInfoResponse } from '@/shared/ts/interface/data.interface'

interface IInformation {
  dataInfo?: TourInfoResponse
}

export default function Information({ dataInfo }: IInformation) {
  const data = [
    {
      id: 1,
      icon: <IconSightseeing />,
      title: 'Điểm tham quan',
      text: dataInfo?.sight_seeing
    },
    {
      id: 2,
      icon: <IconCuisine />,
      title: 'Ẩm thực',
      text: dataInfo?.cuisine
    },
    {
      id: 3,
      icon: <IconSuitable />,
      title: 'Đối tượng thích hợp',
      text: dataInfo?.suitable
    },
    {
      id: 4,
      icon: <IconIdealTime />,
      title: 'Thời gian lý tưởng',
      text: dataInfo?.ideal_time
    },
    {
      id: 5,
      icon: <IconVehicle />,
      title: 'Phương tiện',
      text: dataInfo?.road_vehicle?.type 
    },
    {
      id: 6,
      icon: <IconEndow />,
      title: 'Ưu đãi',
      text: dataInfo?.voucher
    }
  ]
  return (
    <div className='mt-16 '>
      <h2 className='mb-8 text-3xl font-semibold text-center'>THÔNG TIN THÊM VỀ CHUYẾN ĐI </h2>
      <div className='grid grid-cols-3 grid-rows-2 gap-4'>
        {data.map((item) => (
          <div key={item.id}>
            <div className='iconTour'>{item.icon}</div>
            <h3 className='py-3 text-xl font-medium'>{item.title}</h3>
            <p className='text-xs'>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
