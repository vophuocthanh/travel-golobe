import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '@/components/ui/card';
import { IconDot } from '@/common/icons';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, Label, PolarRadiusAxis, RadialBar, RadialBarChart, XAxis } from 'recharts';

const chartDataTarget = [
  { month: "january", achieve: 67, remains: 33 },
]

const chartData = [
  { browser: "chrome", visitors: 275, fill: "#e58e26" },
  { browser: "safari", visitors: 200, fill: "#fa983a" },
  { browser: "firefox", visitors: 187, fill: "#f6b93b" },
  { browser: "edge", visitors: 173, fill: "#f8c291" },
  { browser: "other", visitors: 90, fill: "#f5d7a3" },
]
const chartDataMultiple = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "Aug", desktop: 120, mobile: 200 },
  { month: "Sep", desktop: 304, mobile: 140 },
]
const chartConfig = {
  achieve: {
    label: "Achieved",
  },
  remains: {
    label: "Remaining",
  },
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
  desktop: {
    label: "Desktop",
    color: "#e65c00",
  },
  mobile: {
    label: "Mobile",
    color: "#ffb380",
  },
} satisfies ChartConfig

export default function ContentDashboard1() {

  const percentage = (chartDataTarget[0].achieve / (chartDataTarget[0].achieve + chartDataTarget[0].remains)) * 100;

  return (
    <div className="grid grid-cols-4 gap-4 mt-5 bg-gray-100 ">
      <Card className="flex flex-col col-span-1">
        <CardHeader className="pb-0 gap-y-3">
          <CardTitle>Mục tiêu</CardTitle>
          <CardDescription>
            <div className="flex items-center justify-between mx-2">
              <div className="flex items-center gap-3 text-sm text-red-500"><IconDot />
                <p className='text-black'>Đã hoàn thành</p></div>
              <div className="flex items-center gap-3 text-sm text-red-300"><IconDot />
                <p className='text-black'>Còn lại</p></div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[400px] h-full"
          >
            <RadialBarChart
              data={chartDataTarget}
              endAngle={180}
              innerRadius={80}
              outerRadius={150}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 16}
                            className="text-2xl font-bold fill-foreground"
                          >
                            {percentage}%
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-muted-foreground"
                          >
                            Hoàn thành
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="achieve"
                stackId="a"
                cornerRadius={5}
                fill="#eb2f06"
                className="stroke-2 stroke-transparent"
              />
              <RadialBar
                dataKey="remains"
                fill="#f8c291"
                stackId="a"
                cornerRadius={5}
                className="stroke-2 stroke-transparent"
              />
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="flex flex-col col-span-1 ">
        <CardHeader className="pb-0 gap-y-3">
          <CardTitle>Loại tài khoản hoạt động nhiều nhất</CardTitle>
          <CardDescription>
            <div className="flex items-center justify-between mx-2">
              <div className="flex items-center gap-3 text-sm text-amber-600 "><IconDot />
                <p className='text-black'>Rất hoạt động</p></div>
              <div className="flex items-center gap-3 text-sm text-amber-200"><IconDot />
                <p className='text-black'>Không hoạt động</p></div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 mt-10">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadialBarChart data={chartData} innerRadius={30} outerRadius={110}>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel nameKey="browser" />}
              />
              <RadialBar dataKey="visitors" background />
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="flex flex-col col-span-2">
        <CardHeader className="mb-5 gap-y-3">
          <CardTitle>Biểu đồ tăng trưởng hàng tháng</CardTitle>
          <CardDescription>
            <div className="flex items-center gap-x-[3rem]">
              <div className="flex items-center gap-3 text-sm text-gray-600"><IconDot />Rất hoạt động</div>
              <div className="flex items-center gap-3 text-sm text-gray-300"><IconDot />Không hoạt động</div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className='max-h-[300px] w-full'>
          <ChartContainer config={chartConfig} className='flex w-full h-full mx-auto'>
            <BarChart data={chartDataMultiple}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

    </div>
  )
}
