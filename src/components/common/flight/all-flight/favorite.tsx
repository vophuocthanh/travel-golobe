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

  const { mutate: favoriteFlightID } = useMutation({
    mutationKey: ['favoriteFlightID'],
    mutationFn: () => flightApi.favoriteFLightID(id),
    onSuccess: () => {
      setIsFavorited(true)
      localStorage.setItem(`favorited_${id}`, 'true')
    }
  })
  const { mutate: unfavoriteFlightID } = useMutation({
    mutationKey: ['unfavoriteFlightID'],
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
        unfavoriteFlightID()
      } else {
        favoriteFlightID()
      }
    }
  }
  return (
    <div
      className={`flex items-center justify-center w-10 h-10 text-xs font-medium transition-colors border rounded cursor-pointer border-primary`}
      onClick={handleClick}
    >
      <HeartIcon className={`w-4 h-4 ${isFavorited ? 'text-red-600' : 'text-gray-400'}`} />
    </div>
  )
}
