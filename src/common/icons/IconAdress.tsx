const IconAdress = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor' // Sử dụng currentColor để cho phép màu sắc được quản lý bởi CSS
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='text-black lucide lucide-map-pin-house dark:text-white' // Thêm class text-black cho light mode và text-white cho dark mode
    >
      <path d='M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z' />
      <path d='M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2' />
      <path d='M18 22v-3' />
      <circle cx='10' cy='10' r='3' />
    </svg>
  )
}

export default IconAdress
