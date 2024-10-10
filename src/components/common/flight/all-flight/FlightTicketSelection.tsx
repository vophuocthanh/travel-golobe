import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Button } from '@/components/ui/button'
import { Ticket } from '@/shared/ts/interface/ticket-flight'

interface FlightTicketSelectionProps {
  tickets: Ticket[]
  ticketEconomy: string
  onTicketSelect: (id: string) => void
}

const FlightTicketSelection: React.FC<FlightTicketSelectionProps> = ({ tickets, ticketEconomy, onTicketSelect }) => {
  const [selectedTicketId, setSelectedTicketId] = React.useState<string | null>(null)

  const handleSelectTicket = (id: string) => {
    if (selectedTicketId == id) {
      setSelectedTicketId(null)
      onTicketSelect('')
    } else {
      setSelectedTicketId(id)
      onTicketSelect(id)
    }
  }
  return (
    <div className='flex flex-col items-center justify-between pb-10 md:flex-row'>
      <div className='flex-1'>
        <Typography variant='h4' gutterBottom>
          Select Flight Ticket Type
        </Typography>
        <div className='flex flex-col items-center justify-between gap-6 px-4 md:flex-row'>
          {tickets.length > 0 ? (
            tickets.map((ticket: Ticket) => (
              <Card key={ticket.id} sx={{ maxWidth: 345, marginBottom: 4 }}>
                <CardHeader
                  action={
                    <IconButton aria-label='settings'>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={ticket.type_ticket}
                  subheader={`Ngày tạo: ${new Date(ticket.createdAt).toLocaleDateString()}`}
                />
                <CardMedia component='img' height='194' image={ticketEconomy} alt={`Ticket ${ticket.type_ticket}`} />
                <CardContent>
                  <Typography variant='body2' color='text.secondary'>
                    Giá vé: {ticket.price.toLocaleString()} VND
                  </Typography>
                  <Typography paragraph>Hành lý: {ticket.baggage_weight} kg</Typography>
                  <Typography paragraph>Phí hành lý: {ticket.baggage_price.toLocaleString()} VND</Typography>
                </CardContent>

                <div className='flex justify-end w-full p-4 mt-auto'>
                  <Button
                    className='w-full'
                    onClick={() => handleSelectTicket(ticket.id)}
                    disabled={selectedTicketId !== null && selectedTicketId !== ticket.id}
                  >
                    {selectedTicketId == ticket.id ? 'Bỏ chọn' : 'Chọn'}
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <Typography>Không có vé nào cho chuyến bay này</Typography>
          )}
        </div>
      </div>
    </div>
  )
}

export default FlightTicketSelection
