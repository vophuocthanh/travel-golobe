import { meApi } from '@/apis/me'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MeResponse } from '@/shared/ts/types/meresponse'
import { PhoneSchema } from '@/shared/utils/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { SquarePen } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'

type Props = {
  title: string
  content?: string | undefined
}

export default function ContentPhone({ title, content }: Props) {
  const [openPhoneDialog, setOpenPhoneDialog] = useState(false)

  const [profileData, setProfileData] = useState<MeResponse>({
    phone: content
  })
  const { t } = useTranslation()

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
                <Button className='flex items-center p-2 space-x-2 text-sm text-black bg-white border rounded-md shadow-md hover:text-white border-primary'>
                  <SquarePen className='w-4 h-4' />
                  <p>{t('ChangePhone')}</p>
                </Button>
              </DialogTrigger>
              <DialogContent className='w-[85%] lg:w-full rounded-3xl'>
                <DialogHeader>
                  <DialogTitle>{t('EditPhone')}</DialogTitle>
                  <DialogDescription>
                  {t('changesphone')}
                    
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
                    {t('Save')} {title}
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
