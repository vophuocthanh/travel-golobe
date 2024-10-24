import { Button } from '@/components/ui/button'

import { locals } from '@/components/common/i18n/i18n'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useTranslation } from 'react-i18next'

export function Language() {
  const { i18n } = useTranslation()
  const currLanguage = locals[i18n.language as keyof typeof locals]
  const changeLanguage = (lng: 'en' | 'vi') => {
    i18n.changeLanguage(lng)
  }
  return (
    <Popover>
      <PopoverTrigger asChild className='w-20'>
        <Button variant='outline'>{currLanguage}</Button>
      </PopoverTrigger>
      <PopoverContent className='w-full'>
        <div className='flex flex-col space-y-2'>
          <Button onClick={() => changeLanguage('en')}>ENG 🇨🇰</Button>
          <Button onClick={() => changeLanguage('vi')}>VIE 🇻🇳</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
