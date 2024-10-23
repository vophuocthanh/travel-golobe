import ContentDashboard1 from '@/components/common/admin/dashboard/ContentDashboard1'
import ContentDashboard2 from '@/components/common/admin/dashboard/ContentDashboard2'
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

  const menuPresets: { label: string; value: [Dayjs, Dayjs] }[] = [
    { label: 'Last 7 Days', value: [dayjs().subtract(7, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().subtract(14, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().subtract(30, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().subtract(90, 'd'), dayjs()] }
  ]

  const tabs = [
    { name: 'Overview', label: 'Tổng quan', count: null },
    { name: 'Tasks', label: 'Nhiệm vụ', count: 7 },
    { name: 'Documents', label: 'Tài liệu', count: 2 },
    { name: 'Team', label: 'Đội ngũ', count: '99+' },
    { name: 'Reports', label: 'báo cáo', count: null },
    { name: 'Admin', label: 'Quản trị viên', count: null },
    { name: 'More', label: '...', count: null }
  ]

  const stats = [
    { label: 'Users Total', value: '11.8M', change: '+2.5%', changeType: 'increase' },
    { label: 'New Users', value: '8.236K', change: '-1.2%', changeType: 'decrease' },
    { label: 'Active Users', value: '2.352M', change: '+11%', changeType: 'increase' },
    { label: 'New Users', value: '8K', change: '+5.2%', changeType: 'increase' }
  ]

  return (
    <div className='w-full p-2'>
      <h1 className='mb-4 text-2xl font-bold'>DASHBOARD</h1>
      <div className='relative flex space-x-8 border-b h-[3rem]'>
        {tabs.map((tab) => (
          <a
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`relative font-medium pb-2 transition-colors duration-300 cursor-pointer ${
              activeTab === tab.name ? 'text-teal-600 border-b-2 border-primary' : 'text-gray-600 hover:text-teal-600'
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
              <div className='absolute left-[2rem]'>
                <span className='text-lg text-gray-500'>{stat.label}</span>
                <span className='text-3xl font-bold'>{stat.value}</span>
              </div>
              <span
                className={`text-sm mt-2 absolute bottom-[1rem] right-[2rem] bg-gray-200 w-12 h-6 flex items-center justify-center rounded-lg ${
                  stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
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
