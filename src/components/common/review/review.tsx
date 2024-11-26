import { google } from '@/assets/icons'
import SectionInViewRight from '@/components/common/animation/SectionInViewRight'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import 'swiper/css'
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const slide = [
  {
    title: 'A real sense of community',
    content:
      'Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.',
    span: 'Olga',
    address: 'Weave Studios – Kai Tak',
    url: 'https://images.unsplash.com/photo-1696220833162-3c12027f7548?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    title: 'A real sense of community',
    content:
      'A real sense of community, nurtured”Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.',
    span: 'Thomas',
    address: 'Weave Studios – Olympic',
    url: 'https://plus.unsplash.com/premium_photo-1666283181610-b95ee7e55465?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    title: '“Amazing Architecture',
    content:
      'EDITION, luxury boutique hotel brand affiliated to MARRIOTT, entrusted Various Associates to upgrade the beach club of its first hotel opened in China, known as The Sanya',
    span: 'Olga',
    address: 'Weave Studios – Kai Tak',
    url: 'https://i.pinimg.com/564x/2e/9a/14/2e9a14f4b4e4b89f35622e490018fbd8.jpg'
  },
  {
    title: 'Indianz',
    content:
      'The Pala Band of Mission Indians broke ground, literally, on a $170 million expansion and renovation of its casino in southern California.',
    span: ' indianz.com',
    address: 'Ho-Chunk Inc',
    url: 'https://i.pinimg.com/564x/4f/43/14/4f43143662c54b48543d9273cfbdad1a.jpg'
  },
  {
    title: 'The Hotel Trotter',
    content: "Hotel Week London celebrates the re-opening of the city's hotels - The Hotel Trotter",
    span: '30K Followers',
    address: '1910 Posts - The Hotel Trotter',
    url: 'https://i.pinimg.com/736x/6f/08/09/6f08090c96960e9157c78f1f5e2dec5b.jpg'
  }
]

export default function Review() {
  const { t } = useTranslation()
  return (
    <SectionInViewRight>
      <div className='mb-64 max-w-7xl'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col space-y-2'>
            <h1 className='text-xl font-medium lg:text-3xl'>{t('Reviews')}</h1>
            <p className='text-[#112211]'>{t('textReviews')}</p>
          </div>
          <Button className='text-black bg-white border border-emerald-300 hover:text-white hover:shadow-md hover:transition-all'>
            {t('see')}
          </Button>
        </div>
        <div className='z-[-10rem]'>
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            autoplay={{
              delay: 3000
            }}
            loop={true}
            breakpoints={{
              768: {
                slidesPerView: 3, 
                spaceBetween: 20, 
              },
            }}
          >
            {slide.map((slide, index) => (
              <SwiperSlide key={index} className='flex w-full mt-20'>
                <div className='p-6 bg-white space-y-4 flex flex-col w-[28rem] h-[31rem] rounded-xl border border-gray-300'>
                  <h1 className='text-lg lg:text-3xl'>{slide.title}</h1>
                  <p className='text-gray-400 textContainer'>{slide.content}</p>
                  <span className='flex ml-auto text-sm font-medium'>View more</span>

                  <div className='flex flex-col'>
                    <span>{slide.span}</span>
                    <p className='text-gray-400'>Weave Studios – Kai Tak</p>
                  </div>
                  <Link to='https://www.google.com.vn/?hl=vi' target='_blank'>
                    <div className='flex items-center gap-2'>
                      <img src={google} alt='google' />
                      <span className='text-gray-400'>Google</span>
                    </div>
                  </Link>
                  <img src={slide.url} alt='' className='w-[30rem] h-[10rem] rounded-xl object-cover' />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </SectionInViewRight>
  )
}
