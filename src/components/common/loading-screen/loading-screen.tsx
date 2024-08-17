import { motion } from 'framer-motion'
import { useEffect } from 'react'

interface LoadingScreenProps {
  setLoading: (loading: boolean) => void
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ setLoading }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [setLoading])

  const loadingText = 'Travel Globe'.split(' ')

  const letterAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1
      }
    })
  }

  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-r from-white via-pink-100 to-white'>
      <div className='flex space-x-2'>
        {loadingText.map((char, index) => (
          <motion.span
            key={index}
            custom={index}
            initial='hidden'
            animate='visible'
            variants={letterAnimation}
            className='font-bold text-transparent text-7xl bg-clip-text bg-gradient-to-b from-blue-400 to-pink-600'
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

export default LoadingScreen
