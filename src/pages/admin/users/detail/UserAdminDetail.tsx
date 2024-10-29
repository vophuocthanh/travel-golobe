import { meApi } from '@/apis/me'
import { roleApi } from '@/apis/role.api'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDateStandard } from '@/shared/utils/date-utils'
import { getUserFromLocalStorage } from '@/shared/utils/storage'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function UserAdminDetail() {
  const { id } = useParams<string>()
  const queryClient = useQueryClient()
  const { data: getUserById } = useQuery({
    queryKey: ['getUserById', id],
    queryFn: () => meApi.getUserById(id as string)
  })
  const [selectedRoleId, setSelectedRoleId] = useState<string | undefined>('')
  const [loading, setLoading] = useState(false)

  const { data: getRoles } = useQuery({
    queryKey: ['getRoles'],
    queryFn: () => roleApi.getRoles()
  })

  const mutationRole = useMutation({
    mutationFn: (data: { roleId: string }) =>
      roleApi.updateRole(id as string, data, queryClient.getQueryData<string>(['getMe']) as string)
  })

  const handleUpdateRole = () => {
    setLoading(true)
    if (selectedRoleId) {
      mutationRole.mutate(
        { roleId: selectedRoleId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getUserById', id] })
            toast.success('Update role successfully')
          },
          onError: (error) => {
            toast.error(error.message)
          },
          onSettled: () => {
            setLoading(false)
          }
        }
      )
    }
  }

  const handleSelectRole = (value: string) => {
    setSelectedRoleId(value)
  }

  const user = getUserFromLocalStorage()

  const checkUserIs = user?.id === id

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

        <div className='flex flex-col items-center justify-center gap-2 mt-6'>
          <h1 className='text-xl font-semibold'>Họ và Tên</h1>
          <p>{getUserById?.name}</p>
        </div>
        <div className='flex justify-around w-full max-w-4xl mx-auto mt-10'>
          <div className='flex flex-col space-y-4'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-xl font-semibold'>Email</h1>
              <p>{getUserById?.email}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='text-xl font-semibold'>Date of Birth</h1>
              <p className='text-gray-700'>{formatDateStandard(getUserById?.date_of_birth ?? undefined)}</p>
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
              {getRoles ? (
                <Select onValueChange={handleSelectRole} disabled={checkUserIs}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder={getUserById?.role?.name || 'Select role'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      {getRoles?.data.map((role: { id: string; name: string }) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <Skeleton className='w-[180px] h-10' />
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='text-xl font-semibold'>Address</h1>
              <p>{getUserById?.address}</p>
            </div>
          </div>
        </div>
        <Button className='flex items-center justify-center w-32 mx-auto' loading={loading} onClick={handleUpdateRole}>
          Chỉnh sửa
        </Button>
      </div>
    </div>
  )
}
