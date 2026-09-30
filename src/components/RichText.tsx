import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { cn } from '@/lib/utils'

export function RichText({ data, className }: { data?: unknown; className?: string }) {
  if (!data) return null
  return (
    <LexicalRichText
      data={data as SerializedEditorState}
      className={cn(
        'prose max-w-[68ch] md:prose-lg',
        // Prose colours follow the map tokens, so light and dark both hold contrast.
        '[--tw-prose-body:var(--map-ink)] [--tw-prose-bold:var(--map-ink)] [--tw-prose-bullets:var(--map-course)] [--tw-prose-captions:var(--map-ink-soft)] [--tw-prose-counters:var(--map-course)] [--tw-prose-headings:var(--map-ink)] [--tw-prose-hr:var(--map-rule)] [--tw-prose-lead:var(--map-ink-soft)] [--tw-prose-links:var(--map-course)] [--tw-prose-quote-borders:var(--map-course)] [--tw-prose-quotes:var(--map-ink)] [--tw-prose-td-borders:var(--map-rule)] [--tw-prose-th-borders:var(--map-ink)]',
        'prose-headings:font-heading prose-headings:font-extrabold prose-headings:uppercase prose-a:underline-offset-4',
        className,
      )}
    />
  )
}
