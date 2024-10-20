import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import IconDelete from '@/common/icons/IconDelete'
import { coachApi } from '@/apis/coach.api'

interface DeleteCoachProps {
  coachId?: string
}

const RoadVehicleAdminDetele: React.FC<DeleteCoachProps> = ({ coachId }) => {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const mutationDelete = useMutation({
    mutationFn: (id: string) => coachApi.deleteCoach(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllCoach'] });
      toast.success('Xóa chuyến xe thành công')
    },
    onError: () => {
      toast.error('Xóa chuyến xe thất bại')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllCoach'] })
    }
  })

  const handleDelete = () => {
    setIsModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (coachId) {
      mutationDelete.mutate(coachId)
    }
    setIsModalOpen(false)
  }

  return (
    <>
      <Button variant='ghost' className='w-8 h-8 p-0' onClick={handleDelete}>
        <IconDelete />
      </Button>

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='p-4 bg-white rounded shadow-md'>
            <h2 className='text-lg font-bold'>Xác Nhận</h2>
            <p>Bạn có chắc chắn muốn xóa chuyến xe này không?</p>
            <div className='flex justify-end mt-4'>
              <Button className='p-2 mr-2 bg-gray-300 rounded' onClick={() => setIsModalOpen(false)}>
                Hủy
              </Button>
              <Button className='p-2 text-white bg-red-500 rounded' onClick={handleConfirmDelete}>
                Xóa
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RoadVehicleAdminDetele