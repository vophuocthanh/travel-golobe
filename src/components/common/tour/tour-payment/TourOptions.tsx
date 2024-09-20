import { RadioGroup, RadioGroupItem } from "@/components/ui/radiobutton";
import { useState } from "react";

export default function TourOptions() {
  const [paymentOption, setPaymentOption] = useState("full");

  return (
    <RadioGroup
      value={paymentOption} 
      onValueChange={(value) => setPaymentOption(value)}
    >
      <h1 className="mb-4 text-xl font-semibold">Payment Options</h1>
      <div className="space-y-4">
        <div
          className={`border p-4 rounded-lg flex justify-between cursor-pointer items-center ${
            paymentOption === "full" ? "bg-primary border-primary" : "border-gray-500"
          }`}
          onClick={() => setPaymentOption("full")}
        >
          <div>
            <h4 className="font-semibold">Pay in full</h4>
            <p className="text-sm text-gray-500">Pay the total and you are all set</p>
          </div>
          <RadioGroupItem
            className="flex items-center justify-center"
            value="full"
            id="option-one"
          />
        </div>

        <div
          className={`border p-4 rounded-lg flex justify-between cursor-pointer items-center ${
            paymentOption === "part" ? "bg-primary border-primary" : "border-gray-500"
          }`}
          onClick={() => setPaymentOption("part")}
        >
          <div className="w-[32rem]">
            <h4 className="font-semibold">Pay part now, part later</h4>
            <p className="text-sm text-gray-500">
              Pay $207.43 now, and the rest ($207.43) will be automatically charged to the same payment method on Nov
              14, 2022. No extra fees.
            </p>
          </div>
          <RadioGroupItem
            className="flex items-center justify-center"
            value="part"
            id="option-two"
          />
        </div>
      </div>
    </RadioGroup>
  );
}
