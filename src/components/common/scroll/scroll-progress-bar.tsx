import { useEffect, useState } from 'react'

const ScrollProgressBar = () => {
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = () => {
    const scrollTop = window.scrollY
    const docHeight = document.body.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100
    setScrollPosition(scrollPercent)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className='fixed top-0 left-0 z-[100] h-1 duration-200 transition-width'
      style={{
        width: `${scrollPosition}%`,
        backgroundImage: 'linear-gradient(90deg, #abeca2 -1.42%, #2fb3fe 30.38%, #6a8eea 65.09%, #a185f4 99.55%)'
      }}
    ></div>
  )
}

export default ScrollProgressBar
