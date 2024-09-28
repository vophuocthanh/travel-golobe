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
import { NameSchema } from '@/shared/utils/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { SquarePen } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  title: string
  content?: string | undefined
}

export default function ContentName({ title, content }: Props) {
  const [openNameDialog, setOpenNameDialog] = useState(false)
  const [profileData, setProfileData] = useState<MeResponse>({
    name: content
  })

  const formName = useForm<{ name: string }>({
    resolver: zodResolver(NameSchema),
    defaultValues: { name: '' }
  })

  useEffect(() => {
    if (openNameDialog) {
      formName.reset({ name: profileData.name })
    }
  }, [openNameDialog, profileData.name, formName])

  const updateNameMutation = useMutation({
    mutationKey: ['update-name'],
    mutationFn: (data: z.infer<typeof NameSchema>) => meApi.updateAccount(data),
    onSuccess: (updatedData: MeResponse) => {
      toast.success('Name updated successfully!')
      setProfileData((prev) => ({ ...prev, name: updatedData.name }))
      formName.reset({ name: updatedData.name }) // Reset form với giá trị mới
      setOpenNameDialog(false)
    },
    onError: () => {
      toast.error('Name update failed!')
    }
  })

  const onSubmitName = formName.handleSubmit((data) => {
    if (data.name && data.name !== profileData.name) {
      updateNameMutation.mutate({ name: data.name })
    } else {
      toast.error('Name update failed!')
    }
  })

  return (
    <>
      <div className='relative items-center justify-between p-2'>
        <label htmlFor='' className='text-base font-normal'>
          {title}
        </label>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-xl font-semibold'>{profileData.name || content}</p>
          </div>
          <div className='flex space-x-2'>
            <Dialog open={openNameDialog} onOpenChange={setOpenNameDialog}>
              <DialogTrigger asChild>
                <Button className='flex items-center p-2 space-x-2 text-sm text-black bg-white border rounded-md shadow-md hover:text-white border-primary'>
                  <SquarePen className='w-4 h-4' />
                  <p className=''>Change Name</p>
                </Button>
              </DialogTrigger>
              <DialogContent className='w-full'>
                <DialogHeader>
                  <DialogTitle>Edit Name</DialogTitle>
                  <DialogDescription>Make changes to your name here. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <Form {...formName}>
                  <form onSubmit={onSubmitName} className='w-full space-y-6'>
                    <FormField
                      control={formName.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{title}</FormLabel>
                          <FormControl>
                            <Input placeholder='Enter name' {...field} />
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
