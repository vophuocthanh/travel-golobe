export interface FlightCardProps {
    id?: string
    image?: string
    price?: number
    rating?: string
    reviews?: string
    brand?: string
    trip_time?: string
    images?: string
    start_time?: string
    end_time?: string
    trip_to?: string
    take_place?: string
    create_at?: string
    destination?: string
    isFavorite: boolean
    onToggleFavorite: () => void
  }