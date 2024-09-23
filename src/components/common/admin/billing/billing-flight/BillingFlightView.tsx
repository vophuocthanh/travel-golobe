import { avatar1, flightdetail1} from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeftToLine } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function BillingFlightView() {

  const { billingID } = useParams();
  const navigate = useNavigate();
  const [billingData, setBillingData] = useState({
    id: "m5gr84i9",billingTime: "2003-05-21",plan: "Basic", amount: 316, status: "failed",  
    customerName: "John Doe", customerEmail: "john.doe@example.com",
    flightAirline: "Vietnam Airlines", flightPlane: "Airbus A350", flightSeat: "12A", flightDeparture: "2024-10-01 08:00", flightArrival: "2024-10-01 10:00"
  });

  const handleBack = () => {
    navigate('/admin/billing');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setBillingData({ ...billingData, [name]: value });
  };

  const getStatusClass = () => {
    switch (billingData.status) {
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
      <h1 className="mb-2 text-2xl font-bold">Flight Billing {billingID}</h1>
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
                value={billingData.customerName}
                onChange={handleChange}
                className="p-2 border rounded "
                disabled
              />
              <Input
                type="email"
                name="customerEmail"
                placeholder="Customer Email"
                value={billingData.customerEmail}
                onChange={handleChange}
                className="p-2 border rounded "
                disabled
              />
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
                value={billingData.flightAirline}
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
                value={billingData.flightPlane}
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
                value={billingData.flightSeat}
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
                value={billingData.flightDeparture}
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
                value={billingData.flightArrival}
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
          <h2 className="mb-4 text-xl font-bold">Billing Information</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="col-span-1">
              <p>Billing ID</p>
              <Input
                type="text"
                name="id"
                placeholder="Billing ID"
                value={billingData.id}
                onChange={handleChange}
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
                value={billingData.billingTime}
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
                value={billingData.plan}
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
                value={billingData.amount}
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
                value={billingData.status}
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
