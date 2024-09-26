import { meApi } from '@/apis/me'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

export default function UserAdminDetail() {
  const { id } = useParams<string>()
  console.log('id', id)

  const { data: getUserById } = useQuery({
    queryKey: ['getUserById', id],
    queryFn: () => meApi.getUserById(id as string)
  })

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'N/A'
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${day}-${month}-${year}`
  }

  return (
    <div className='w-full h-full'>
      <h1 className='mt-4 text-3xl font-medium'>
        <Link to='/admin/users'>
          <ChevronLeft className='w-8 h-8 cursor-pointer' />
        </Link>
      </h1>
      <div className='flex flex-col max-w-5xl p-4 pb-20 mx-auto mt-6 bg-white rounded-md'>
        {getUserById ? (
          <img
            src={getUserById?.avatar}
            alt='avatar'
            className='flex items-center justify-center mx-auto mt-10 rounded-full size-56'
          />
        ) : (
          <Skeleton className='flex items-center justify-center mx-auto mt-10 rounded-full size-56' />
        )}

        <div className='flex justify-around w-full max-w-4xl mx-auto mt-10'>
          <div className='flex flex-col space-y-4'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-xl font-semibold'>Email</h1>
              <p>{getUserById?.email}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='text-xl font-semibold'>Date of Birth</h1>
              <p className='text-gray-700'>{formatDate(getUserById?.date_of_birth ?? undefined)}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='text-xl font-semibold'>Country</h1>
              <p>{getUserById?.country}</p>
            </div>
          </div>
          <div className='flex flex-col space-y-4'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-xl font-semibold'>Phone</h1>
              <p>{getUserById?.phone}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='text-xl font-semibold'>Role</h1>
              <p>{getUserById?.role?.name}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='text-xl font-semibold'>Address</h1>
              <p>{getUserById?.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
