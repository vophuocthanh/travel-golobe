import { bookingHotelApi } from "@/apis/booking-hotel.api";
import { hoteldetail1 } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftToLine } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function BillingHotelView() {
  const { id } = useParams<{ userId: string, id: string }>()


  const { data: getbyIdHotelBiling } = useQuery({
    queryKey: ['getbyIdHotelBiling', id],
    queryFn: () => bookingHotelApi.getBookingDetail(id || '')
  })

  const navigate = useNavigate();



  const handleBack = () => {
    navigate('/admin/billing');
  };

  const getStatusClass = () => {
    switch (getbyIdHotelBiling?.status) {
      case "CONFIRMED":
        return "bg-green-300";
      case "PENDING":
        return "bg-yellow-300";
      case "CANCELLED":
        return "bg-red-300";
      default:
        return "";
    }
  };

  return (
    <div className="w-full p-2 mb-5">
      <h1 className="mb-2 text-2xl font-bold">Thanh toán khách sạn {id}</h1>
      <Button className="flex mb-4 mr-auto text-white" onClick={handleBack}>
        <ArrowLeftToLine />
      </Button>
      <form className="space-y-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-xl font-bold">Thông tin khách hàng</h2>
          <div className='grid grid-cols-3 gap-4 mb-4'>
            <div className='w-[10rem] p-2 h-[10rem] col-span-1 flex mx-auto'>
              <img src={getbyIdHotelBiling?.user.avatar} alt='hotel' className='w-full h-full rounded-full' />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="customerName" className="block mb-1 text-sm font-medium text-gray-700">
                Tên khách hàng
                </label>
                <Input
                  type="text"
                  name="customerName"
                  placeholder="Customer Name"
                  value={getbyIdHotelBiling?.user.id}
                  className="p-2 border rounded "
                  disabled
                />
              </div>

              <div>
                <label htmlFor="customerEmail" className="block mb-1 text-sm font-medium text-gray-700">
                Email của khách hàng
                </label>
                <Input
                  type="email"
                  name="customerName"
                  placeholder="Customer Name"
                  value={getbyIdHotelBiling?.user.name}
                  className="p-2 border rounded "
                  disabled
                />
              </div>
            </div>

          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-xl font-bold">Thông tin khách sạn</h2>
          <div className='grid grid-cols-3 gap-4 mb-4'>
            <div className='w-[10rem] p-2 h-[10rem] col-span-1 flex mx-auto my-auto'>
              <img src={hoteldetail1} alt='hotel' className='w-full h-full rounded-full' />
            </div>
            <div className="col-span-2">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div className="col-span-1">
                  <p>Tên khách sạn</p>
                  <Input
                    type="text"
                    name="hotelName"
                    placeholder="Hotel Name"
                    value={getbyIdHotelBiling?.hotel_names}
                    className="p-2 border rounded "
                    disabled
                  />
                </div>
                <div className="col-span-1">
                  <p>Vị trí khách sạn</p>
                  <Input
                    type="text"
                    name="hotelLocation"
                    placeholder="Hotel Location"
                    value={getbyIdHotelBiling?.place}
                    className="p-2 border rounded "
                    disabled
                  />
                </div>
                <div className="col-span-1">
                  <p>Nhận phòng khách sạn</p>
                  <Input
                    type="text"
                    name="hotelCheckIn"
                    placeholder="Check-In Time"
                    value={getbyIdHotelBiling?.giveback_time}
                    className="col-span-1 p-2 border rounded"
                    disabled
                  />
                </div>
                <div className="col-span-1">
                  <p>Trả phòng khách sạn</p>
                  <Input
                    type="text"
                    name="hotelCheckOut"
                    placeholder="Check-Out Time"
                    value={getbyIdHotelBiling?.received_time}
                    className="col-span-1 p-2 border rounded"
                    disabled
                  />
                </div>
                <div className="col-span-1">
                  <p>Phòng</p>
                  <Input
                    type="number"
                    name="hotelRooms"
                    placeholder="Number of Rooms"
                    value={getbyIdHotelBiling?.hotelQuantity}
                    className="col-span-1 p-2 border rounded"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-xl font-bold">Thông tin thanh toán</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="col-span-1">
              <p>Mã số thanh toán</p>
              <Input
                type="text"
                name="id"
                placeholder="Billing ID"
                value={getbyIdHotelBiling?.id}
                className="p-2 border rounded"
                disabled
              />
            </div>
            <div className="col-span-1">
              <p>Thời gian thanh toán</p>
              <Input
                type="text"
                name="billingTime"
                placeholder="Billing Time"
                value={"Billing Time"}
                className="p-2 border rounded"
                disabled
              />
            </div>
            <div className="col-span-1">
              <p>Kế hoạch</p>
              <Input
                type="text"
                name="plan"
                placeholder="Plan"
                value={"plan"}
                className="p-2 border rounded"
                disabled
              />
            </div>
            <div className="col-span-1">
              <p>Số lượng</p>
              <Input
                type="number"
                name="amount"
                placeholder="Amount"
                value={getbyIdHotelBiling?.price}
                className="p-2 border rounded"
                disabled
              />
            </div>
            <div className="col-span-1">
              <p>Trạng thái</p>
              <Input
                type="text"
                name="status"
                placeholder="Status"
                value={getbyIdHotelBiling?.status}
                className={`col-span-1 p-2 border rounded ${getStatusClass()}`}
                disabled
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
