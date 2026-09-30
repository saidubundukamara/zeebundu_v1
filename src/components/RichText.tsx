import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { cn } from '@/lib/utils'

export function RichText({ data, className }: { data?: unknown; className?: string }) {
  if (!data) return null
  return (
    <LexicalRichText
      data={data as SerializedEditorState}
      className={cn(
        'prose max-w-none prose-stone md:prose-lg prose-headings:font-heading prose-headings:font-normal prose-headings:text-forest-800 prose-a:text-forest-700 prose-a:underline-offset-4',
        className,
      )}
    />
  )
}
