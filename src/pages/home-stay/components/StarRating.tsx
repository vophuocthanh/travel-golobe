import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import { Star } from 'lucide-react'
import * as React from 'react'

const labels: { [index: string]: string } = {
  0.5: '',
  1: '',
  1.5: '',
  2: '',
  2.5: '',
  3: '',
  3.5: '',
  4: '',
  4.5: '',
  5: ''
}

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`
}

interface BasicRatingProps {
  setRating: (value: number | null) => void
}

export default function BasicRating({ setRating }: BasicRatingProps) {
  const [value, setValue] = React.useState<number | null>(0)
  const [hover, setHover] = React.useState(-1)

  const handleChange = (newValue: number | null) => {
    setValue(newValue)
    setRating(newValue) // Cập nhật giá trị đánh giá
  }

  return (
    <div>
      <Box display='flex'>
        <Rating
          name='hover-feedback'
          value={value}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(_event, newValue) => handleChange(newValue)}
          onChangeActive={(_event, newHover) => {
            setHover(newHover)
          }}
          emptyIcon={<Star style={{ opacity: 0.55 }} fontSize='inherit' />}
        />
        {value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
      </Box>
    </div>
  )
}
