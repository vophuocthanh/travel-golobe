import React, { useState } from 'react'
import { flightApi } from '@/apis/flight.api' // Đảm bảo đường dẫn đúng
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import IconDelete from '@/common/icons/IconDelete'

interface DeleteFlightProps {
  flightId?: string
}

const DeleteFlight: React.FC<DeleteFlightProps> = ({ flightId }) => {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const mutationDelete = useMutation({
    mutationFn: (id: string) => flightApi.deleteFlight(id),
    onSuccess: () => {
      toast.success('Xóa chuyến bay thành công')
    },
    onError: () => {
      toast.error('Xóa chuyến bay thất bại')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllFlight'] })
    }
  })

  const handleDelete = () => {
    setIsModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (flightId) {
      mutationDelete.mutate(flightId)
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
            <p>Bạn có chắc chắn muốn xóa chuyến bay này không?</p>
            <div className='flex justify-end mt-4'>
              <button className='p-2 mr-2 bg-gray-300 rounded' onClick={() => setIsModalOpen(false)}>
                Hủy
              </button>
              <button className='p-2 text-white bg-red-500 rounded' onClick={handleConfirmDelete}>
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DeleteFlight
