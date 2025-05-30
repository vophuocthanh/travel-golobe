import { dashboardApi } from '@/apis/dashboad.api'
import ContentDashboard1 from '@/components/common/admin/dashboard/ContentDashboard1'
import ContentDashboard2 from '@/components/common/admin/dashboard/ContentDashboard2'
import { useQuery } from '@tanstack/react-query'
import { DatePicker, Space } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Overview')
  const { RangePicker } = DatePicker

  const onRangeChange: RangePickerProps['onChange'] = (dates) => {
    if (dates) {
      const [start, end] = dates
      console.log('Start Date:', start)
      console.log('End Date:', end)
    } else {
      console.log('No dates selected')
    }
  }

  const { data: getCountUser } = useQuery({
    queryKey: ['getCountUser'],
    queryFn: () => dashboardApi.getCountUser()
  })

  const { data: getCountPaymentDone } = useQuery({
    queryKey: ['getCountPaymentDone'],
    queryFn: () => dashboardApi.getCountPaymentDone()
  })

  const { data: getCountTour } = useQuery({
    queryKey: ['getCountTour'],
    queryFn: () => dashboardApi.getCountTour()
  })

  const { data: getCountBooking } = useQuery({
    queryKey: ['getCountBooking'],
    queryFn: () => dashboardApi.getCountBooking()
  })

  const tabs = [{ name: 'Tổng quan', label: 'Tổng quan', count: null }]

  const stats = [
    { label: 'Tổng số người dùng', value: getCountUser?.data?.total || 'N/A', change: '+2.5%', changeType: 'increase' },
    { label: 'Thanh toán hoàn tất', value: getCountPaymentDone?.data?.total, change: '-1.2%', changeType: 'decrease' },
    { label: 'Hệ thống đặt chỗ', value: getCountBooking?.data?.total, change: '+5.2%', changeType: 'increase' },
    { label: 'Hệ thống tour', value: getCountTour?.data?.total, change: '+11%', changeType: 'increase' }
  ]

  const menuPresets: { label: string; value: [Dayjs, Dayjs] }[] = [
    { label: '7 ngày qua', value: [dayjs().subtract(7, 'd'), dayjs()] },
    { label: '14 ngày qua', value: [dayjs().subtract(14, 'd'), dayjs()] },
    { label: '30 ngày qua', value: [dayjs().subtract(30, 'd'), dayjs()] },
    { label: '90 ngày qua', value: [dayjs().subtract(90, 'd'), dayjs()] }
  ]


  return (
    <div className='w-full p-2'>
      <h1 className='mb-4 text-2xl font-bold'>Tổng quan</h1>
      <div className='relative flex space-x-8 border-b h-[3rem]'>
        {tabs.map((tab) => (
          <a
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`relative font-medium pb-2 transition-colors duration-300 cursor-pointer ${activeTab === tab.name ? 'text-teal-600 border-b-2 border-primary' : 'text-gray-600 hover:text-teal-600'
              }`}
          >
            {tab.label}
            {tab.count !== null && <span className='ml-1 text-gray-400'>({tab.count})</span>}
          </a>
        ))}
        <div className='absolute right-[3rem] flex items-center justify-center cursor-pointer'>
          <Space direction='vertical' size={12}>
            <RangePicker className='w-[15rem] h-[2.5rem] text-lg' presets={menuPresets} onChange={onRangeChange} />
          </Space>
        </div>
      </div>
      <div className='mt-5'>
        <div className='grid grid-cols-4 gap-4 bg-gray-100'>
          {stats.map((stat, index) => (
            <div
              key={index}
              className='flex flex-col items-center p-4 bg-white rounded-lg shadow w-full h-[6rem] relative'
            >
              <div className='absolute gap-2 flex left-[2rem]'>
                <span className='text-lg text-gray-500'>{stat.label}</span>
                <span className='text-xl font-bold'>{stat.value}</span>
              </div>
              <span
                className={`text-sm mt-2 absolute bottom-[1rem] right-[2rem] bg-gray-200 w-12 h-6 flex items-center justify-center rounded-lg ${stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                  }`}
              >
                {stat.change}
              </span>
            </div>
          ))}
        </div>
      </div>
      <ContentDashboard1 />
      <ContentDashboard2 />
    </div>
  )
}
