'use client'

import * as React from 'react'
import { cn } from '@/shared/lib/utils'

// Định nghĩa kiểu cho props của Pagination
interface PaginationProps {
  children: React.ReactNode
}

// Pagination component
const Pagination: React.FC<PaginationProps> = ({ children }) => {
  return (
    <nav aria-label='Pagination' className='flex items-center justify-center p-4'>
      {children}
    </nav>
  )
}

// PaginationContent component
const PaginationContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className='flex items-center'>{children}</div>
}

// PaginationItem component
const PaginationItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className='mx-1'>{children}</div>
}

// PaginationLink component
const PaginationLink = React.forwardRef<
  HTMLAnchorElement,
  { href: string; isActive?: boolean; children: React.ReactNode }
>(({ href, isActive, children }, ref) => {
  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        'px-3 py-1 text-sm rounded-md',
        isActive ? 'bg-slate-950 text-white' : 'bg-white text-slate-950 hover:bg-slate-100'
      )}
    >
      {children}
    </a>
  )
})
PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = React.forwardRef<HTMLAnchorElement, { href: string }>(({ href }, ref) => {
  return (
    <a ref={ref} href={href} className='px-3 py-1 text-sm bg-white rounded-md text-slate-950 hover:bg-slate-100'>
      Previous
    </a>
  )
})
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = React.forwardRef<HTMLAnchorElement, { href: string }>(({ href }, ref) => {
  return (
    <a ref={ref} href={href} className='px-3 py-1 text-sm bg-white rounded-md text-slate-950 hover:bg-slate-100'>
      Next
    </a>
  )
})
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis: React.FC = () => {
  return <span className='mx-2 text-sm'>...</span>
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
}
