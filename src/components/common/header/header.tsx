import { meApi } from '@/apis/me'
import { logo } from '@/assets/images'
import { IconFlight, IconHotel } from '@/common/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { clearLS, getAccessTokenFromLS } from '@/shared/utils/storage'
import { useQuery } from '@tanstack/react-query'
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
  TramFront,
  User,
  UserPlus,
  Users
} from 'lucide-react'
import { Link } from 'react-router-dom'

interface HeaderProps {
  className?: string
}

export default function Header({ className }: HeaderProps) {
  const token = getAccessTokenFromLS()

  const { data: getMe } = useQuery({
    queryKey: ['getMe'],
    queryFn: () => meApi.getMe()
  })
  const avatarFileName = getMe?.avatar.replace('uploads/avatar/', '')
  const avatarUrl = `${import.meta.env.VITE_AVATAR}/${avatarFileName}`

  const handleLogout = () => {
    clearLS()
    window.location.reload()
  }

  return (
    <>
      <header
        className={`${className} w-full flex justify-between fixed bg-white z-50 py-4 px-10 shadow-lg`}
        style={{ height: '80px' }}
      >
        <div className='flex items-center gap-6 '>
          <Link to='/flight' className='flex items-center gap-2'>
            <IconFlight />
            <span>Find Flight</span>
          </Link>
          <Link to='/hotel' className='flex items-center gap-2'>
            <IconHotel />
            <span>Find Hotel</span>
          </Link>
          <Link to='/tour' className='flex items-center gap-2'>
            <TramFront />
            <span>Find Tour</span>
          </Link>
        </div>
        <Link to='/' className='mr-40'>
          <img src={logo} alt='logo' className='w-24 h-10' />
        </Link>

        {token ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='flex items-center gap-2'>
                <Avatar>
                  <AvatarImage src={avatarUrl} alt={getMe?.name || 'Avatar'} />

                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                  <h1 className='text-sm'>{getMe?.email}</h1>
                  <span className='text-xs text-gray-400'>{getMe?.name || 'Guest'}</span>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56 mr-10'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link to='/profile' className='flex items-center justify-between w-full'>
                    <User className='w-4 h-4 mr-2' />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </Link>
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
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className='w-4 h-4 mr-2' />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className='flex items-center gap-4'>
            <Link to='/login' className='flex items-center gap-2'>
              Login
            </Link>
            <Link to='/register' className='flex items-center gap-2 px-4 py-2 bg-black rounded-md hover:shadow-xl'>
              <span className='text-white'>Sign up</span>
            </Link>
          </div>
        )}
      </header>
    </>
  )
}
