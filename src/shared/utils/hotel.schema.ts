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
  
  export const HotelUpdateSchema = z.object({
    hotel_names: z.string().min(1, { message: 'Hotel name is required' }),  
    location: z.string().min(1, { message: 'Location is required' }),  
    star_number: z.preprocess((val) => Number(val), z.number().positive()),
    price: z.number().min(0, { message: 'Price must be a positive number' }),
    score_hotels: z.number().min(0, { message: 'Price must be a positive number' }),
    number_rating: z.preprocess((val) => Number(val), z.number().positive()),
    received_time: z.string().min(1, { message: 'Received time is required' }),
    giveback_time: z.string().min(1, { message: 'Giveback time is required' }),  
    description: z.string().optional(),  
    hotel_link: z.string().url({ message: 'Hotel link must be a valid URL' }).optional(),
    place: z.string().min(1, { message: 'Place is required' }),
    image: z.string().optional(),
    image_2: z.string().optional(),
    image_3: z.string().optional(),
    image_4: z.string().optional(), 
    image_5: z.string().optional(), 
    number_of_seats_remaining: z.preprocess((val) => Number(val), z.number().positive()),
  });
  