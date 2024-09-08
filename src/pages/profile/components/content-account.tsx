import React from 'react'
import { Button } from '@/components/ui/button'
import { Plus, SquarePen } from 'lucide-react'



type Props = {
    title: string
    content: string | undefined
    boolean?: string
}

export default function ContentAccount({ title, content, boolean }: Props) {

    return (
        <>
            <div className="relative p-2 items-center justify-between">
                <label htmlFor="" className="text-base font-normal">{title}</label>
                <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold">{content}</p>
                    <div className="flex space-x-2">
                        {boolean ? (
                            <Button className="text-sm flex items-center space-x-2 p-2 border border-primary bg-white rounded-md shadow-md">
                                <Plus className="w-4 h-4" />
                                <p>Add another email</p>
                            </Button>
                        ) : null}
                        <Button className="text-sm flex items-center space-x-2 p-2 border border-primary bg-white rounded-md shadow-md">
                            <SquarePen className="w-4 h-4" />
                            <p>Change</p>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}