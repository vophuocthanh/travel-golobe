import { RadioGroup, RadioGroupItem } from "@/components/ui/radiobutton";
import { useState } from "react";

export default function FlightOptions() {
  const [paymentOption, setPaymentOption] = useState("full");

  return (
    <RadioGroup
      value={paymentOption} 
      onValueChange={(value) => setPaymentOption(value)}
    >
      <h1 className="mb-4 text-xl font-semibold dark:text-white">Payment Options</h1>
      <div className="space-y-4">
        <div
          className={`border p-4 rounded-lg flex justify-between cursor-pointer items-center dark:border-white dark:border ${
            paymentOption === "full" ? "bg-primary border-primary" : "border-gray-500"
          }`}
          onClick={() => setPaymentOption("full")}
        >
          <div className="">
            <h4 className="font-semibold dark:text-white">Pay in full</h4>
            <p className="text-sm text-gray-500 dark:text-white">Pay the total and you are all set</p>
          </div>
          <RadioGroupItem
            className="flex items-center justify-center dark:border-white dark:border dark:text-white"
            value="full"
            id="option-one"
          />
        </div>

        <div
          className={`border p-4 rounded-lg flex justify-between cursor-pointer items-center dark:border dark:border-white ${
            paymentOption === "part" ? "bg-primary border-primary" : "border-gray-500 dark:border-white dark:border"
          }`}
          onClick={() => setPaymentOption("part")}
        >
          <div className="w-[32rem] ">
            <h4 className="font-semibold dark:text-white">Pay part now, part later</h4>
            <p className="text-sm text-gray-500 dark:text-white">
              Pay $207.43 now, and the rest ($207.43) will be automatically charged to the same payment method on Nov
              14, 2022. No extra fees.
            </p>
          </div>
          <RadioGroupItem
            className="flex items-center justify-center dark:border-white dark:border dark:text-white"
            value="part"
            id="option-two"
          />
        </div>
      </div>
    </RadioGroup>
  );
}
