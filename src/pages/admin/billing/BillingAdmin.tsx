

import { BillingAll } from "@/components/common/admin/billing/BillingAll";
import { BillingFlight } from "@/components/common/admin/billing/BillingFlight";
import { BillingHotel } from "@/components/common/admin/billing/BillingHotel";
import { BillingTour } from "@/components/common/admin/billing/BillingTour";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BillingAdmin() {
  return (
    <div className='w-full p-2'>
      <h1 className='mb-4 text-2xl font-bold '>BILLING</h1>
      <div>
      <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-[35rem] h-[3rem] grid-cols-4 text-black border border-primary">
        <TabsTrigger className="text-md" value="all">All</TabsTrigger>
        <TabsTrigger className="text-md" value="tour">Tour</TabsTrigger>
        <TabsTrigger className="text-md" value="hotel">Hotel</TabsTrigger>
        <TabsTrigger className="text-md" value="flight">Flight</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <Card>
          <CardHeader>
            <CardTitle className="flex w-full h-[3rem] items-center justify-between">
              <h1>All</h1>
              <Button>Download</Button>
            </CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BillingAll/>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="tour">
        <Card>
          <CardHeader>
            <CardTitle className="flex w-full h-[3rem] items-center justify-between">
              <h1>Tour</h1>
              <Button>Download</Button>
            </CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <BillingTour/>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="hotel">
        <Card>
          <CardHeader>
            <CardTitle className="flex w-full h-[3rem] items-center justify-between">
              <h1>Hotel</h1>
              <Button>Download</Button>
            </CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <BillingHotel/>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="flight">
        <Card>
          <CardHeader>
            <CardTitle className="flex w-full h-[3rem] items-center justify-between">
              <h1>Flight</h1>
              <Button>Download</Button>
            </CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <BillingFlight/>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
      </div>
    </div>
  )
}