import { cn } from '@/shared/lib/utils'
import React from 'react'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number
  height?: string | number
  borderRadius?: string | number
}

function Skeleton({ width, height, borderRadius, className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse bg-slate-300 dark:bg-slate-800', className)}
      style={{
        width: width || '100%',
        height: height || '2.5rem',
        borderRadius: borderRadius || '0.5rem'
      }}
      {...props}
    />
  )
}

export { Skeleton }
