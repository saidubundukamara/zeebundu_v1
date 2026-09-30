import { Section } from '@/components/layout/Section'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { FAQBlock as FAQBlockType } from '@/payload-types'

export function FAQBlock({ block, tone }: { block: FAQBlockType; tone: 'default' | 'paper' }) {
  if (!block.items?.length) return null
  return (
    <Section tone={tone} containerClassName="max-w-3xl">
      {block.heading && <h2 className="mb-8 text-h2">{block.heading}</h2>}
      <Accordion type="single" collapsible className="border-t border-map-rule">
        {block.items.map((item) => (
          <AccordionItem key={item.id} value={item.id ?? item.question} className="border-map-rule">
            <AccordionTrigger className="py-5 text-base font-medium">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-base leading-relaxed whitespace-pre-line text-map-ink-soft">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  )
}
