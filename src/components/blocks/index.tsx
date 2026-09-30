import type { Business, Page } from '@/payload-types'

import { CTABlock } from './CTABlock'
import { FAQBlock } from './FAQBlock'
import { GalleryBlock } from './GalleryBlock'
import { HeroBlock } from './HeroBlock'
import { LoanProductsBlock } from './LoanProductsBlock'
import { ProductListBlock } from './ProductListBlock'
import { RatesTableBlock } from './RatesTableBlock'
import { RichTextBlock } from './RichTextBlock'
import { RoomsBlock } from './RoomsBlock'
import { ServicesGridBlock } from './ServicesGridBlock'
import { StatsBlock } from './StatsBlock'

type Block = NonNullable<Page['layout']>[number] | NonNullable<Business['layout']>[number]

/**
 * Renders CMS layout blocks on the white ground, separated by hairlines.
 * `startTone` is kept for existing call sites and no longer alternates.
 */
export function RenderBlocks({
  blocks,
  startTone = 'default',
}: {
  blocks?: Block[] | null
  startTone?: 'default' | 'paper'
}) {
  if (!blocks?.length) return null
  return (
    <>
      {blocks.map((block, i) => {
        const tone = startTone === 'paper' ? 'paper' : 'default'
        const key = block.id ?? `${block.blockType}-${i}`
        const rendered = renderBlock(block, key, tone)
        if (!rendered) return null
        return block.blockType === 'hero' || block.blockType === 'cta' ? (
          rendered
        ) : (
          <div key={key} className="border-t border-map-rule first:border-t-0">
            {rendered}
          </div>
        )
      })}
    </>
  )
}

function renderBlock(block: Block, key: string, tone: 'default' | 'paper') {
  switch (block.blockType) {
    case 'hero':
      return <HeroBlock key={key} block={block} />
    case 'richText':
      return <RichTextBlock key={key} block={block} tone={tone} />
    case 'servicesGrid':
      return <ServicesGridBlock key={key} block={block} tone={tone} />
    case 'stats':
      return <StatsBlock key={key} block={block} />
    case 'gallery':
      return <GalleryBlock key={key} block={block} tone={tone} />
    case 'cta':
      return <CTABlock key={key} block={block} />
    case 'faq':
      return <FAQBlock key={key} block={block} tone={tone} />
    case 'ratesTable':
      return <RatesTableBlock key={key} block={block} tone={tone} />
    case 'loanProducts':
      return <LoanProductsBlock key={key} block={block} tone={tone} />
    case 'productList':
      return <ProductListBlock key={key} block={block} tone={tone} />
    case 'rooms':
      return <RoomsBlock key={key} block={block} tone={tone} />
    default:
      return null
  }
}
