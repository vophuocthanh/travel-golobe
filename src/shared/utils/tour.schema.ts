import { z } from 'zod'

export const CreateTourSchema = z.object({
  name: z.string().nonempty('Name is required'),
  description: z.string().nonempty('Description is required'),
  image: z.string().nonempty('Image is required'),
  price: z.preprocess((val) => Number(val), z.number().positive()),
  hotelId: z.string().nonempty('Hotel ID is required'),
  flightId: z.string().nonempty('Flight ID is required'),
  start_date: z.string(),
  end_date: z.string()
})
