import { CTABlock } from './CTA'
import { FAQBlock } from './FAQ'
import { GalleryBlock } from './Gallery'
import { HeroBlock } from './Hero'
import { LoanProductsBlock } from './LoanProducts'
import { ProductListBlock } from './ProductList'
import { RatesTableBlock } from './RatesTable'
import { RichTextBlock } from './RichText'
import { RoomsBlock } from './Rooms'
import { ServicesGridBlock } from './ServicesGrid'
import { StatsBlock } from './Stats'

/** Blocks for generic pages (About, legal, …). */
export const pageBlocks = [
  HeroBlock,
  RichTextBlock,
  ServicesGridBlock,
  StatsBlock,
  GalleryBlock,
  CTABlock,
  FAQBlock,
]

/** Optional extras on a business page. */
export const businessBlocks = [
  RatesTableBlock,
  LoanProductsBlock,
  ProductListBlock,
  RoomsBlock,
  FAQBlock,
  CTABlock,
  RichTextBlock,
]
