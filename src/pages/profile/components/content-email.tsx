type Props = {
  title: string
  content?: string | undefined
}

export default function ContentEmail({ title, content }: Props) {
  return (
    <>
      <div className='relative items-center justify-between p-2'>
        <label htmlFor='' className='text-base font-normal'>
          {title}
        </label>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-xl font-semibold'>{content}</p>
          </div>
          <div className='flex space-x-2'></div>
        </div>
      </div>
    </>
  )
}
