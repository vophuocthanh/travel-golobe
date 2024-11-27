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
            <div key={item.id} className='flex flex-col md:flex-row items-center justify-between p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='flex items-center mb-4 md:mb-0'>
                <img src={room1} alt='Superior room' className='object-cover w-20 h-20 rounded-md' />
                <div className='ml-4'>
                  <h1 className='text-lg font-semibold text-gray-800'>{`Phòng ${item.type}`}</h1>
                </div>
              </div>

              <div className='flex flex-col md:flex-row items-center gap-4 md:gap-[3rem] text-center lg:text-right'>
                <div className='flex items-end'>
                  <p className='text-3xl font-semibold text-gray-900'>
                    {formatCurrencyVND(item.pricePerDay)} / 1 đêm
                  </p>
                </div>
                <Button
                  className='px-6 py-3 mt-2 text-white rounded-md w-[7rem] h-[3rem] transition-transform transform hover:scale-105 focus:outline-none'
                  onClick={() => handleClick(item.id)}
                  disabled={idTypeRoom !== null && idTypeRoom !== item.id}
                >
                  {idTypeRoom === item.id ? t('Selected') : t('select')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}
