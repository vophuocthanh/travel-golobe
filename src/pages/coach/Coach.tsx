import { coachApi } from '@/apis/coach.api'
import { banner_coach } from '@/assets/images'
import { IconVectorFlight } from '@/common/icons'
import { Footer, Header } from '@/components/common'
import { DatePickerWithPresets } from '@/components/common/calendar/calendar-date'
import CoachReview1 from '@/components/common/coach/coach-review-1/coach-review-1'
import CoachReview2 from '@/components/common/coach/coach-review-2/coach-review-2'
import PlacesTogether from '@/components/common/coach/places-together/places-together'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Coach() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchTo, setSearchTo] = useState<string | undefined>(undefined)
  const [searchFrom, setSearchFrom] = useState<string | undefined>(undefined)
  const [departDate, setDepartDate] = useState<Date | undefined>(undefined)
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined)

  const formattedDepartDate: string | undefined = departDate ? format(departDate, 'dd-MM-yyyy') : undefined
  const formattedReturnDate: string | undefined = returnDate ? format(returnDate, 'dd-MM-yyyy') : undefined

  const { data: getAll, refetch } = useQuery({
    queryKey: ['getAllCoach', 1, ''],
    queryFn: () => coachApi.getAll(1, 4, ''),
    enabled: false
  })

  const handleSearch = () => {
    if ((!formattedDepartDate || !formattedReturnDate) && (!searchTo || !searchFrom)) {
      toast.error('Vui lòng nhập đầy đủ điểm đi, điểm đến, ngày khởi hành và ngày trở về.')
      return
    }
    refetch()
    const queryString = new URLSearchParams({
      searchTo: searchTo || '',
      searchFrom: searchFrom || '',
      departDate: formattedDepartDate || '',
      returnDate: formattedReturnDate || ''
    }).toString()
    navigate(`/vehicle/coach/all-coach?${queryString}`)
  }
  useEffect(() => {
    if (getAll && getAll.data && getAll.data.length === 0) {
      toast.error('Không có chuyến xe vào ngày và điểm đến này.')
    }
  }, [getAll])

  return (
    <div className="w-full">
      <Header />
      <main className="pt-20">
        <section>
          <div className="flex items-center justify-center w-full lg:h-[50rem] overflow-hidden relative h-[35rem]">
            <div className="top-0 w-full h-full">
              <img src={banner_coach} alt="coach" className="object-cover sm:w-full lg:h-[40.5rem] h-[17rem]" />
              <div className="absolute p-5 text-gray lg:top-1/4 lg:left-[10rem] lg:w-[27rem] bg-slate-100 rounded-lg top-[2rem] w-[10rem] left-[2rem]">
                <h1 className="font-bold text-md lg:text-4xl">{t('CreateCoach')}</h1>
                <p className="mt-2 text-[10px] lg:text-lg">{t('Special')}</p>
              </div>
            </div>
            <div className="absolute bottom-1 items-center justify-center p-1 lg:p-4 bg-white rounded-lg shadow-md shadow-slate-300 w-[84%] lg:h-[15rem] h-[16rem]">
              <p className="mt-3 ml-5 font-semibold lg:text-lg">{t('WhereCoach')}</p>
              <div className="grid grid-cols-8 gap-4 mt-[1rem] mr-[2.8rem]">
                <div className="relative w-full col-span-4 ml-4 lg:col-span-2">
                  <label className="absolute z-10 p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 text-sm lg:text-md">
                    From
                  </label>
                  <Input
                    type="text"
                    className="block text-sm lg:text-lg w-full p-2 pl-5 mt-1 border border-gray-300 rounded-md shadow-sm h-[3.1rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                    onChange={(e) => setSearchFrom(e.target.value)}
                    placeholder="Nhập nơi đi..."
                  />
                </div>
                <div className="relative w-full col-span-4 ml-5 lg:col-span-2">
                  <label className="absolute z-10 p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 text-sm lg:text-md">
                    To
                  </label>
                  <Input
                    type="text"
                    className="block text-sm lg:text-lg w-full pl-5 mt-1 border border-gray-300 rounded-md shadow-sm h-[3.1rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                    onChange={(e) => setSearchTo(e.target.value)}
                    placeholder="Nhập nơi đến..."
                  />
                </div>
                <div className="relative z-10 w-full col-span-4 ml-5 lg:col-span-2">
                  <label className="absolute z-10 p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 text-sm lg:text-md">
                    Depart
                  </label>
                  <div className="text-sm lg:text-lg w-full mt-1 border border-gray-300 rounded-md shadow-sm h-[3.1rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md">
                    <DatePickerWithPresets date={departDate} setDate={setDepartDate} />
                  </div>
                </div>
                <div className="relative z-10 w-full col-span-4 ml-5 lg:col-span-2">
                  <label className="absolute z-10 p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 text-sm lg:text-md" >
                    Return
                  </label>
                  <div className=" text-sm lg:text-lg w-full mt-1 border border-gray-300 rounded-md shadow-sm h-[3.1rem] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md">
                    <DatePickerWithPresets date={returnDate} setDate={setReturnDate} />
                  </div>
                </div>
              </div>
              <div className="flex p-4 jstify-end lg:right-[1.6rem]">
                <div className="gap-4 ml-auto mr-[10px] flex ">
                  <Button className="px-4 py-2 mb-4 text-black bg-white border rounded-lg border-primary hover:bg-white">
                    + {t('Promo')}
                  </Button>
                  <Button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:border hover:bg-white hover:border-spacing-3 hover:border-primary hover:text-black"
                    onClick={handleSearch}
                  >
                    <IconVectorFlight /> {t('places')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div>
          <PlacesTogether />
          <CoachReview1 />
          <CoachReview2 />
        </div>

        <div className="mt-auto">
          <Footer />
        </div>
      </main>
    </div>
  )
}
