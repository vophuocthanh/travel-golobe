import React from 'react'

type Props = {
    icon?: React.ReactNode;
    name: string;
    className?: string;
}

export default function Input({ icon, name, className }: Props) {
    return (
        <div className={`relative mb-4 border border-gray-400 rounded-md ${className}`}>
            <label className={`absolute top-0 left-3 px-2 bg-white text-gray-700 text-sm font-medium transform -translate-y-1/2 ${className}`}>
                {name}
            </label>
            <div className="flex items-center border border-gray-400 rounded-md">
                <input
                    type="text"
                    className={`p-2 border-0 focus:outline-none w-full rounded-md ${className}`}
                />
                <div className="p-2 text-gray-500 hover:text-gray-700">
                    {icon}
                </div>
            </div>
        </div>
    )
}
