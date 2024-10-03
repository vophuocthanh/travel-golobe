import { hotelApi } from '@/apis/hotel.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { HeartIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
    idHotel: string | undefined
}


export default function Favorite({ idHotel }: Props) {
    const queryClient = useQueryClient()

    const { data: getbyId } = useQuery({
        queryKey: ['getById', idHotel],
        queryFn: () => hotelApi.getById(idHotel)
    })
    const [isFavorite, setIsFavorite] = useState(getbyId?.isFavorite)

    const mutationFavoriteHotel = useMutation({
        mutationFn: () => {
            return isFavorite
                ? hotelApi.updateUnFavorite(idHotel)
                : hotelApi.updateFavorite(idHotel)
        },
        onSuccess: () => {
            setIsFavorite(!isFavorite)
            queryClient.invalidateQueries({ queryKey: ['getById'] })

        },
        onError: () => {
            toast.error('Failed to update favorite status 😭')
        }
    })

    const handleFavoriteToggle = () => {
        mutationFavoriteHotel.mutate()
    }
    return (
        <>
            <div
                key={idHotel}
                className='flex items-center justify-center w-10 h-10 text-xs font-medium transition-colors border rounded cursor-pointer border-primary'
                onClick={handleFavoriteToggle}
            >
                <HeartIcon className={`w-4 h-4 ${getbyId?.isFavorite === true ? 'text-red-600' : 'text-gray-400'}`} />
            </div>
        </>
    )
}