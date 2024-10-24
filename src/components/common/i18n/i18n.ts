import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const locals = {
    en:'English',
    vi:'Tiếng Việt'
}
const resources = {
    en: {
        translation: {
            //home
            'tour': 'Find Tour',
            'hotel': 'Find Hotel',
            'vehicle': 'Vehicle',
            'flight': 'Find Flight',
            'coach': 'Find Coach',
            'login': 'Login',
            'signup': 'Sign up',
            'trip': 'Plan your perfect trip',
            'textTrip': 'Search Flights & Places Hire to our most popular destinations',
            'see': "See All",
            'Flights': "Flights",
            'textFlights': 'Search Flights & Places Hire to our most popular destinations',
            'ShowFlights': 'Show Flights',
            'Hotels': 'Hotels',
            'textHotels': 'Search hotels & Places Hire to our most popular destinations',
            'ShowHotels': 'Show Hotels',
            'Tour': 'Tours',
            'textTour': 'Search Tours & Places Hire to our most popular destinations',
            'Reviews':'Reviews',
            'textReviews': 'What people says about Golobe facilities',
            'Showtour': 'Show tour',
            //tour
            'whereTour': 'Where are you tour ?',
            'travel': 'Fall into travel',
            'textTravel': 'Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination.',
            'Booktour': 'Book tour',

            'Sortby': 'Sort by price',
            'sorting': 'No sorting',
            'High': 'High to low',
            'Low': 'Low to high',
            'ViewDeals': 'View Deals',
            'available': 'No tours available.',
            'availableFlight': 'No flights available.',


            'PriceRange': 'Price Range',
            'Rating': 'Rating',
            'Filter': 'Filter',
            'CancelFilter': 'Cancel Filter',

            'DEPARTURE': 'DEPARTURE SCHEDULE',
            'TRANSPORTATION': 'TRANSPORTATION',
            'ReturnDate': 'Return Date',
            'DepartureDate': 'Departure Date',
            'TOURPRICE': 'TOUR PRICE',
            'Adults': 'Adults',
            'older': '12 years and older',
            'Children': 'Children',
            'Ages': 'Ages 2 to 12',
            'Infants': 'Infants',
            'Under': 'Under 2 years',
            'Room': 'Single Room Supplement',

            'Price': 'Price',
            'Guests': 'Guests',
            'Code': 'Tour Code',
            'Departure': 'Departure',
            'Date': 'Departure Date',
            'Duration': 'Duration',
            'Available': 'Available Seats',
            'seats': 'seats',

            'ADDITIONAL': 'ADDITIONAL INFORMATION ABOUT THE TRIP',
            'Attractions': 'Attractions',
            'Cuisine': 'Cuisine',
            'Suitable': 'Suitable Audience',
            'Ideal': 'Ideal Duration',
            'Transportation': 'Transportation',
            'Offers': 'Offers',

            //review
            'Overview': 'Overview',
            'Level': 'Satisfaction Level.',
            'Delete': 'Delete',
            'Reply': 'Reply',
            'Send': 'Send',
            'Itinerary': 'Itinerary',
            'Date1': 'Date',

            //hotel

            'wherehotel': 'Where is the hotel you want to go?',
            'Promo':'Add Promo Code',
            'places': 'Show places',
            'searches': 'Your recent searches',
            'travelHotel': 'Fall intro travel',
            'textTravelHotel': ' Going somewhere to celebrate this season? Whether you’re gng home or somewhere to roam, we’ve got the travel tools to get you to your destination.',
            'BookHotel': 'Book Hotel',

            'Availab': 'Available',
            'rooms': 'rooms',
            'Select': 'Select date',

            'Rooms':'Available Rooms',
            'select': 'Select',
            'Selected': 'Deselect',

            'Amenities':'Amenities',
            'Outdoor':'Outdoor pool',
            'Indoor':'Indoor pool',
            'Spa':'Spa and wellness center',
            'Restaurant':'Restaurant',
            'service':'Room service',
            'Fitness':'Fitness center',
            'Bar':'Bar/Lounge',
            'Free':'Free Wi-Fi',
            'Tea':'Tea/coffee machine',
            'more':'more',

            //flight
            'flying':'Where are you flying?',
            'together': `Let's go places together`,
            'texttogether':'Discover the latest offers and news and start planning your next trip with us.',
            'travelFlight':'Fall intro travel',
            'textTravelFlight':'Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination.',
            'BookFlight':'Book Flight',

            'Airlines': 'Airlines',
            'DepartureTime':'Departure Time',

            'Economy':'Basic Economy Features',
            'economy': 'Economy',
            'First': 'First Class',
            'Business': 'Business Class',
            'Emirates': 'Emirates Airlines Policies',
            'installation': 'Pre-flight cleaning, installation of cabin HEPA filters.',
            'screening': 'Pre-flight health screening questions.',
            'SelectFlight': 'Select Flight Date',
            'FlightTicket': 'Select Flight Ticket Type',
            'Ticket': 'Ticket',

            'TicketPrice': 'Ticket Price',
            'Baggage': 'Baggage',
            'BaggageFee': 'Baggage Fee',
            'Creation': 'Creation Date',

            //coach
            'WhereCoach': 'Where are you coach?',
            'togetherCoach':`Let's go places together`,
            'textTogetherCoach': 'Discover the latest offers and news and start planning your next trip with us.',
            'travelCoach':'Fall intro travel',
            'textTravelCoach':'Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination.',
            'BookCoach':'Book Coach',
            'Coach':'Coach',
            'Seat':'Seat',

            'Safety':'Coach Service Health and Safety Policies',
            'cleaned':'Pre-Trip Cleaning: Coaches are thoroughly cleaned before every trip, with extra care on high-touch surfaces.',
            'fitted':'Air Filtration: Coaches are fitted with HEPA filters to purify the air, removing up to 99.97% of particles.',
            'complete':'Health Screening: Passengers must complete a short health questionnaire before boarding to ensure safe travel for all.',

        }
    },
    vi: {
        translation: {
            //home
            'tour': 'Tìm Tour',
            'hotel': 'Tìm Khách sạn',
            'vehicle': 'Phương tiện',
            'flight': 'Tìm Chuyến bay',
            'coach': 'Tìm Xe khách',
            'login': 'Đăng nhập',
            'signup': 'Đăng ký',
            'trip': 'Lên kế hoạch cho chuyến đi hoàn hảo của bạn',
            'textTrip': 'Tìm kiếm Chuyến bay & Địa điểm Thuê tại những điểm đến phổ biến nhất của chúng tôi',
            'see': "Xem tất cả",
            'Flights': "Chuyến bay",
            'textFlights': 'Tìm kiếm Chuyến bay & Địa điểm Thuê tại những điểm đến phổ biến nhất của chúng tôi',
            'Hotels': 'Khách sạn',
            'textHotels': 'Tìm kiếm khách sạn & Địa điểm Thuê tại những điểm đến phổ biến nhất của chúng tôi',
            'Tour': 'Tour du lịch',
            'textTour': 'Tìm kiếm Tour & Địa điểm Thuê tại những điểm đến phổ biến nhất của chúng tôi',
            'Reviews': 'Đánh giá',
            'textReviews': 'Mọi người nói gì về các tiện nghi của Golobe',
            'Showtour': 'Hiển thị tour',
            'ShowFlights': 'Hiển thị Chuyến bay',
            'ShowHotels': 'Hiển thị Khách sạn',
            //tour
            'whereTour': 'Bạn đang ở tour nào?',
            'travel': 'Đắm mình trong hành trình',
            'textTravel': 'Bạn đang đi đâu để kỷ niệm mùa này? Dù bạn về nhà hay đi khám phá, chúng tôi có các công cụ du lịch để đưa bạn đến điểm đến của mình.',
            'Booktour': 'Đặt tour',

            'Sortby': 'Sắp xếp theo giá',
            'sorting': 'Không sắp xếp',
            'High': 'Từ cao đến thấp',
            'Low': 'Từ thấp đến cao',
            'ViewDeals': 'Xem ưu đãi',
            'available': 'Không có tour nào phù hợp.',
            'availableFlight': 'Không có vé nào cho chuyến bay này',

            'PriceRange': 'Khoảng giá',
            'Rating': 'Đánh giá',
            'Filter': 'Lọc',
            'CancelFilter': 'Hủy lọc',

            'DEPARTURE': 'LỊCH KHỞI HÀNH',
            'TRANSPORTATION': 'PHƯƠNG TIỆN DI CHUYỂN',
            'DepartureDate': 'Ngày đi',
            'ReturnDate': 'Ngày về',
            'TOURPRICE': 'GIÁ TOUR',
            'Adults': 'Người lớn',
            'older': 'Từ 12 tuổi trở lên',
            'Children': 'Trẻ em',
            'Ages': 'Từ 2 tuổi đến 12 tuổi',
            'Infants': 'Em bé',
            'Under': 'Dưới 2 tuổi',
            'Room': 'Phụ thu phòng đơn',

            'Price': 'Giá',
            'Guests': 'Khách',
            'Code': 'Mã tour',
            'Departure': 'Khởi hành',
            'Date': 'Ngày khởi hành',
            'Duration': 'Thời gian',
            'Available': 'Số chỗ còn',
            'seats': 'chỗ',


            'ADDITIONAL': 'THÔNG TIN THÊM VỀ CHUYẾN ĐI',
            'Attractions': 'Điểm tham quan',
            'Cuisine': 'Ẩm thực',
            'Suitable': 'Đối tượng thích hợp',
            'Ideal': 'Thời gian lý tưởng',
            'Transportation': 'Phương tiện',
            'Offers': 'Ưu đãi',

            'Overview': 'Tổng quan',
            'Level': 'Mức độ hài lòng.',
            'Delete': 'Xoá',
            'Reply': 'Trả lời',
            'Send': 'Gửi',
            'Itinerary': 'Lịch trình',
            'Date1': 'Ngày',

            //hotel
            'wherehotel': 'Khách sạn bạn muốn đến ở đâu?',
            'Promo': 'Thêm mã khuyến mãi',
            'places': 'Hiển thị địa điểm',
            'searches': 'Tìm kiếm gần đây của bạn',
            'travelHotel': 'Đắm mình vào hành trình',
            'textTravelHotel': 'Bạn đang đi đâu để kỷ niệm mùa này? Dù bạn về nhà hay đi khám phá, chúng tôi có các công cụ du lịch để đưa bạn đến điểm đến của mình.',
            'BookHotel': 'Đặt khách sạn',

            'Availab': 'Còn',
            'rooms': 'phòng',
            'Select': 'Chọn ngày',
            'Rooms': 'Phòng còn trống',
            'select': 'Chọn',
            'Selected': 'Bỏ chọn',
            'Seat':'Chỗ ngồi',
            

            'Amenities': 'Tiện nghi',
            'Outdoor': 'Hồ bơi ngoài trời',
            'Indoor': 'Hồ bơi trong nhà',
            'Spa': 'Trung tâm spa và chăm sóc sức khỏe',
            'Restaurant': 'Nhà hàng',
            'service': 'Dịch vụ phòng',
            'Fitness': 'Trung tâm thể dục',
            'Bar': 'Quầy bar/Phòng chờ',
            'Free': 'Wi-Fi miễn phí',
            'Tea': 'Máy pha trà/cà phê',
            'more': 'xem thêm',

            //flight
            'flying': 'Bạn đang bay đến đâu?',
            'together': 'Hãy cùng nhau đi khắp nơi',
            'texttogether': 'Khám phá những ưu đãi và tin tức mới nhất và bắt đầu lên kế hoạch cho chuyến đi tiếp theo của bạn cùng chúng tôi.',
            'travelFlight': 'Đắm mình vào hành trình',
            'textTravelFlight': 'Bạn đang đi đâu để kỷ niệm mùa này? Dù bạn về nhà hay đi khám phá, chúng tôi có các công cụ du lịch để đưa bạn đến điểm đến của mình.',
            'BookFlight': 'Đặt chuyến bay',

            'Airlines': 'Hãng hàng không',
            'DepartureTime': 'Thời gian khởi hành',

            'Economy': 'Các tính năng kinh tế cơ bản',
            'economy': 'Kinh tế',
            'First': 'Hạng nhất',
            'Business': 'Hạng thương gia',
            'Emirates': 'Chính sách của Emirates Airlines',
            'installation': 'Vệ sinh trước chuyến bay, lắp đặt bộ lọc HEPA trong cabin.',
            'screening': 'Câu hỏi kiểm tra sức khỏe trước chuyến bay.',
            'SelectFlight': 'Chọn ngày chuyến bay',
            'FlightTicket': 'Chọn loại vé máy bay',
            'Ticket': 'Vé',

            'TicketPrice':'Giá vé',
            'Baggage':'Hành lý',
            'BaggageFee':'Phí hành lý',
            'Creation':'Ngày tạo',

            //coach
            'WhereCoach': 'Bạn đang đi xe đến đâu?',
            'togetherCoach': 'Hãy cùng nhau đi khắp nơi',
            'textTogetherCoach': 'Khám phá những ưu đãi và tin tức mới nhất và bắt đầu lên kế hoạch cho chuyến đi tiếp theo của bạn cùng chúng tôi.',
            'travelCoach': 'Đắm mình vào hành trình',
            'textTravelCoach': 'Bạn đang đi đâu để kỷ niệm mùa này? Dù bạn về nhà hay đi khám phá, chúng tôi có các công cụ du lịch để đưa bạn đến điểm đến của mình.',
            'BookCoach': 'Đặt xe',
            'Coach': 'Xe khách',

            'Safety': 'Chính sách về sức khỏe và an toàn của dịch vụ xe khách',
            'cleaned': 'Vệ sinh trước chuyến đi: Xe khách được vệ sinh kỹ lưỡng trước mỗi chuyến đi, đặc biệt chú ý đến các bề mặt thường xuyên tiếp xúc.',
            'fitted': 'Lọc không khí: Xe khách được lắp đặt bộ lọc HEPA để làm sạch không khí, loại bỏ tới 99.97% các hạt bụi.',
            'complete': 'Kiểm tra sức khỏe: Hành khách phải hoàn thành một bảng câu hỏi sức khỏe ngắn trước khi lên xe để đảm bảo an toàn cho tất cả mọi người.',
        }
    }
}
i18n.use(initReactI18next).init({
    resources,
    lng:'vi',
    interpolation: {
        escapeValue: false 
    }
})