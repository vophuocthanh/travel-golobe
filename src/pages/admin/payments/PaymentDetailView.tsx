import { avatar1, flightdetail1, hoteldetail1, tour_into1 } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeftToLine } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PaymentDetailView() {

  const { billingID } = useParams();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({
    id: "m5gr84i9",paymentTime: "2003-05-21",plan: "Basic", amount: 316, status: "success",  
    customerName: "John Doe", customerEmail: "john.doe@example.com",
    tour: "Vietnam Adventure", tourLocation: "Hanoi, Vietnam",  
    hotelName: "Sunrise Hotel", hotelLocation: "Hanoi, Vietnam", hotelRooms: 2, hotelCheckIn: "2024-10-01 14:00", hotelCheckOut: "2024-10-07 12:00",
    flightAirline: "Vietnam Airlines", flightPlane: "Airbus A350", flightSeat: "12A", flightDeparture: "2024-10-01 08:00", flightArrival: "2024-10-01 10:00"
  });

  const handleBack = () => {
    navigate('/admin/payments');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const getStatusClass = () => {
    switch (paymentData.status) {
      case "success":
        return "bg-green-300";
      case "processing":
        return "bg-yellow-300";
      case "failed":
        return "bg-red-300";
      default:
        return "";
    }
  };
  
  return (
    <div className="w-full p-2 mb-5">
      <h1 className="mb-2 text-2xl font-bold">View Payment {billingID}</h1>
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
                name="customerName"
                placeholder="Customer Name"
                value={paymentData.customerName}
                onChange={handleChange}
                className="p-2 border rounded "
                disabled
              />
              <Input
                type="email"
                name="customerEmail"
                placeholder="Customer Email"
                value={paymentData.customerEmail}
                onChange={handleChange}
                className="p-2 border rounded "
                disabled
              />
            </div>
          </div>
        </div>
      
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-xl font-bold">Tour Information</h2>
          <div className='grid grid-cols-3 gap-4 mb-4'>
            <div className='w-[10rem] p-2 h-[10rem] col-span-1 flex mx-auto my-auto'>
                <img src={tour_into1} alt='hotel' className='w-full h-full rounded-full' />
            </div>
            <div className="col-span-1">
            <div className="col-span-1 mb-4">
              <p>Tour</p>
              <Input
                type="text"
                name="tour"
                placeholder="Tour"
                value={paymentData.tour}
                onChange={handleChange}
                className="p-2 border rounded"
                disabled
              />
            </div>
            <div className="col-span-1">
              <p>Tour Location</p>
              <Input
                type="text"
                name="tourLocation"
                placeholder="Tour Location"
                value={paymentData.tourLocation}
                onChange={handleChange}
                className="p-2 border rounded"
                disabled
              />
            </div>
          </div>
          </div>
          
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-xl font-bold">Hotel Information</h2>
          <div className='grid grid-cols-3 gap-4 mb-4'>
            <div className='w-[10rem] p-2 h-[10rem] col-span-1 flex mx-auto my-auto'>
                <img src={hoteldetail1} alt='hotel' className='w-full h-full rounded-full' />
            </div>
            <div className="col-span-2">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div className="col-span-1">
                  <p>Hotel Name</p>
                  <Input
                    type="text"
                    name="hotelName"
                    placeholder="Hotel Name"
                    value={paymentData.hotelName}
                    onChange={handleChange}
                    className="p-2 border rounded "
                    disabled
                  />
                </div>
                <div className="col-span-1">
                  <p>Hotel Location</p>
                  <Input
                    type="text"
                    name="hotelLocation"
                    placeholder="Hotel Location"
                    value={paymentData.hotelLocation}
                    onChange={handleChange}
                    className="p-2 border rounded "
                    disabled
                  />
                </div>
                <div className="col-span-1">
                  <p>Hotel Checkin</p>
                  <Input
                    type="text"
                    name="hotelCheckIn"
                    placeholder="Check-In Time"
                    value={paymentData.hotelCheckIn}
                    onChange={handleChange}
                    className="col-span-1 p-2 border rounded"
                    disabled
                  />
                </div>
                <div className="col-span-1">
                  <p>Hotel Checkout</p>
                  <Input
                    type="text"
                    name="hotelCheckOut"
                    placeholder="Check-Out Time"
                    value={paymentData.hotelCheckOut}
                    onChange={handleChange}
                    className="col-span-1 p-2 border rounded"
                    disabled
                  />
                </div>
                <div className="col-span-1">
                  <p>Room</p>
                  <Input
                    type="number"
                    name="hotelRooms"
                    placeholder="Number of Rooms"
                    value={paymentData.hotelRooms}
                    onChange={handleChange}
                    className="col-span-1 p-2 border rounded"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-xl font-bold">Flight Information</h2>
          <div className='grid grid-cols-3 gap-4 mb-4'>
            <div className='w-[10rem] p-2 h-[10rem] col-span-1 flex mx-auto my-auto'>
                <img src={flightdetail1} alt='hotel' className='w-full h-full rounded-full' />
            </div>
            <div className="col-span-2">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div className="col-span-1">
              <p>Airline</p>
              <Input
                type="text"
                name="flightAirline"
                placeholder="Airline"
                value={paymentData.flightAirline}
                onChange={handleChange}
                className="p-2 border rounded"
                disabled
              />
            </div>
            <div className="col-span-1">
              <p>Plane</p>
              <Input
                type="text"
                name="flightPlane"
                placeholder="Plane"
                value={paymentData.flightPlane}
                onChange={handleChange}
                className="p-2 border rounded"
                disabled
              />
            </div>
            <div className="col-span-1">
              <p>Seat Number</p>
              <Input
                type="text"
                name="flightSeat"
                placeholder="Seat Number"
                value={paymentData.flightSeat}
                onChange={handleChange}
                className="p-2 border rounded"
                disabled
              />
            </div>
            <div className="col-span-1">
              <p>Departure Time</p>
              <Input
                type="text"
                name="flightDeparture"
                placeholder="Departure Time"
                value={paymentData.flightDeparture}
                onChange={handleChange}
                className="p-2 border rounded"
                disabled
              />
            </div>
            <div className="col-span-1">
              <p>Arrival Time</p>
              <Input
                type="text"
                name="flightArrival"
                placeholder="Arrival Time"
                value={paymentData.flightArrival}
                onChange={handleChange}
                className="p-2 border rounded"
                disabled
              />
            </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-xl font-bold">Payment Information</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="col-span-1">
              <p>Payment ID</p>
              <Input
                type="text"
                name="id"
                placeholder="Payment ID"
                value={paymentData.id}
                onChange={handleChange}
                className="p-2 border rounded"
                disabled
              />
            </div>
            <div className="col-span-1">
              <p>Payment Time</p>
              <Input
                type="text"
                name="paymentTime"
                placeholder="Payment Time"
                value={paymentData.paymentTime}
                onChange={handleChange}
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
                value={paymentData.plan}
                onChange={handleChange}
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
                value={paymentData.amount}
                onChange={handleChange}
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
                value={paymentData.status}
                onChange={handleChange}
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
