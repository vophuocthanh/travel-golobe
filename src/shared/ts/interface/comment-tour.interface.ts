export interface CommentTour {
    id: string
    content: string
    rating: number
    createAt: string
    updateAt: string
    userId: string
    flightId: string
    avatar?: string
  }
  export  interface Tour {
    id?: string
    name: string
    description: string
    price: string
    image: string
    isFavorite: boolean
  }
  export  interface TabProps {
    label: string
    description: string
    isActive: boolean
    onClick: () => void
  }
  export  interface Hotel {
    id: string,
    hotel_names: string,
    location: string,
    price: number,
    score_hotels: number,
    number_rating: number,
    star_number: number,
    received_time: string,
    giveback_time: string,
    description: string,
    hotel_link: string,
    place: string,
    image: null,
    image_2: null,
    image_3: null,
    image_4: null,
    image_5: null,
    userId: null,
    number_of_seats_remaining: null
  }
  export  interface Flight {
    id: string,
    brand: string,
    price: 588258,
    start_time: string,
    start_day: string,
    end_day: string,
    end_time: string,
    trip_time: string,
    take_place: string,
    destination: string,
    trip_to: string,
    createAt: string,
    updateAt: string,
  }
  export  interface PaginatedHotels {
    items: Hotel[];         
    total: number;         
    currentPage: number;   
    itemsPerPage: number;    
  }
  export  interface InfomationTour {
    id: number,
    icon: string,
    title: string,
    text: string
  }
  