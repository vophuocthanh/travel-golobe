export interface HotelBooking {
    bookingId?: string;              // ID của đặt phòng
    hotelId?: string;                // ID của khách sạn
    id?: string;                     // ID duy nhất của khách sạn
    hotel_names?: string;            // Tên khách sạn
    location?: string;                // Địa chỉ khách sạn
    price?: number;                   // Giá của đặt phòng
    score_hotels?: number;            // Điểm đánh giá của khách sạn
    number_rating?: number;           // Số lượng đánh giá
    star_number?: number;             // Số sao của khách sạn
    received_time: string;           // Thời gian nhận phòng
    giveback_time: string;           // Thời gian trả phòng
    description: string;             // Mô tả về khách sạn
    hotel_link: string;              // Liên kết đến trang web của khách sạn
    place: string;                   // Địa điểm của khách sạn
    image?: string | null;           // Hình ảnh chính của khách sạn
    image_2?: string | null;         // Hình ảnh thứ hai của khách sạn
    image_3?: string | null;         // Hình ảnh thứ ba của khách sạn
    image_4?: string | null;         // Hình ảnh thứ tư của khách sạn
    image_5?: string | null;         // Hình ảnh thứ năm của khách sạn
    userId?: string | null;          // ID của người dùng đã đặt
    number_of_seats_remaining: number; // Số lượng chỗ còn lại
    hotelQuantity: number;           // Số lượng phòng khách sạn được đặt
    status: string;                  // Trạng thái của đặt phòng
    /* eslint-disable @typescript-eslint/no-explicit-any */
    invoice: any[];                  // Hóa đơn liên quan đến đặt phòng
}
