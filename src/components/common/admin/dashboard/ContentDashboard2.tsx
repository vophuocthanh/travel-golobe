import { IconChina, IconGermany, IconJp, IconNl, IconRo, IconUc, IconUs } from '@/common/icons'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Cell, Pie, PieChart } from 'recharts'

const dataInner = [
  { name: 'User A', value: 1200000 },
  { name: 'User B', value: 800000 },
  { name: 'User C', value: 645000 },
  { name: 'User D', value: 590000 },
  { name: 'User E', value: 342000 }
]

const dataOuter = [
  { name: 'User A', value: 600000 },
  { name: 'User B', value: 400000 },
  { name: 'User C', value: 322500 },
  { name: 'User D', value: 295000 },
  { name: 'User E', value: 171000 }
]

const COLORS = ['#b34700', '#e65c00', '#ff751a', '#ff944d', '#ffb380']

const countries = [
  { name: 'United States', percentage: '27.5%', total: '4.5M', img: IconUs },
  { name: 'Australia', percentage: '11.2%', total: '2.3M', img: IconUc },
  { name: 'China', percentage: '9.4%', total: '2M', img: IconChina },
  { name: 'Germany', percentage: '8%', total: '1.7M', img: IconGermany },
  { name: 'Romania', percentage: '7.9%', total: '1.6M', img: IconRo },
  { name: 'Japan', percentage: '6.1%', total: '1.2M', img: IconJp },
  { name: 'Netherlands', percentage: '5.9%', total: '1M', img: IconNl }
]

const users = [
  { name: 'User A', sales: '$1.2M', growth: '+8.2%', color: '#b34700', growthColor: 'text-green-600' },
  { name: 'User B', sales: '$800K', growth: '+7%', color: '#e65c00', growthColor: 'text-green-600' },
  { name: 'User C', sales: '$645K', growth: '+2.5%', color: '#ff751a', growthColor: 'text-green-600' },
  { name: 'User D', sales: '$590K', growth: '-6.5%', color: '#ff944d', growthColor: 'text-red-600' },
  { name: 'User E', sales: '$342K', growth: '+1.7%', color: '#ffb380', growthColor: 'text-green-600' }
]

export default function ContentDashboard2() {
  return (
    <div className='grid grid-cols-2 gap-4 mt-5 bg-gray-100 '>
      <Card className='flex flex-col col-span-1 '>
        <CardTitle>
          <div className='w-full p-4 px-6'>
            <h2 className='text-2xl font-semibold '>Users by Country</h2>
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
        <h2 className='p-4 mb-4 text-2xl font-semibold'>Top 5 Best Selling Users</h2>
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
