import React from 'react'

type Props = {
    icon: React.ReactNode;
    name: string;
    content: string;
    className?: string;
}

export default function Div({ icon, name, content, className }: Props) {
    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            <div className='text-primary'>{icon}</div>
            <div>
                <p className='text-gray-500 text-xs'>{name}</p>
                <p className='font-bold text-base'>{content}</p>
            </div>
        </div>
    )
}