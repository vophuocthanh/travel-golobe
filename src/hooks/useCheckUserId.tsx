import { meApi } from '@/apis/me'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export function useIsEditableUser() {
  const { id } = useParams<string>()
  const [isEditable, setIsEditable] = useState(false)

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      meApi
        .getMe()
        .then((user) => {
          setIsEditable(user?.id !== id)
        })
        .catch((error) => {
          console.error('Error fetching user:', error)
          setIsEditable(false)
        })
    }
  }, [id])

  return isEditable
}
