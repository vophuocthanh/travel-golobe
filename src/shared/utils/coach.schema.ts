import { z } from 'zod';

export const CreateCoachSchema = z.object({
  brand: z.string().nonempty('Brand is required'), 
  price: z.preprocess((val) => Number(val), z.number().positive().min(0, 'Price must be a positive number')), 
  number_of_seat: z.string().nonempty('Number of seats is required'), 
  start_time: z.string().nonempty('Start time is required'), 
  start_day: z.string().nonempty('Start day is required'),
  end_day: z.string().nonempty('End day is required'), 
  end_time: z.string().nonempty('End time is required'),
  trip_time: z.string().nonempty('Trip time is required'), 
  take_place: z.string().nonempty('Take place is required'),
  destination: z.string().nonempty('Destination is required'), 
  location: z.string().nonempty('Location is required'), 
  // image: z.string().nonempty('Image is required'),  
  // number_of_seats_remaining: z.string().nonempty('Number of seats is required'), 
});

export const UpdateCoachSchema = z.object({
  brand: z.string().optional(), 
  price: z.preprocess((val) => Number(val), z.number().positive().min(0, 'Price must be a positive number').optional()), 
  number_of_seat: z.string().optional(), 
  start_time: z.string().optional(), 
  start_day: z.string().optional(), 
  end_day: z.string().optional(), 
  end_time: z.string().optional(), 
  trip_time: z.string().optional(), 
  take_place: z.string().optional(), 
  destination: z.string().optional(), 
  location: z.string().optional(), 
  image: z.string().optional(), 
  number_of_seats_remaining: z.preprocess((val) => Number(val), z.number().positive().min(0, 'Number of seats remaining must be a positive number').optional()), // Remaining seats is optional
});
