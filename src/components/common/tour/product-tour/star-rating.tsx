import { Rating } from '@mui/material'
import Box from '@mui/material/Box'
import { Star } from 'lucide-react'

type Props = {
  rating: number
}

export default function StarRating({ rating }: Props) {
  return (
    <Box display='flex' alignItems='center'>
      <Rating
        name='read-only'
        value={rating}
        precision={0.5}
        readOnly
        emptyIcon={<Star style={{ opacity: 0.55 }} fontSize='inherit' />}
      />
      {rating !== null && <Box sx={{ ml: 1 }}></Box>}
    </Box>
  )
}
