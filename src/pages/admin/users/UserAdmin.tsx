import { TableUser } from '@/components/common/table/TableUser'

export default function UserAdmin() {
  return (
    <div className='flex flex-col w-full h-full space-y-4'>
      <h1 className='mt-2 text-3xl font-medium'>User - Admin</h1>
      <TableUser />
    </div>
  )
}
