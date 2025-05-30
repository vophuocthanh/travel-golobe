export const path = {
  home: '/',
  login: '/login',
  register: '/register',
  verify_code: '/verify-code',
  forgot_password: '/forgot-password',
  reset_password: '/reset-password',
  hotel: '/hotel',
  home_stay: '/hotel/home-stay',
  hotelId: '/hotel/:id',
  flight: '/vehicle/flight',
  all_flight: '/vehicle/flight/all-flight',
  flight_detail: '/vehicle/flight/:id',
  coach: '/vehicle/coach',
  all_coach: '/vehicle/coach/all-coach',
  coach_detail: '/vehicle/coach/:id',
  tour: '/tour',
  tourDetailView: '/tour/:id',
  tourAll: '/tour/all-tour',
  profile: '/profile',
  payment: {
    coach: '/vehicle/coach/all-coach/coach-payment/:id',
    flight: '/vehicle/flight/all-flight/flight-payment/:id',
    tour: '/tour/all-tour/tour-payment/:id',
    hotel: '/hotel/home-stay/hotel-payment/:id'
  },
  admin: {
    root: '/admin/dashboard',
    users: '/admin/users',
    userById: '/admin/users/:id',
    billing: '/admin/billing',
    billing_views: {
      all: '/admin/billing/all-view',
      hotel: '/admin/billing/hotel-view/:id',
      flight: '/admin/billing/flight-view/:id',
      tour: '/admin/billing/tour-view/:billingID',
      coach: '/admin/billing/coach-view/:id'
    },
    payments: '/admin/payments',
    payment_view: '/admin/payment/payment-view/:paymentID',
    tours: '/admin/tours',
    tour_create: '/admin/tours/create',
    tour_edit: '/admin/tours/:id',
    flights: '/admin/flights',
    flight_create: '/admin/flights/create',
    flight_edit: '/admin/flights/:id',
    hotels: '/admin/hotels',
    hotel_add: '/admin/hotels/add-hotel',
    hotel_edit: '/admin/hotels/:id',
    road_vehicle: '/admin/road-vehicle',
    road_vehicle_create: '/admin/road-vehicle/create',
    road_vehicle_edit: '/admin/road-vehicle/:id',
    road_vehicle_view: '/admin/road-vehicle/view/:id'
  }
} as const
