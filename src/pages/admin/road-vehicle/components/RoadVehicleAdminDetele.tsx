import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import IconDelete from '@/common/icons/IconDelete'
import { coachApi } from '@/apis/coach.api'
import { Card } from '@/components/ui/card';

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
        <Card>
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10000'>
            <div className='flex flex-col w-[30%] gap-4 p-4 bg-white rounded shadow-lg text-lg text-center'>
              <h2 className='text-xl font-bold'>Xác Nhận</h2>
              <p>Bạn có chắc chắn muốn xóa chuyến xe này không?</p>
              <div className='flex items-center justify-between px-[25%] mt-4'>
                <Button className='w-20 p-2 bg-gray-300 rounded' onClick={() => setIsModalOpen(false)}>
                  Hủy
                </Button>
                <Button className='w-20 p-2 text-white bg-red-600 rounded hover:bg-red-700' onClick={handleConfirmDelete}>
                  Xóa
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}

export default RoadVehicleAdminDetele