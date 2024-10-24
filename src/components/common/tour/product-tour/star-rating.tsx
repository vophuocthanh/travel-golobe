import { Star as StarIcon } from '@mui/icons-material' // Đảm bảo sử dụng đúng icon
import { Rating } from '@mui/material'
import Box from '@mui/material/Box' // Import Box từ MUI

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
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' className='dark:text-white'/>}
        className=''
      />
      {rating !== null && (
        <Box sx={{ ml: 1 }}>
        </Box>
      )}
    </Box>
  )
}
