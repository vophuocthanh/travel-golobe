import { useEffect, useRef } from 'react'

export default function Banner() {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const videoTop = videoRef.current.getBoundingClientRect().top
        const windowHeight = window.innerHeight

        // Phát video khi nó nằm trong khung nhìn của người dùng
        if (videoTop < windowHeight && videoTop > 0) {
          videoRef.current.play()
        } else {
          videoRef.current.pause()
        }
      }
    }

    // Thêm sự kiện scroll và dọn dẹp khi component bị hủy
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='relative hidden w-full mb-32 sm:block'>
      <video
        ref={videoRef}
        preload='auto' // Tải trước video để tránh bị giật
        autoPlay
        loop
        muted
        className='flex justify-center min-h-full mx-auto mt-20 max-w-7xl rounded-xl'
      >
        <source src='https://minio.fares.vn/mixivivu-dev/video/Mixivivuduthuyen.mp4' type='video/mp4' />
        <source src='https://minio.fares.vn/mixivivu-dev/video/Mixivivuduthuyen.webm' type='video/webm' />
        {/* Fallback khi trình duyệt không hỗ trợ video */}
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
