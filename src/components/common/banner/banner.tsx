export default function Banner() {
  return (
    <div className='relative w-full mb-32'>
      <video autoPlay loop muted className='flex justify-center min-h-full mx-auto mt-20 max-w-7xl rounded-xl'>
        <source src='https://minio.fares.vn/mixivivu-dev/video/Mixivivuduthuyen.mp4' type='video/webm' />
      </video>
    </div>
  )
}
