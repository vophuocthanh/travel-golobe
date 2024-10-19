import { z } from 'zod';

export const CreateFlightSchema = z.object({
  brand: z.string().nonempty('Brand is required'),
  price: z.preprocess((val) => Number(val), z.number().positive()),
  start_time: z.string(),
  start_day: z.string(),
  end_day: z.string(),
  end_time: z.string(),
  trip_time: z.string().nonempty('Trip time is required'),
  take_place: z.string().nonempty('Take place is required'),
  destination: z.string().nonempty('Destination is required'),
  trip_to: z.string().nonempty('Trip to is required'),
  image: z.string().nonempty('Image is required')
});
export const UpdateFlightSchema = z.object({
  brand: z.string().nonempty('Brand is required'),
  price: z.preprocess((val) => Number(val), z.number().positive().min(0, 'Price must be a positive number')),
  start_time: z.string().nonempty('Start time is required'),
  start_day: z.string().nonempty('Start day is required'),
  end_day: z.string().nonempty('End day is required'),
  end_time: z.string().nonempty('End time is required'),
  trip_time: z.string().nonempty('Trip time is required'),
  take_place: z.string().nonempty('Take place is required'),
  destination: z.string().nonempty('Destination is required'),
  trip_to: z.string().nonempty('Trip to is required'),
  image: z.string().nonempty('Image is required'),
  number_of_seats_remaining: z.preprocess((val) => Number(val), z.number().positive().min(0, 'Number of seats remaining must be a positive number')),
});