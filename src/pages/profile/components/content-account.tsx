import { Button } from '@/components/ui/button'
import { Plus, SquarePen } from 'lucide-react'

type Props = {
  title: string
  content?: string | undefined
  boolean?: string
}

export default function ContentAccount({ title, content, boolean }: Props) {
  return (
    <>
      <div className='relative items-center justify-between p-2'>
        <label htmlFor='' className='text-base font-normal'>
          {title}
        </label>
        <div className='flex items-center justify-between'>
          <p className='text-xl font-semibold'>{content}</p>
          <div className='flex space-x-2'>
            {boolean ? (
              <Button className='flex items-center p-2 space-x-2 text-sm bg-white border rounded-md shadow-md border-primary'>
                <Plus className='w-4 h-4' />
                <p>Add another email</p>
              </Button>
            ) : null}
            <Button className='flex items-center p-2 space-x-2 text-sm bg-white border rounded-md shadow-md border-primary'>
              <SquarePen className='w-4 h-4' />
              <p>Change</p>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
