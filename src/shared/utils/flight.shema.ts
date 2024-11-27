import { z } from 'zod'

export const CreateFlightSchema = z.object({
  brand: z.string().nonempty('Brand is required'),
  price: z.preprocess((val) => Number(val), z.number().positive()),
  start_time: z.string(),
  start_day: z.string(),
  end_day: z.string(),
  end_time: z.string(),
  take_place: z.string().nonempty('Take place is required'),
  destination: z.string().nonempty('Destination is required'),
  trip_to: z.string().nonempty('Trip to is required'),
  image: z.string().nonempty('Image is required'),
  type: z.enum(['ONE_WAY', 'ROUND_TRIP'], { message: 'Type must be either "ONE_WAY" or "ROUND_TRIP"' }),
  return_start_time: z.string().optional(),
  return_start_day: z.string().optional(),
  return_end_day: z.string().optional(),
  return_end_time: z.string().optional()
})
export const UpdateFlightSchema = z.object({
  brand: z.string(),
  price: z.preprocess((val) => Number(val), z.number().positive().min(0, 'Price must be a positive number')),
  start_time: z.string(),
  start_day: z.string(),
  end_day: z.string(),
  end_time: z.string(),
  trip_time: z.string(),
  take_place: z.string(),
  destination: z.string(),
  trip_to: z.string(),
  image: z.string(),
  number_of_seats_remaining: z.preprocess(
    (val) => Number(val),
    z.number().positive().min(0, 'Number of seats remaining must be a positive number')
  )
})
