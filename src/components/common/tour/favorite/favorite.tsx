import { flightApi } from '@/apis/flight.api'
import { useMutation } from '@tanstack/react-query'
import { HeartIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface FavoriteProps {
  id: string | undefined
}
export default function Favorite({ id }: FavoriteProps) {


  const navigate = useNavigate()
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    const favorited = localStorage.getItem(`favorited_${id}`)
    setIsFavorited(favorited === 'true')
  }, [id])

  const { mutate: favoriteTourID } = useMutation({
    mutationKey: ['favoriteTourID'],
    mutationFn: () => flightApi.favoriteFLightID(id),
    onSuccess: () => {
      setIsFavorited(true)
      localStorage.setItem(`favorited_${id}`, 'true')
    }
  })
  const { mutate: unfavoriteTourID } = useMutation({
    mutationKey: ['unfavoriteTourID'],
    mutationFn: () => flightApi.unfavoriteFLightID(id),
    onSuccess: () => {
      setIsFavorited(false)
      localStorage.setItem(`favorited_${id}`, 'false')
    }
  })

  const handleClick = () => {
    const token = localStorage.getItem('access_token')

    if (!token) {
      navigate('/login')
      return
    } else {
      if (isFavorited) {
        unfavoriteTourID()
      } else {
        favoriteTourID()
      }
    }
  }
  return (
    <div
      className={`${
        isFavorited ? 'bg-red-300' : 'text-gray-500'
      } flex items-center rounded-full justify-center w-12 h-12 mr-2 text-sm font-medium transition-colors border cursor-pointer border-primary hover:bg-red-100`}
      onClick={handleClick}
    >
      <HeartIcon className={`w-5 h-5 `} />
    </div>
  )
}
