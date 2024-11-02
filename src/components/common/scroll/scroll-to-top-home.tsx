import React, { useEffect, useState } from 'react'

const ScrollToTopHome: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      type='button'
      onClick={scrollToTop}
      className={`fixed bottom-24 right-8 p-3 size-14 flex justify-center items-center animate-bounce bg-[#a185f4] text-white rounded-full shadow-md transition-opacity ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-label='Scroll to Top'
    >
      ⬆
    </button>
  )
}

export default ScrollToTopHome
