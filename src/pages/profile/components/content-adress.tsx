import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { toast } from 'sonner'
import { meApi } from '@/apis/me'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SquarePen } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { AddressSchema } from '@/shared/utils/schema'
import { MeResponse } from '@/shared/ts/types/meresponse'
import { zodResolver } from '@hookform/resolvers/zod'

type Props = {
    title: string
    content?: string | undefined
}

export default function ContentAddress({ title, content }: Props) {
    const [openAddressDialog, setOpenAddressDialog] = useState(false)

    const [profileData, setProfileData] = useState<MeResponse>({
        address: content
    })

    const formAddress = useForm<{ address: string }>({
        resolver: zodResolver(AddressSchema),
        defaultValues: { address: profileData.address }
    })

    const updateAddressMutation = useMutation({
        mutationKey: ['update-address'],
        mutationFn: (data: z.infer<typeof AddressSchema>) => meApi.updateAccount(data),
        onSuccess: (updatedData: MeResponse) => {
            toast.success('Address update successful!')
            setProfileData((prev) => ({ ...prev, address: updatedData.address }))
            formAddress.reset(updatedData)
            setOpenAddressDialog(false)
        },
        onError: () => {
            toast.error('Address update failed!')
        }
    })

    function onSubmitAddress(data: { address: string }) {
        if (data.address && data.address !== profileData.address) {
            updateAddressMutation.mutate({ address: data.address })
        } else {
            toast.error('Address update failed!')
        }
    }

    return (
        <>
            <div className='relative items-center justify-between p-2'>
                <label htmlFor='' className='text-base font-normal'>
                    {title}
                </label>
                <div className='flex items-center justify-between'>
                    <div>
                        <p className='text-xl font-semibold'>{profileData.address || content}</p>
                    </div>
                    <div className='flex space-x-2'>
                        <Dialog open={openAddressDialog} onOpenChange={setOpenAddressDialog}>
                            <DialogTrigger asChild>
                                <Button className='flex items-center p-2 space-x-2 text-sm text-black hover:text-white bg-white border rounded-md shadow-md border-primary'>
                                    <SquarePen className='w-4 h-4' />
                                    <p>Change Address</p>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className='w-full'>
                                <DialogHeader>
                                    <DialogTitle>Edit Address</DialogTitle>
                                    <DialogDescription>Make changes to your address here. Click save when you're done.</DialogDescription>
                                </DialogHeader>
                                <Form {...formAddress}>
                                    <form onSubmit={formAddress.handleSubmit(onSubmitAddress)} className='w-full space-y-6'>
                                        <FormField
                                            control={formAddress.control}
                                            name='address'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Change {title}</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder='Enter address' {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type='submit' className='flex ml-auto text-white'>
                                            Save {title}
                                        </Button>
                                    </form>
                                </Form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </>
    )
}
