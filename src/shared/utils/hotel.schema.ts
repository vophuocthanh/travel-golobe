import { z } from 'zod';

export const CreateHotelSchema = z.object({
    hotel_names: z.string().min(1, { message: 'Tên khách sạn là bắt buộc' }),
    location: z.string().min(1, { message: 'Địa chỉ là bắt buộc' }),
    price: z.preprocess((val) => Number(val), z.number().positive()),
    image: z.string().url({ message: 'Đường dẫn ảnh không hợp lệ' }), 
    received_time: z.string().min(1, { message: 'Giờ nhận phòng là bắt buộc' }),
    giveback_time: z.string().min(1, { message: 'Giờ trả phòng là bắt buộc' }),
    description: z.string().optional(),
  });
  