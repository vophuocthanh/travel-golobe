import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { CalendarDays, ChevronDown, Sofa, User } from 'lucide-react'

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  UserPlus,
  Users
} from 'lucide-react'

import { hotelApi } from '@/apis/hotel.api'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useDebounce } from '@/hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function BookingForm() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500)

  const { data: getHotelAll, isLoading } = useQuery({
    queryKey: ['getHotelAllSearch', debouncedSearchTerm],
    queryFn: () => hotelApi.getAll(1, 50, debouncedSearchTerm),
    enabled: !!debouncedSearchTerm
  })
  console.log(getHotelAll?.data,"123");
  

  return (
    <div className='flex flex-wrap justify-between p-4 space-x-2'>
      <div className='relative w-[20rem] col-span-2 ml-5 h-[4rem]'>
        <Label
          htmlFor=''
          className='absolute z-10 p-3 text-sm text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4'
        >
          Enter Destination
        </Label>
        <Input
          className='max-w-md w-[24rem] border border-black p-2 h-[3.5rem] pt-4 pl-12'
          placeholder='Istanbul, Turkey'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Sofa className='absolute left-3 top-[1rem] z-20 ' />

        {isLoading ? (
          <div className='absolute top-[4rem] left-0 w-full p-2 bg-white border border-gray-300 rounded-md shadow-md'>
            Loading...
          </div>
        ) : (
          getHotelAll &&
          debouncedSearchTerm && (
            <div className='absolute top-[4rem] left-0 w-full p-2 bg-white border border-gray-300 rounded-md shadow-md h-40 overflow-y-auto'>
              {getHotelAll?.data
                ?.filter((hotel) => hotel.hotel_names?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
                .map((hotel) => (
                  <div key={hotel.id} className='p-2 cursor-pointer hover:bg-gray-100'>
                    <Link to={`/hotel/${hotel.id}`}>{hotel.hotel_names}</Link>
                  </div>
                ))}
            </div>
          )
        )}
      </div>

      {/* Other Inputs */}
      <div className='relative w-[14rem] col-span-2 ml-5 h-[4rem]'>
        <Label
          htmlFor=''
          className='absolute p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 z-10 text-sm'
        >
          Check In
        </Label>
        <Input className='max-w-md w-[24rem] border border-black p-2 h-[3.5rem] pt-4' placeholder='Fri 12/2' />
        <CalendarDays className='absolute right-3 top-3.5' />
      </div>
      <div className='relative w-[14rem] col-span-2 ml-5 h-[4rem]'>
        <Label
          htmlFor=''
          className='absolute p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 z-10 text-sm'
        >
          Check Out
        </Label>
        <Input className='max-w-md w-[24rem] border border-black p-2 h-[3.5rem] pt-4' placeholder='Fri 20/2' />
        <CalendarDays className='absolute right-3 top-3.5' />
      </div>
      <div className='relative w-[14rem] col-span-2 ml-5 h-[4rem]'>
        <Label
          htmlFor=''
          className='absolute p-1.5 text-gray-800 transform -translate-y-1/2 bg-white top-1 left-4 z-10 text-sm'
        >
          Rooms & Guests
        </Label>
        <Input
          className='max-w-md w-[24rem] border border-black p-2 h-[3.5rem] pt-4 pl-12'
          placeholder='1 room ,2 guest'
        />
        <User className='absolute left-3 top-3.5 z-20' />

        {/* room and guest */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='absolute right-3 top-3.5 z-20 hover:cursor-pointer bg-white hover:bg-white'>
              {' '}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className='w-4 h-4 mr-2' />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className='w-4 h-4 mr-2' />
                <span>Billing</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className='w-4 h-4 mr-2' />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Keyboard className='w-4 h-4 mr-2' />
                <span>Keyboard shortcuts</span>
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Users className='w-4 h-4 mr-2' />
                <span>Team</span>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus className='w-4 h-4 mr-2' />
                  <span>Invite users</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Mail className='w-4 h-4 mr-2' />
                      <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className='w-4 h-4 mr-2' />
                      <span>Message</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <PlusCircle className='w-4 h-4 mr-2' />
                      <span>More...</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                <Plus className='w-4 h-4 mr-2' />
                <span>New Team</span>
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Github className='w-4 h-4 mr-2' />
              <span>GitHub</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LifeBuoy className='w-4 h-4 mr-2' />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Cloud className='w-4 h-4 mr-2' />
              <span>API</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className='w-4 h-4 mr-2' />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
