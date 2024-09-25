import { TableUser } from '@/components/common/table/TableUser'

export default function UserAdmin() {
  return (
    <div className='w-full h-full'>
      <h1 className='text-2xl font-medium'>Quản lý USERS trên hệ thống</h1>
      <TableUser />
    </div>
  )
}
