import { room1 } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { formatCurrencyVND } from '@/shared/lib/format-price'
import { RoomType } from '@/shared/ts/interface/roomtype'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
interface Rom {
  Room: RoomType[]
  onValueChange: (value: string) => void // Hàm callback truyền dữ liệu lên cha
}

export default function HotelDetailRoom({ Room, onValueChange }: Rom) {
  const { t } = useTranslation()

  const [idTypeRoom, setIdTypeRoom] = useState<string | null>(null)

  const handleClick = (id: string) => {
    if (idTypeRoom === id) {
      setIdTypeRoom(null)
      onValueChange('')
    } else {
      setIdTypeRoom(id)
      onValueChange(id)
    }
  }

  return (
    <div className='flex w-full mt-5'>
      <div className='w-full'>
        <h1 className='mb-4 text-2xl font-semibold'>{t('Rooms')}</h1>
        <div className='space-y-4'>
          {Room.map((item: RoomType) => (
            <div
              key={item.id}
              className='grid grid-cols-2 lg:grid-cols-2 gap-6 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'
            >
              {/* Hình ảnh và thông tin phòng */}
              <div className='grid grid-cols-[auto_1fr] col-span-1 items-center gap-4'>
                <img
                  src={room1}
                  alt='Superior room'
                  className='object-cover w-20 h-20 rounded-md'
                />
                <h1 className='text-lg font-semibold text-gray-800'>{`Phòng ${item.type}`}</h1>
              </div>

              {/* Giá và nút chọn */}
              <div className='grid grid-cols-1 lg:grid-cols-4 col-span-1 items-center gap-4 lg:gap-12 text-center lg:text-right'>
                {/* Giá tiền */}
                <p className='lg:text-3xl text-2xl font-semibold col-span-3 text-gray-900 text-right'>
                  {formatCurrencyVND(item.pricePerDay)} /night
                </p>

                {/* Nút chọn */}
                <div className='w-full flex justify-end col-span-2 lg:col-span-1'>
                  <Button
                    className='px-6 py-3 text-white rounded-md w-[10rem] h-[3rem] transition-transform transform hover:scale-105 focus:outline-none'
                    onClick={() => handleClick(item.id)}
                    disabled={idTypeRoom !== null && idTypeRoom !== item.id}
                  >
                    {idTypeRoom === item.id ? t('Selected') : t('select')}
                  </Button>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    </div>

  )
}
