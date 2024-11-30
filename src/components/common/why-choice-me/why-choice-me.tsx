import SectionInViewUp from '@/components/common/animation/SectionInViewUp'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useTranslation } from 'react-i18next'

export default function WhyChoiceMe() {
  const { t } = useTranslation()
  return (
    <SectionInViewUp>
      <div className="flex flex-col mx-auto mb-64 space-y-4 max-w-7xl">
        <h1 className="text-4xl font-medium">
          {t('easily')} <span className="text-primary">Travel Golobe</span>
        </h1>
        <p className="text-xl">
        {t('comprehensive')}
        </p>
        <h2 className="text-4xl font-semibold text-center">
          {t('Whychoose')} <span className="font-medium text-primary">Travel Golobe</span>
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl"> {t('Convenient')}</AccordionTrigger>
            <AccordionContent className="text-lg"> {t('Integrate')}</AccordionContent>
            <AccordionContent className="text-lg">
            {t('quickly')}
            </AccordionContent>
            <AccordionContent className="text-lg">
            {t('Bookbuses')}
            </AccordionContent>
            <AccordionContent className="text-lg">
            {t('luxury')}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl"> {t('reliable')}</AccordionTrigger>
            <AccordionContent className="text-lg"> {t('Absolutecustomer')}</AccordionContent>
            <AccordionContent className="text-lg">
            {t('industry')}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl"> {t('Dedicated')}</AccordionTrigger>
            <AccordionContent className="text-lg">
            {t('questions')}
            </AccordionContent>
            <AccordionContent className="text-lg">
            {t('customer')}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-xl"> {t('Transparent')}</AccordionTrigger>
            <AccordionContent className="text-lg"> {t('Bestprice')}</AccordionContent>
            <AccordionContent className="text-lg">
            {t('Regularly')}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <h1 className="text-4xl font-medium"> {t('journey')}</h1>
        <p>
          {t('Let')} <span className="text-primary"> Travel Golobe </span>
          {t('Accompanying')}.{' '}
          <span className="font-medium"> {t('Startyour')}</span>
        </p>
      </div>
    </SectionInViewUp>
  )
}
