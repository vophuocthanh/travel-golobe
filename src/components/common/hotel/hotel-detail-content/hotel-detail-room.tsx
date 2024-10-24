import { room1 } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { RoomType } from "@/shared/ts/interface/roomtype";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
interface Rom {
  Room: RoomType[];
  onValueChange: (value: string) => void; // Hàm callback truyền dữ liệu lên cha
}

export default function HotelDetailRoom({ Room, onValueChange }: Rom) {
  const { t } = useTranslation();
  const formatCurrency = (value: string | undefined) => {
    if (!value) return 'N/A';
    const numberValue = parseFloat(value);
    return isNaN(numberValue)
      ? 'N/A'
      : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(numberValue);
  };

  const [idTypeRoom, setIdTypeRoom] = useState<string | null>(null);

  const handleClick = (id: string) => {
    if (idTypeRoom === id) {
      setIdTypeRoom(null);
      onValueChange('');
    } else {
      setIdTypeRoom(id);
      onValueChange(id);
    }
  };

  return (
    <div className="flex w-full mt-5">
      <div className="w-full">
        <h1 className="mb-4 text-2xl font-semibold">{t('Rooms')}</h1>
        <div className="space-y-4">
          {Room.map((item: RoomType) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
              <div className="flex items-center">
                <img src={room1} alt="Superior room" className="object-cover w-20 h-20 rounded-md" />
                <div className="ml-4">
                  <h1 className="text-lg">{item.type}</h1>
                </div>
              </div>
              <div className="flex items-center gap-[3rem] text-right">
                <div className="flex items-end">
                  <p className="text-3xl font-semibold">{formatCurrency(item.pricePerDay.toString())}</p>
                </div>
                <Button
                  className="px-4 py-2 mt-2 text-white rounded-md w-[7rem] h-[3rem]"
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
  );
}
