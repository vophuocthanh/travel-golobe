import { z } from 'zod'

export const CreateTourSchema = z.object({
  name: z.string().nonempty('Name is required'),
  description: z.string().nonempty('Description is required'),
  image: z.string().nonempty('Image is required'),
  price: z.preprocess((val) => Number(val), z.number().positive()),
  hotelId: z.string().optional(),
  flightId: z.string().optional(),
  roadVehicleId: z.string().optional(),
  start_date: z.string(),
  end_date: z.string(),
  type: z.enum(['open', 'closed'], { message: 'Type must be either "open" or "closed"' })
})
export const UpdateTourSchema = z.object({
  name: z.string().nonempty('Name is required'),
  description: z.string().nonempty('Description is required'),
  image: z.string().nonempty('Image is required'),
  image_2: z.string().nonempty('Image is required'),
  image_3: z.string().nonempty('Image is required'),
  image_4: z.string().nonempty('Image is required'),
  image_5: z.string().nonempty('Image is required'),
  price: z.preprocess((val) => Number(val), z.number().positive()),
  start_date: z.string(),
  end_date: z.string(),
  ideal_time: z.string().nonempty('Ideal time is required'),
  time_trip: z.string().nonempty('Time trip is required'),
  voucher: z.string().nonempty('voucher is required'),
  baby_price: z.number(),
  child_price: z.preprocess((val) => Number(val), z.number().positive()),
  adult_price: z.preprocess((val) => Number(val), z.number().positive()),
  starting_gate: z.string().nonempty('Starting gate is required'),
  sight_seeing: z.string().nonempty('Sight seeing gate is required'),
  cuisine: z.string().nonempty('Cuisine is required'),
  suitable: z.string().nonempty('Suitable is required'),
  rating: z.preprocess((val) => Number(val), z.number().positive()),
  number_of_seats_remaining: z.preprocess((val) => Number(val), z.number().positive())
})
