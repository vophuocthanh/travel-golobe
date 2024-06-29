import React, { useEffect, useState } from 'react'

type CarouselProps = {
  images: string[]
  interval?: number
}

const CarouselRegister: React.FC<CarouselProps> = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    }, interval)

    return () => clearInterval(slideInterval)
  }, [images.length, interval])

  return (
    <div className='relative w-full h-full overflow-hidden'>
      <div
        className='flex transition-transform duration-500'
        style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${images.length * 100}%` }}
      >
        {images.map((image, index) => (
          <div key={index} className='flex-shrink-0 w-full'>
            <img
              src={image}
              alt={`Slide ${index}`}
              className='h-[48rem] w-[32rem] flex justify-center items-center object-cover rounded-2xl'
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CarouselRegister
