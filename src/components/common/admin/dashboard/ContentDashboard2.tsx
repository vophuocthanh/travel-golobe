import { IconChina, IconGermany, IconJp, IconNl, IconRo, IconUc, IconUs } from '@/common/icons'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Cell, Pie, PieChart } from 'recharts'

const dataInner = [
  { name: 'Người dùng A', value: 1200000 },
  { name: 'Người dùng B', value: 800000 },
  { name: 'Người dùng C', value: 645000 },
  { name: 'Người dùng D', value: 590000 },
  { name: 'Người dùng E', value: 342000 }
]

const dataOuter = [
  { name: 'Người dùng A', value: 600000 },
  { name: 'Người dùng B', value: 400000 },
  { name: 'Người dùng C', value: 322500 },
  { name: 'Người dùng D', value: 295000 },
  { name: 'Người dùng E', value: 171000 }
]

const COLORS = ['#b34700', '#e65c00', '#ff751a', '#ff944d', '#ffb380']

const countries = [
  { name: 'Hoa Kỳ', percentage: '27.5%', total: '4.5M', img: IconUs },
  { name: 'Úc', percentage: '11.2%', total: '2.3M', img: IconUc },
  { name: 'Trung Quốc', percentage: '9.4%', total: '2M', img: IconChina },
  { name: 'Đức', percentage: '8%', total: '1.7M', img: IconGermany },
  { name: 'Romania', percentage: '7.9%', total: '1.6M', img: IconRo },
  { name: 'Nhật Bản', percentage: '6.1%', total: '1.2M', img: IconJp },
  { name: 'Hà Lan', percentage: '5.9%', total: '1M', img: IconNl }
]

const users = [
  { name: 'Người dùng A', sales: '$1.2M', growth: '+8.2%', color: '#b34700', growthColor: 'text-green-600' },
  { name: 'Người dùng B', sales: '$800K', growth: '+7%', color: '#e65c00', growthColor: 'text-green-600' },
  { name: 'Người dùng C', sales: '$645K', growth: '+2.5%', color: '#ff751a', growthColor: 'text-green-600' },
  { name: 'Người dùng D', sales: '$590K', growth: '-6.5%', color: '#ff944d', growthColor: 'text-red-600' },
  { name: 'Người dùng E', sales: '$342K', growth: '+1.7%', color: '#ffb380', growthColor: 'text-green-600' }
]

export default function ContentDashboard2() {
  return (
    <div className='grid grid-cols-2 gap-4 mt-5 bg-gray-100 '>
      <Card className='flex flex-col col-span-1 '>
        <CardTitle>
          <div className='w-full p-4 px-6'>
            <h2 className='text-2xl font-semibold '>Người dùng theo quốc gia</h2>
          </div>
        </CardTitle>
        <CardContent className='flex items-center'>
          <ul className='w-full'>
            {countries.map((country, index) => (
              <li key={index} className='flex items-center justify-between mb-2'>
                <div className='flex items-center'>
                  <div className='w-6 h-4 mr-2'>
                    <country.img />
                  </div>
                  <span>{country.name}</span>
                </div>
                <div className='flex items-center'>
                  <span className='mr-4'>{country.percentage}</span>
                  <span>{country.total}</span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card className='flex flex-col col-span-1'>
        <h2 className='p-4 mb-4 text-2xl font-semibold'>Top 5 Người dùng bán hàng tốt nhất</h2>
        <div className='flex flex-row items-center w-full'>
          <div className='flex justify-center w-full mb-4'>
            <PieChart width={200} height={200}>
              <Pie
                data={dataOuter}
                startAngle={180}
                endAngle={-180}
                innerRadius={70}
                outerRadius={100}
                dataKey='value'
                paddingAngle={1}
              >
                {dataOuter.map((_entry, index) => (
                  <Cell key={`cell-outer-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Pie data={dataInner} innerRadius={50} outerRadius={70} dataKey='value' paddingAngle={1}>
                {dataInner.map((_entry, index) => (
                  <Cell key={`cell-inner-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>
          <ul className='w-full mr-[2rem]'>
            {users.map((user, index) => (
              <li key={index} className='flex items-center justify-between mb-2'>
                <div className='flex items-center'>
                  <div className='w-4 h-4 mr-2 rounded-full' style={{ backgroundColor: user.color }}></div>
                  <span>{user.name}</span>
                </div>
                <div className='flex items-center'>
                  <span className='mr-4'>{user.sales}</span>
                  <span className={user.growthColor}>{user.growth}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  )
}
