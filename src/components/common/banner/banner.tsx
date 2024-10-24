export default function Banner() {
  return (
    <div className='relative w-full mb-32'>
      <video height='100%' autoPlay loop muted className='flex justify-center mx-auto mt-20 max-w-7xl rounded-xl'>
        <source src='https://minio.fares.vn/mixivivu-dev/video/Mixivivuduthuyen.mp4' type='video/webm' />
      </video>
    </div>
  )
}
