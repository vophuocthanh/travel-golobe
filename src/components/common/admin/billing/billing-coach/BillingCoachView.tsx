import { bookingCoachApi } from "@/apis/booking-coach";
import { avatar1, coachdetail1} from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftToLine } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function BillingCoachView() {
  const { id } = useParams();

  const { data: getBookingDetail } = useQuery({
    queryKey: ['getBookingDetail', id],
    queryFn: () => bookingCoachApi.getBookingDetail(id),
    enabled: !!id,
  });

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/admin/billing');
  };

  const getStatusClass = () => {
    switch (getBookingDetail?.status) {
      case "success":
        return "bg-green-300";
      case "processing":
        return "bg-yellow-300";
      case "PENDING":
        return "bg-red-300";
      default:
        return "";
    }
  };
    const formatDateTime = (dateString:string, timeString:string) => {
      if (!dateString || !timeString) return ""; 
      const date = new Date(dateString);
      return isNaN(date) ? "" : `${date.toLocaleDateString('vi-VN')} ${timeString}`;
    };
  
  const formattedPrice  = new Intl.NumberFormat('vn-Vn', {
    style: 'currency',
    currency: 'VND'
  }).format(getBookingDetail?.price || 0);
  
  return (
    <div className="w-full p-2 mb-5">
      <h1 className="mb-2 text-2xl font-bold">Coach Billing {id}</h1>
      <Button className="flex mb-4 mr-auto text-white" onClick={handleBack}>
        <ArrowLeftToLine />
      </Button>
      <form className="space-y-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-xl font-bold">Customer Information</h2>
          <div className='grid grid-cols-3 gap-4 mb-4'>
            <div className='w-[10rem] p-2 h-[10rem] col-span-1 flex mx-auto'>
              <img src={avatar1} alt='hotel' className='w-full h-full rounded-full' />
            </div>
            <div className="grid col-span-1 gap-x-6 gap-y-4 ">
              <Input
                type="text"
                name="customerID"
                placeholder="Customer ID"
                value={getBookingDetail?.userId}
                className="p-2 border rounded "
                disabled
              />
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-xl font-bold">Coach Information</h2>
          <div className='grid grid-cols-3 gap-4 mb-4'>
            <div className='w-[15rem] p-2 h-[10rem] col-span-1 flex mx-auto my-auto'>
                <img src={coachdetail1} alt='hotel' className='object-cover w-full h-full rounded-full' />
            </div>
            <div className="col-span-2">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div className="col-span-1">
              <p>Name Coach</p>
              <Input
                type="text"
                name="Coach Brand"
                placeholder="Coach Brand"
                value={getBookingDetail?.brand}
                className="p-2 border rounded"
                disabled
              />
            </div>
            <div className="col-span-1">
              <p>Coach ID</p>
              <Input
                type="text"
                name="coachId"
                placeholder="Coach ID"
                value={getBookingDetail?.roadVehicleId}
                className="p-2 border rounded"
                disabled
              />
            </div>
            <div className="col-span-1">
              <p>Seat Number</p>
              <Input
                type="text"
                name="number_of_seat"
                placeholder="Seat Number"
                value={getBookingDetail?.number_of_seat || ""}
                className="p-2 border rounded"
                disabled
              />
            </div>
            <div className="col-span-1">
              <p>Road Vehicle Quantity</p>
              <Input
                type="text"
                name="roadVehicleQuantity"
                placeholder="roadVehicleQuantity"
                value={getBookingDetail?.roadVehicleQuantity}
                className="p-2 border rounded"
                disabled
              />
            </div>
            <div className="col-span-1">
              <p>Departure Time</p>
              <Input
                type="text"
                name="start_time"
                placeholder="Departure Time"
                value={formatDateTime(getBookingDetail?.start_day, getBookingDetail?.start_time)}
                className="p-2 border rounded"
                disabled
              />
            </div>
            <div className="col-span-1">
              <p>Departure Time</p>
              <Input
                type="text"
                name="start_time"
                placeholder="Arrival Time"
                value={formatDateTime(getBookingDetail?.end_day, getBookingDetail?.end_time)}
                className="p-2 border rounded"
                disabled
              />
            </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-xl font-bold">Billing Information</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="col-span-1">
              <p>Billing ID</p>
              <Input
                type="text"
                name="id"
                placeholder="Billing ID"
                value={id}
                className="p-2 border rounded"
                disabled
              />
            </div>
            <div className="col-span-1">
              <p>Billing Time</p>
              <Input
                type="text"
                name="billingTime"
                placeholder="Billing Time"
                className="p-2 border rounded"
                disabled
              />
            </div>
            <div className="col-span-1">
              <p>Plan</p>
              <Input
                type="text"
                name="plan"
                placeholder="Plan"
                className="p-2 border rounded"
                disabled
              />
            </div>
            <div className="col-span-1">
              <p>Amount</p>
              <Input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formattedPrice}
                className="p-2 border rounded"
                disabled
              />
            </div>
            <div className="col-span-1">
              <p>Status</p>
              <Input
                type="text"
                name="status"
                placeholder="Status"
                value={getBookingDetail?.status}
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
