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
import { CountrySchema } from '@/shared/utils/schema'
import { MeResponse } from '@/shared/ts/types/meresponse'
import { zodResolver } from '@hookform/resolvers/zod'

type Props = {
  title: string
  content?: string | undefined
}

export default function ContentCountry({ title, content }: Props) {
  const [openCountryDialog, setOpenCountryDialog] = useState(false)

  const [profileData, setProfileData] = useState<MeResponse>({
    country: ''
  })

  const formCountry = useForm<{ country: string }>({
    resolver: zodResolver(CountrySchema),
    defaultValues: { country: profileData.country }
  })

  const updateCountryMutation = useMutation({
    mutationKey: ['update-country'],
    mutationFn: (data: z.infer<typeof CountrySchema>) => meApi.updateAccount(data),
    onSuccess: (updatedData: MeResponse) => {
      toast.success('Country update successful!')
      setProfileData((prev) => ({ ...prev, country: updatedData.country }))
      formCountry.reset(updatedData)
      setOpenCountryDialog(false)
    },
    onError: () => {
      toast.error('Country update failed!')
    }
  })

  function onSubmitCountry(data: { country: string }) {
    if (data.country && data.country !== profileData.country) {
      updateCountryMutation.mutate({ country: data.country })
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
            <p className='text-xl font-semibold'>{profileData.country || content}</p>
          </div>
          <div className='flex space-x-2'>
            <Dialog open={openCountryDialog} onOpenChange={setOpenCountryDialog}>
              <DialogTrigger asChild>
                <Button className='flex items-center p-2 space-x-2 text-sm bg-white border rounded-md shadow-md border-primary'>
                  <SquarePen className='w-4 h-4' />
                  <p>Change Country</p>
                </Button>
              </DialogTrigger>
              <DialogContent className='w-full'>
                <DialogHeader>
                  <DialogTitle>Edit Country</DialogTitle>
                  <DialogDescription>Make changes to your country here. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <Form {...formCountry}>
                  <form onSubmit={formCountry.handleSubmit(onSubmitCountry)} className='w-full space-y-6'>
                    <FormField
                      control={formCountry.control}
                      name='country'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel> Saves {title}</FormLabel>
                          <FormControl>
                            <Input placeholder='Enter country' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type='submit' className='flex ml-auto text-white'>
                      Saves {title}
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
