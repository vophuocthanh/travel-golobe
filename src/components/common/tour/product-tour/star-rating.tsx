import StarIcon from '@mui/icons-material/Star'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import * as React from 'react'

const labels: { [index: string]: string } = {
  0.5: '0.5 Star Tour',
  1: '1 Star Tour',
  1.5: '1.5 Star Tour',
  2: '2 Star Tour',
  2.5: '2.5 Star Tour',
  3: '3 Star Tour',
  3.5: '3.5 Star Tour',
  4: '4 Star Tour',
  4.5: '4.5 Star Tour',
  5: '5 Star Tour'
}

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`
}

export default function StarRating() {
  const [value, setValue] = React.useState<number | null>(5)
  const [hover, setHover] = React.useState(-1)

  return (
    <div className=''>
      <Box display='flex'>
        <Rating
          name='hover-feedback'
          value={value}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(_event, newValue) => {
            setValue(newValue)
          }}
          onChangeActive={(_event, newHover) => {
            setHover(newHover)
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
        />
        {value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
      </Box>
    </div>
  )
}
