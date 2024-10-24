const IconDrink = () => {
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
      className='text-black lucide lucide-coffee dark:text-white' // Thêm class text-black cho light mode và text-white cho dark mode
    >
      <path d='M10 2v2' />
      <path d='M14 2v2' />
      <path d='M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1' />
      <path d='M6 2v2' />
    </svg>
  )
}

export default IconDrink
