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
import { PhoneSchema } from '@/shared/utils/schema'
import { MeResponse } from '@/shared/ts/types/meresponse'
import { zodResolver } from '@hookform/resolvers/zod'

type Props = {
  title: string
  content?: string | undefined
}

export default function ContentPhone({ title, content }: Props) {
  const [openPhoneDialog, setOpenPhoneDialog] = useState(false)

  const [profileData, setProfileData] = useState<MeResponse>({
    phone: content
  })

  const formPhone = useForm<{ phone: string }>({
    resolver: zodResolver(PhoneSchema),
    defaultValues: { phone: profileData.phone }
  })

  const updatePhoneMutation = useMutation({
    mutationKey: ['update-phone'],
    mutationFn: (data: z.infer<typeof PhoneSchema>) => meApi.updateAccount(data),
    onSuccess: (updatedData: MeResponse) => {
      toast.success('Updated phone number successfully!')
      setProfileData((prev) => ({ ...prev, phone: updatedData.phone }))
      formPhone.reset(updatedData)
      setOpenPhoneDialog(false)
    },
    onError: () => {
      toast.error('Update phone number failed!')
    }
  })

  function onSubmitPhone(data: { phone: string }) {
    if (data.phone && data.phone !== profileData.phone) {
      updatePhoneMutation.mutate({ phone: data.phone })
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
            <p className='text-xl font-semibold'>{profileData.phone || content}</p>
          </div>
          <div className='flex space-x-2'>
            <Dialog open={openPhoneDialog} onOpenChange={setOpenPhoneDialog}>
              <DialogTrigger asChild>
                <Button className='flex items-center p-2 space-x-2 text-sm bg-white border rounded-md shadow-md border-primary'>
                  <SquarePen className='w-4 h-4' />
                  <p>Change Phone</p>
                </Button>
              </DialogTrigger>
              <DialogContent className='w-full'>
                <DialogHeader>
                  <DialogTitle>Edit Phone</DialogTitle>
                  <DialogDescription>
                    Make changes to your phone number here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <Form {...formPhone}>
                  <form onSubmit={formPhone.handleSubmit(onSubmitPhone)} className='w-full space-y-6'>
                    <FormField
                      control={formPhone.control}
                      name='phone'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{title}</FormLabel>
                          <FormControl>
                            <Input placeholder='Enter phone' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type='submit' className='flex ml-auto text-white'>
                      saves {title}
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
