import { Star as StarIcon } from '@mui/icons-material' // Đảm bảo sử dụng đúng icon
import { Rating } from '@mui/material'
import Box from '@mui/material/Box' // Import Box từ MUI

type Props = {
  rating: number
}

export default function ReadOnlyRating({ rating }: Props) {
  return (
    <Box display='flex' alignItems='center'>
      <Rating
        name='read-only'
        value={rating}
        precision={0.5}
        readOnly
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
      />
      {rating !== null && (
        <Box sx={{ ml: 1 }}>
          {rating} star{rating !== 1 ? 's' : ''}
        </Box>
      )}
    </Box>
  )
}
