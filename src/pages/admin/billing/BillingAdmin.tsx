import { BillingAll } from '@/components/common/admin/billing/billing-all/BillingAll'
import { BillingFLight } from '@/components/common/admin/billing/billing-flight/BillingFlight'
import { BillingHotel } from '@/components/common/admin/billing/billing-hotel/BillingHotel'
import { BillingTour } from '@/components/common/admin/billing/billing-tour/BillingTour'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'
import { BillingCoach } from '../../../components/common/admin/billing/billing-coach/BillingCoach'

export default function BillingAdmin() {
  const [selectedTab, setSelectedTab] = useState('all')

  useEffect(() => {
    const savedTab = sessionStorage.getItem('selectedTab')
    if (savedTab) {
      setSelectedTab(savedTab)
    }
  }, [])

  const handleTabChange = (value: string) => {
    setSelectedTab(value)
    sessionStorage.setItem('selectedTab', value)
  }

  return (
    <div className='w-full p-2'>
      <h1 className='mb-4 text-2xl font-bold '>Hóa Đơn - Quản Trị</h1>
      <div>
        <Tabs value={selectedTab} onValueChange={handleTabChange} className='w-full'>
          <TabsList className='grid w-[35rem] h-[3rem] grid-cols-5 text-black border border-primary'>
            <TabsTrigger className='text-md' value='all'>
              Tất Cả
            </TabsTrigger>
            <TabsTrigger className='text-md' value='tour'>
              Tour
            </TabsTrigger>
            <TabsTrigger className='text-md' value='hotel'>
              Khách Sạn
            </TabsTrigger>
            <TabsTrigger className='text-md' value='flight'>
              Chuyến Bay
            </TabsTrigger>
            <TabsTrigger className='text-md' value='coach'>
              Xe Coach
            </TabsTrigger>
          </TabsList>
          <TabsContent value='all'>
            <Card>
              <CardHeader>
                <CardTitle className='flex w-full h-[3rem] items-center justify-between'>
                  <h1>Tất Cả</h1>
                  <Button>Tải Xuống</Button>
                </CardTitle>
                <CardDescription>Thực hiện thay đổi tài khoản của bạn tại đây. Nhấn lưu khi bạn hoàn thành.</CardDescription>
              </CardHeader>
              <CardContent>
                <BillingAll />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='tour'>
            <Card>
              <CardHeader>
                <CardTitle className='flex w-full h-[3rem] items-center justify-between'>
                  <h1>Tour</h1>
                  <Button>Tải Xuống</Button>
                </CardTitle>
                <CardDescription>Thực hiện thay đổi tài khoản của bạn tại đây. Nhấn lưu khi bạn hoàn thành.</CardDescription>
              </CardHeader>
              <CardContent className='space-y-2'>
                <BillingTour />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='hotel'>
            <Card>
              <CardHeader>
                <CardTitle className='flex w-full h-[3rem] items-center justify-between'>
                  <h1>Khách Sạn</h1>
                  <Button>Tải Xuống</Button>
                </CardTitle>
                <CardDescription>Thực hiện thay đổi tài khoản của bạn tại đây. Nhấn lưu khi bạn hoàn thành.</CardDescription>
              </CardHeader>
              <CardContent className='space-y-2'>
                <BillingHotel />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='flight'>
            <Card>
              <CardHeader>
                <CardTitle className='flex w-full h-[3rem] items-center justify-between'>
                  <h1>Chuyến Bay</h1>
                  <Button>Tải Xuống</Button>
                </CardTitle>
                <CardDescription>Thực hiện thay đổi tài khoản của bạn tại đây. Nhấn lưu khi bạn hoàn thành.</CardDescription>
              </CardHeader>
              <CardContent className='space-y-2'>
                <BillingFLight />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='coach'>
            <Card>
              <CardHeader>
                <CardTitle className='flex w-full h-[3rem] items-center justify-between'>
                  <h1>Xe Coach</h1>
                  <Button>Tải Xuống</Button>
                </CardTitle>
                <CardDescription>Thực hiện thay đổi tài khoản của bạn tại đây. Nhấn lưu khi bạn hoàn thành.</CardDescription>
              </CardHeader>
              <CardContent className='space-y-2'>
                <BillingCoach />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
