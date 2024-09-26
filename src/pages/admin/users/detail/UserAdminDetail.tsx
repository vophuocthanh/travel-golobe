import { meApi } from '@/apis/me'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export default function UserAdminDetail() {
  const { id } = useParams<string>()
  console.log('id', id)

  const { data: getUserById } = useQuery({
    queryKey: ['getUserById', id],
    queryFn: () => meApi.getUserById(id as string)
  })

  const imagePath = getUserById?.avatar ? `${getUserById?.avatar.replace('avatar/', '')}` : 'default-avatar.png'
  const avatarUrl = `${import.meta.env.VITE_AVATAR}/${imagePath}`

  return (
    <div className='w-full h-full'>
      <img
        src={avatarUrl}
        alt='avatar'
        className='flex items-center justify-center mx-auto mt-10 rounded-full size-56'
      />
    </div>
  )
}
